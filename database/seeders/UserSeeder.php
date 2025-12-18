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
                'email' => 'admin@testpro-group.com',
            ],
            [
                'phone'             => '011' . rand(100000000, 999999999),
                'name'              => 'Administrator',
                'is_active'         => true,
                'is_admin'          => true,
                'email_verified_at' => now(),
                'password'          => Hash::make('r@x0pXJwt]cyhK_DATkU'),
                'remember_token'    => Str::random(10),
            ]
        );
        $localAdmin->assignRole('admin');

        $localAdmin = UserRepository::query()->updateOrCreate(
            [
                'email' => 'developper@testpro-group.com',
            ],
            [
                'phone'             => '011' . rand(100000000, 999999999),
                'name'              => 'Developer',
                'is_active'         => true,
                'is_admin'          => true,
                'email_verified_at' => now(),
                'password'          => Hash::make('!zz5Fe[+QX(Fy0]B_g];'),
                'remember_token'    => Str::random(10),
            ]
        );
        $localAdmin->assignRole('admin');


        // if (app()->isLocal()) {
        //     User::factory()
        //         ->count(5)
        //         ->create();
        // }
    }
}
