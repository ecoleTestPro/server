<?php

namespace App\Mail;

use App\Models\JobOffer;
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
        public string $email,
        public string $phone,
        public JobOffer $jobOffer,
        public UploadedFile $cv
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Nouvelle candidature - ' . $this->jobOffer->title . ' - ' . $this->name,
            from: new Address(env('CONTACT_EMAIL', 'contact@example.com'), config('app.name')),
            replyTo: [new Address($this->email, $this->name)]
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'mail.job-application.mail',
            with: [
                'candidateName' => $this->name,
                'candidateEmail' => $this->email,
                'candidatePhone' => $this->phone,
                'jobOffer' => $this->jobOffer,
                'applicationDate' => now()->format('d/m/Y \\à H:i'),
                'cvFileName' => $this->cv->getClientOriginalName(),
                'cvFileSize' => round($this->cv->getSize() / 1024, 2) . ' KB'
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
