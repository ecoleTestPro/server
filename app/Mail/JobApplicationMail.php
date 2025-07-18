<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Http\UploadedFile;

class JobApplicationMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $name,
        public int $jobOfferId,
        public UploadedFile $cv
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Nouvelle candidature',
            from: new Address(config('mail.from.address'), config('app.name')),
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'mail.job-application.mail',
            with: [
                'name' => $this->name,
                'job_offer_id' => $this->jobOfferId,
            ]
        );
    }

    public function attachments(): array
    {
        return [
            Attachment::fromPath(
                $this->cv->getRealPath()
            )
                ->as($this->cv->getClientOriginalName())
                ->withMime($this->cv->getClientMimeType()),
        ];
    }
}
