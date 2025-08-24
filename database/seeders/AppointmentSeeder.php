<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Appointment;
use Carbon\Carbon;
use Faker\Factory as Faker;

class AppointmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('fr_FR');
        
        // Supprimer les anciens rendez-vous s'ils existent
        Appointment::truncate();

        // Titres de rendez-vous réalistes pour un centre de formation
        $appointmentTitles = [
            'Consultation orientation professionnelle',
            'Information formation développement web',
            'Entretien inscription formation marketing',
            'Conseil formation cybersécurité',
            'Rendez-vous information formation comptabilité',
            'Consultation projet reconversion',
            'Information formations certifiantes',
            'Entretien admission formation',
            'Support technique plateforme',
            'Consultation financement formation',
            'Information formations en ligne',
            'Rendez-vous suivi pédagogique',
            'Consultation VAE',
            'Information formation langues',
            'Entretien personnalisé projet professionnel',
            'Conseil formations management',
            'Information bourses et aides',
            'Consultation formation continue',
            'Rendez-vous orientation carrière',
            'Information formation design graphique',
        ];

        $descriptions = [
            'Échange pour définir un parcours de formation adapté aux objectifs professionnels',
            'Présentation détaillée des programmes et modalités de formation',
            'Discussion sur les prérequis et les débouchés professionnels',
            'Analyse des besoins de formation et conseil personnalisé',
            'Information sur les certifications et leur reconnaissance',
            'Accompagnement dans le choix de formation',
            'Présentation des méthodes pédagogiques et des outils',
            'Évaluation du niveau et recommandations',
            'Support pour utilisation de la plateforme e-learning',
            'Information sur les dispositifs de financement disponibles',
            'Démonstration des formations à distance',
            'Point sur l\'avancement du parcours de formation',
            'Conseil pour validation des acquis de l\'expérience',
            'Information sur les formations linguistiques professionnelles',
            'Bilan de compétences et projet professionnel',
            'Présentation des formations en management et leadership',
            'Information sur les aides financières et bourses',
            'Conseil pour plan de formation entreprise',
            'Accompagnement dans l\'évolution de carrière',
            'Présentation des formations créatives et digitales',
        ];

        // Durées courantes pour les rendez-vous
        $durations = [15, 30, 45, 60, 90, 120];

        for ($i = 0; $i < 100; $i++) {
            // Date aléatoire entre il y a 30 jours et dans 60 jours
            $appointmentDate = $faker->dateTimeBetween('-30 days', '+60 days');
            $appointmentDate = Carbon::parse($appointmentDate);
            
            // Ajuster pour avoir des heures de bureau (9h-18h)
            $appointmentDate = $appointmentDate->setTime(
                $faker->numberBetween(9, 17),
                $faker->randomElement([0, 15, 30, 45])
            );

            Appointment::create([
                'title' => $faker->randomElement($appointmentTitles),
                'description' => $faker->randomElement($descriptions),
                'appointment_date' => $appointmentDate,
                'duration' => $faker->randomElement($durations),
                'client_email' => $faker->email,
                'client_phone' => $faker->phoneNumber,
                'metadata' => json_encode([
                    'source' => $faker->randomElement(['website', 'phone', 'email', 'referral']),
                    'priority' => $faker->randomElement(['low', 'medium', 'high']),
                ]),
                'admin_notes' => $faker->boolean(30) ? $faker->sentence(10) : null,
                'created_at' => $faker->dateTimeBetween('-60 days', 'now'),
                'updated_at' => $faker->dateTimeBetween('-60 days', 'now'),
            ]);
        }

        $this->command->info('100 rendez-vous créés avec succès !');
    }
}