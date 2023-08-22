<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Queue\SerializesModels;

class SurveyResponseMail extends Mailable
{
    use Queueable, SerializesModels;

    private $name;
    private $email;
    private $survey;
    private $response_id;

    /**
     * Create a new message instance.
     */
    public function __construct($name, $email, $survey, $response_id) {
        $this->name = $name;
        $this->email = $email;
        $this->survey = $survey;
        $this->response_id = $response_id;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address('survey@example.com', 'Survey App'),
            subject: 'New Survey Response',
            replyTo: [
                new Address($this->email, $this->name)
            ]
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'email.survey_response',
            with: ['name' => $this->name, 'survey' => $this->survey, 'response_id' => $this->response_id]
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
