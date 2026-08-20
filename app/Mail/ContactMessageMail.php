<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactMessageMail extends Mailable
{
    use Queueable, SerializesModels;

    public string $name;
    public string $email;
    public string $mailSubject;
    public string $mailMessage;

    /**
     * Create a new message instance.
     */
    public function __construct(string $name, string $email, string $mailSubject, string $mailMessage)
    {
        $this->name = $name;
        $this->email = $email;
        $this->mailSubject = $mailSubject;
        $this->mailMessage = $mailMessage;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "New FitNinja AI Support Ticket: {$this->mailSubject}",
            replyTo: [$this->email],
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.contact_message',
        );
    }
}
