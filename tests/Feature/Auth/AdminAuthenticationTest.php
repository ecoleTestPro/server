<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminAuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_login_screen_can_be_rendered(): void
    {
        $response = $this->get('/admin/login');

        $response->assertStatus(200);
    }

    public function test_admin_can_authenticate_using_the_login_screen(): void
    {
        $admin = User::factory()->create([
            'is_admin' => true,
            'email' => 'admin@test.com',
        ]);

        $response = $this->post('/admin/login', [
            'email' => 'admin@test.com',
            'password' => 'secret',
        ]);

        $response->assertSessionHasNoErrors();
        $this->assertAuthenticated();
        $response->assertRedirect(route('dashboard.index'));
    }

    public function test_non_admin_cannot_authenticate_using_admin_login(): void
    {
        $user = User::factory()->create([
            'is_admin' => false,
            'email' => 'student@test.com',
        ]);

        $response = $this->post('/admin/login', [
            'email' => 'student@test.com',
            'password' => 'secret',
        ]);

        $response->assertSessionHasErrors(['email']);
        $this->assertGuest();
    }

    public function test_admin_cannot_authenticate_with_invalid_password(): void
    {
        $admin = User::factory()->create([
            'is_admin' => true,
            'email' => 'admin@test.com',
        ]);

        $response = $this->post('/admin/login', [
            'email' => 'admin@test.com',
            'password' => 'wrong-password',
        ]);

        $response->assertSessionHasErrors(['email']);
        $this->assertGuest();
    }

    public function test_admin_cannot_authenticate_with_non_existing_email(): void
    {
        $response = $this->post('/admin/login', [
            'email' => 'nonexistent@test.com',
            'password' => 'secret',
        ]);

        $response->assertSessionHasErrors(['email']);
        $this->assertGuest();
    }

    public function test_admin_authentication_requires_email_and_password(): void
    {
        $response = $this->post('/admin/login', []);

        $response->assertSessionHasErrors(['email', 'password']);
        $this->assertGuest();
    }

    public function test_admin_authentication_validates_email_format(): void
    {
        $response = $this->post('/admin/login', [
            'email' => 'not-an-email',
            'password' => 'secret',
        ]);

        $response->assertSessionHasErrors(['email']);
        $this->assertGuest();
    }

    public function test_admin_can_logout(): void
    {
        $admin = User::factory()->create([
            'is_admin' => true,
        ]);

        $this->actingAs($admin);

        $response = $this->post('/logout');

        $this->assertGuest();
        $response->assertRedirect('/');
    }

    public function test_admin_login_throttling_works(): void
    {
        $admin = User::factory()->create([
            'is_admin' => true,
            'email' => 'admin@test.com',
        ]);

        for ($i = 0; $i < 6; $i++) {
            $response = $this->post('/admin/login', [
                'email' => 'admin@test.com',
                'password' => 'wrong-password',
            ]);
        }

        $response->assertSessionHasErrors(['email']);
        $errorMessage = $response->getSession()->get('errors')->get('email')[0];
        $this->assertTrue(
            str_contains($errorMessage, 'Trop de tentatives') || str_contains($errorMessage, 'Too many login attempts'),
            "Expected throttling error message, got: $errorMessage"
        );
    }

    public function test_admin_login_redirects_to_dashboard(): void
    {
        $admin = User::factory()->create([
            'is_admin' => true,
        ]);

        $response = $this->post('/admin/login', [
            'email' => $admin->email,
            'password' => 'secret',
        ]);

        $response->assertRedirect(route('dashboard.index'));
    }
}