<?php

namespace App\Mail;

use App\Models\Payment;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class DocumentPaymentMail extends Mailable
{
    use Queueable, SerializesModels;

    public User $user;
    public Payment $payment;

    /**
     * Create a new message instance.
     */
    public function __construct(User $user, Payment $payment)
    {
        $this->user = $user;
        $this->payment = $payment;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        $symbol = $this->payment->currency === 'GBP' ? '£' : ($this->payment->currency === 'USD' ? '$' : '€');
        return new Envelope(
            subject: "FitNinja AI — Official Invoice & Fitness Report Unlocked ({$symbol}{$this->payment->amount})",
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.document_payment',
        );
    }

    /**
     * Get the attachments for the message.
     */
    public function attachments(): array
    {
        $pdf = Pdf::loadView('pdf.wallet_invoice', [
            'payment' => $this->payment,
            'user' => $this->user,
        ]);

        $ref = $this->payment->gateway_reference ?: ('INV-' . $this->payment->id);

        return [
            Attachment::fromData(fn () => $pdf->output(), "Invoice_{$ref}.pdf")
                ->withMime('application/pdf'),
        ];
    }
}
