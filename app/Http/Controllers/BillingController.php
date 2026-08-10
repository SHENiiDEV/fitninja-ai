<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BillingController extends Controller
{
    /**
     * Display high-ticket FOREX executive token credit store (€1.00 = 1 Token).
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        return Inertia::render('Billing/Index', [
            'tokens' => $user->credits,
            'ratePerToken' => 1.00, // €1.00 = 1 Token
            'currencySymbol' => '€',
            'presetPackages' => [
                ['tokens' => 100, 'price' => 100.00, 'popular' => false, 'name' => 'Executive Trader'],
                ['tokens' => 500, 'price' => 500.00, 'popular' => true, 'name' => 'FOREX VIP Trader'],
                ['tokens' => 1500, 'price' => 1500.00, 'popular' => false, 'name' => 'Institutional Hedge Fund'],
            ],
            'bankDetails' => [
                'bankName' => 'Barclays Private / Revolut Business Europe',
                'accountName' => 'FitNinja AI Executive Performance Ltd',
                'sortCode' => '20-45-89',
                'accountNumber' => '83920147',
                'iban' => 'EU89 REVO 2045 8983 9201 47',
                'swift' => 'REVOGB22',
                'referenceCode' => 'FN-' . strtoupper(substr(md5($user->id . 'fitninja'), 0, 8)),
            ],
        ]);
    }

    /**
     * Process custom high-ticket token quantity purchase.
     */
    public function processCardPayment(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'tokens_amount' => ['required', 'integer', 'min:50', 'max:100000'],
        ]);

        $tokensToAdd = (int) $validated['tokens_amount'];

        $user = $request->user();
        $user->increment('credits', $tokensToAdd);

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

        return redirect()->route('billing.index')->with('status', 'bank-transfer-submitted');
    }
}
