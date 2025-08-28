<?php

test('contact page is accessible', function () {
    $this->get(route('contact'))
        ->assertOk();
});

test('contact form submits successfully', function () {
    $payload = [
        'firstName' => 'John',
        'lastName' => 'Doe',
        'email' => 'john@example.com',
        'phone' => '1234567890',
        'subject' => 'Test',
        'message' => 'Hello world',
    ];

    $this->post(route('contact.post'), $payload)
        ->assertOk()
        ->assertJson([
            'success' => true,
        ]);
});

