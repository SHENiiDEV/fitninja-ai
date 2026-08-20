<?php

namespace App\Http\Controllers;

use App\Mail\ContactMessageMail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    /**
     * Display the How It Works page.
     */
    public function howItWorksPage(): Response
    {
        return Inertia::render('HowItWorks');
    }

    /**
     * Display the Contact page with corporate information loaded from environment.
     */
    public function contactPage(): Response
    {
        return Inertia::render('Contact', [
            'companyName' => env('COMPANY_NAME', 'CHANGE IT UP SERVICES LTD'),
            'companyNumber' => env('COMPANY_NUMBER', '16107295'),
            'companyAddress' => env('COMPANY_ADDRESS', '14 Broadway, Nottingham, United Kingdom, NG1 1PS'),
            'supportEmail' => env('MAIL_FROM_ADDRESS', 'support@fitninja.co.uk'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle support form submission and dispatch email using SMTP settings.
     */
    public function submitContactForm(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:5000',
        ]);

        $recipientEmail = env('MAIL_FROM_ADDRESS', 'support@fitninja.co.uk');

        try {
            Mail::to($recipientEmail)->send(new ContactMessageMail(
                $validated['name'],
                $validated['email'],
                $validated['subject'],
                $validated['message']
            ));
        } catch (\Throwable $e) {
            Log::warning('Contact message email dispatch failed: ' . $e->getMessage());
        }

        return redirect()->route('contact')->with('status', 'message-sent');
    }

    /**
     * Display the Support & Help Desk page.
     */
    public function supportPage(): Response
    {
        return Inertia::render('Support', [
            'supportEmail' => env('MAIL_FROM_ADDRESS', 'support@fitninja.co.uk'),
        ]);
    }
}
