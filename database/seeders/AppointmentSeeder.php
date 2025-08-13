<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\AppointmentType;
use App\Models\AppointmentDuration;
use App\Models\BusinessHours;

class AppointmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Types de rendez-vous par défaut
        $appointmentTypes = [
            [
                'name' => 'Consultation',
                'slug' => 'consultation',
                'icon' => '💡',
                'color' => '#3b82f6',
                'description' => 'Conseil personnalisé pour vos projets de formation',
                'default_duration' => 30,
                'is_active' => true,
                'sort_order' => 1
            ],
            [
                'name' => 'Information',
                'slug' => 'information',
                'icon' => '📋',
                'color' => '#10b981',
                'description' => 'Demande d\'information sur nos formations',
                'default_duration' => 15,
                'is_active' => true,
                'sort_order' => 2
            ],
            [
                'name' => 'Support technique',
                'slug' => 'support-technique',
                'icon' => '🛠️',
                'color' => '#f59e0b',
                'description' => 'Assistance technique pour nos étudiants',
                'default_duration' => 45,
                'is_active' => true,
                'sort_order' => 3
            ],
            [
                'name' => 'Inscription',
                'slug' => 'inscription',
                'icon' => '📚',
                'color' => '#8b5cf6',
                'description' => 'Inscription à une formation',
                'default_duration' => 60,
                'is_active' => true,
                'sort_order' => 4
            ],
            [
                'name' => 'Autre',
                'slug' => 'autre',
                'icon' => '❓',
                'color' => '#6b7280',
                'description' => 'Autre motif',
                'default_duration' => 30,
                'is_active' => true,
                'sort_order' => 5
            ]
        ];

        foreach ($appointmentTypes as $type) {
            AppointmentType::updateOrCreate(
                ['slug' => $type['slug']],
                $type
            );
        }

        // Durées disponibles
        $durations = [
            [
                'duration' => 15,
                'label' => '15 min',
                'description' => 'Question rapide',
                'is_active' => true,
                'sort_order' => 1
            ],
            [
                'duration' => 30,
                'label' => '30 min',
                'description' => 'Consultation standard',
                'is_active' => true,
                'sort_order' => 2
            ],
            [
                'duration' => 45,
                'label' => '45 min',
                'description' => 'Entretien approfondi',
                'is_active' => true,
                'sort_order' => 3
            ],
            [
                'duration' => 60,
                'label' => '1h',
                'description' => 'Rendez-vous détaillé',
                'is_active' => true,
                'sort_order' => 4
            ],
            [
                'duration' => 90,
                'label' => '1h30',
                'description' => 'Session complète',
                'is_active' => true,
                'sort_order' => 5
            ],
            [
                'duration' => 120,
                'label' => '2h',
                'description' => 'Accompagnement personnalisé',
                'is_active' => true,
                'sort_order' => 6
            ]
        ];

        foreach ($durations as $duration) {
            AppointmentDuration::updateOrCreate(
                ['duration' => $duration['duration']],
                $duration
            );
        }

        // Initialiser les horaires d'ouverture par défaut si pas déjà existants
        if (BusinessHours::count() === 0) {
            BusinessHours::initializeDefaultHours();
        }
    }
}