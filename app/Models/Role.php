<?php
use Spatie\Permission\Models\Role;

public function run(): void
{
    // Créer les rôles si non existants
    Role::firstOrCreate(['name' => 'admin']);
    Role::firstOrCreate(['name' => 'user']);
    Role::firstOrCreate(['name' => 'instructor']);

    $localAdmin = UserRepository::query()->updateOrCreate(
        [
            'email' => 'admin@example.com',
        ],
        [
            'phone' => '011' . rand(100000000, 999999999),
            'name' => 'Administrator',
            'is_active' => true,
            'is_admin' => true,
            'email_verified_at' => now(),
            'password' => Hash::make('secret'),
            'remember_token' => Str::random(10),
        ]
    );
    $localAdmin->assignRole('admin');
}