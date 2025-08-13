<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class Contact extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(
        public string $firstName,
        public string $lastName,
        public string $email,
        public string $phone,
        public string $message,
        public string $civility,
        public string $subjectMessage,
        public ?string $company,
    ) {}

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "TESTPRO - CONTACT US : " . $this->subjectMessage, // Use the subject passed to the constructor
            from: new Address(env('CONTACT_EMAIL', EMAIL_DEFAULT), config('app.name')),
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mail.contact-us.mail',
            with: [
                'appLogo'        => app('path.public') . '/logo.png', // Replace with your logo URL
                'firstName'      => $this->firstName,
                'lastName'       => $this->lastName,
                'email'          => $this->email,
                'phone'          => $this->phone,
                'subjectMessage' => $this->subject,
                'userMessage'    => $this->message,
                'civility'       => $this->civility,
                'company'        => $this->company ?? "Non défini",
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
