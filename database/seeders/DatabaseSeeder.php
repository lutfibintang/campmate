<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@campusmate.local'],
            [
                'name' => 'Admin CampusMate',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ]
        );

        User::updateOrCreate(
            ['email' => 'user@campusmate.local'],
            [
                'name' => 'User Demo',
                'password' => Hash::make('password'),
                'role' => 'user',
            ]
        );
    }
}
