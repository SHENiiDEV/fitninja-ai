<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BillingController extends Controller
{
    /**
     * Display token credit store with custom token calculator (€1 = 1 Token).
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        return Inertia::render('Billing/Index', [
            'tokens' => $user->credits,
            'ratePerToken' => 1.00, // €1.00 = 1 Token
            'currencySymbol' => '€',
            'presetPackages' => [
                ['tokens' => 5, 'price' => 5.00, 'popular' => false],
                ['tokens' => 30, 'price' => 30.00, 'popular' => true],
                ['tokens' => 50, 'price' => 50.00, 'popular' => false],
            ],
            'bankDetails' => [
                'bankName' => 'Revolut Business / Barclays Europe',
                'accountName' => 'FitNinja AI Elite Coaching Ltd',
                'sortCode' => '20-45-89',
                'accountNumber' => '83920147',
                'iban' => 'EU89 REVO 2045 8983 9201 47',
                'swift' => 'REVOGB22',
                'referenceCode' => 'FN-' . strtoupper(substr(md5($user->id . 'fitninja'), 0, 8)),
            ],
        ]);
    }

    /**
     * Process custom token quantity purchase.
     */
    public function processCardPayment(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'tokens_amount' => ['required', 'integer', 'min:5', 'max:50000'],
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
