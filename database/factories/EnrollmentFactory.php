<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class EnrollmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $courses = \App\Models\Course::has('course_sessions')
            ->with('course_sessions')
            ->get();

        if ($courses->isEmpty()) {
            throw new \Exception('No courses with sessions available');
        }

        $course = $courses->random();
        $session = $course->course_sessions->random();
        
        // Distribution réaliste des modes de formation
        $modes = $this->getRealisticEnrollmentModes();
        $selectedMode = $this->faker->randomElement($modes);
        
        // Probabilité de téléchargement de certificat basée sur des critères réalistes
        $certificateDownloaded = $this->shouldCertificateBeDownloaded($session);

        return [
            'user_id'                   => \App\Models\User::inRandomOrder()->first()->id,
            'course_id'                 => $course->id,
            'course_session_id'         => $session->id,
            'mode'                      => $selectedMode,
            'is_certificate_downloaded' => $certificateDownloaded,
        ];
    }

    /**
     * Retourne une distribution réaliste des modes de formation
     */
    private function getRealisticEnrollmentModes(): array
    {
        // Distribution pondérée : 60% présentiel, 25% hybride, 15% en ligne
        $modes = [];
        
        // Présentiel (60%)
        for ($i = 0; $i < 60; $i++) {
            $modes[] = 'in-person';
        }
        
        // Hybride (25%) 
        for ($i = 0; $i < 25; $i++) {
            $modes[] = 'hybrid';
        }
        
        // En ligne (15%)
        for ($i = 0; $i < 15; $i++) {
            $modes[] = 'online';
        }
        
        return $modes;
    }

    /**
     * Détermine si le certificat devrait être téléchargé selon des critères réalistes
     */
    private function shouldCertificateBeDownloaded($session): bool
    {
        // Plus la session est ancienne, plus il est probable que le certificat soit téléchargé
        $sessionEndDate = \Carbon\Carbon::parse($session->end_date);
        $daysSinceEnd = $sessionEndDate->diffInDays(now());
        
        if ($sessionEndDate->isFuture()) {
            // Session future = pas de certificat
            return false;
        }
        
        if ($daysSinceEnd <= 7) {
            // Session terminée récemment (0-7 jours) : 30% de chance
            return $this->faker->boolean(30);
        } elseif ($daysSinceEnd <= 30) {
            // Session terminée il y a 1-4 semaines : 70% de chance
            return $this->faker->boolean(70);
        } elseif ($daysSinceEnd <= 90) {
            // Session terminée il y a 1-3 mois : 85% de chance
            return $this->faker->boolean(85);
        } else {
            // Session terminée il y a plus de 3 mois : 95% de chance
            return $this->faker->boolean(95);
        }
    }
}
