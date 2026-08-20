<?php

namespace App\Http\Controllers;

use App\Mail\WalletTopUpMail;
use App\Models\Payment;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

class BillingController extends Controller
{
    /**
     * Display high-ticket fitness AI token credit store (€1.00 = 1 Token) and payment history.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        // Retrieve user transaction history
        $payments = Payment::where('user_id', $user->id)
            ->latest()
            ->get()
            ->map(function ($p) {
                return [
                    'id' => $p->id,
                    'type' => $p->type,
                    'service_name' => $p->service_name,
                    'amount' => (float) $p->amount,
                    'currency' => $p->currency,
                    'gateway_reference' => $p->gateway_reference,
                    'status' => $p->status,
                    'created_at' => $p->created_at->format('d M Y, H:i'),
                ];
            });

        return Inertia::render('Billing/Index', [
            'tokens' => $user->credits,
            'ratePerToken' => 1.00, // €1.00 = 1 Token
            'currencySymbol' => '€',
            'presetPackages' => [
                ['tokens' => 100, 'price' => 100.00, 'popular' => false, 'name' => 'Fitness Foundations'],
                ['tokens' => 500, 'price' => 500.00, 'popular' => true, 'name' => 'Pro Transformation Suite'],
                ['tokens' => 1500, 'price' => 1500.00, 'popular' => false, 'name' => 'Elite Athlete Performance'],
            ],
            'payments' => $payments,
            'bankDetails' => [
                'bankName' => 'Barclays Private / Revolut Business Europe',
                'accountName' => 'CHANGE IT UP SERVICES LTD',
                'sortCode' => '20-45-89',
                'accountNumber' => '83920147',
                'iban' => 'EU89 REVO 2045 8983 9201 47',
                'swift' => 'REVOGB22',
                'referenceCode' => 'FN-' . strtoupper(substr(md5($user->id . 'fitninja'), 0, 8)),
            ],
        ]);
    }

    /**
     * Process custom high-ticket token quantity purchase, generate payment record & send PDF invoice email.
     */
    public function processCardPayment(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'tokens_amount' => ['required', 'integer', 'min:50', 'max:100000'],
        ]);

        $tokensToAdd = (int) $validated['tokens_amount'];
        $user = $request->user();

        // Increment user tokens
        $user->increment('credits', $tokensToAdd);

        // Determine service name
        $serviceName = match ($tokensToAdd) {
            100 => 'Fitness Foundations (100 AI Tokens)',
            500 => 'Pro Transformation Suite (500 AI Tokens)',
            1500 => 'Elite Athlete Performance (1,500 AI Tokens)',
            default => "Executive Token Credit Pack ({$tokensToAdd} AI Tokens)",
        };

        // Create official payment record
        $payment = Payment::create([
            'user_id' => $user->id,
            'type' => 'topup',
            'service_name' => $serviceName,
            'amount' => $tokensToAdd * 1.00,
            'currency' => 'EUR',
            'gateway_reference' => 'TOPUP-' . strtoupper(Str::random(10)),
            'status' => 'paid',
        ]);

        // Send WalletTopUpMail with attached PDF invoice
        try {
            Mail::to($user->email)->send(new WalletTopUpMail($user, $payment));
        } catch (\Throwable $e) {
            Log::warning('WalletTopUpMail send failed: ' . $e->getMessage());
        }

        return redirect()->route('billing.index')->with('status', 'tokens-purchased');
    }

    /**
     * Submit a bank transfer confirmation request for token top-up.
     */
    public function confirmBankTransfer(Request $request): RedirectResponse
    {
        $request->validate([
            'reference' => ['required', 'string'],
        ]);

        $user = $request->user();

        Payment::create([
            'user_id' => $user->id,
            'type' => 'topup',
            'service_name' => 'SWIFT / IBAN Wire Bank Topup Request',
            'amount' => 500.00,
            'currency' => 'EUR',
            'gateway_reference' => 'WIRE-' . strtoupper(Str::random(10)),
            'status' => 'pending',
        ]);

        return redirect()->route('billing.index')->with('status', 'bank-transfer-submitted');
    }

    /**
     * Download B2B PDF Tax Invoice for a specific payment.
     */
    public function downloadInvoice(Request $request, Payment $payment): SymfonyResponse
    {
        // Security check: ensure payment belongs to authenticated user
        if ($payment->user_id !== $request->user()->id) {
            abort(403, 'Unauthorized access to invoice document.');
        }

        $pdf = Pdf::loadView('pdf.wallet_invoice', [
            'payment' => $payment,
            'user' => $request->user(),
        ]);

        $ref = $payment->gateway_reference ?: ('INV-' . $payment->id);

        return $pdf->download("Invoice_{$ref}.pdf");
    }
}
