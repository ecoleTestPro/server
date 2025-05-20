<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

use App\Models\User;
use App\Repositories\UserRepository;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
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

        // // Utilisateur admin
        // User::create([
        //     'name' => 'Admin User',
        //     'email' => 'admin@example.com',
        //     'password' => Hash::make('password'),
        //     'email_verified_at' => now(),
        //     'is_admin' => true,
        // ]);

        if (app()->isLocal()) {
            User::factory()
                ->count(5)
                ->create();
        }
    }
}
