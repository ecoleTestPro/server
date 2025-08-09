<?php

namespace Database\Factories;

use App\Repositories\CourseRepository;
use App\Repositories\CourseSessionRepository;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class CourseSessionScheduleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        try {
            $course_session = CourseSessionRepository::getAll()->random();
            $course = CourseRepository::findById($course_session->course_id);

            // Génère des créneaux horaires réalistes pour une formation professionnelle
            $scheduleSlot = $this->generateRealisticSchedule($course_session);

            return [
                'course_session_id' => $course_session->id,
                'start_time'        => $scheduleSlot['start_time'],
                'end_time'          => $scheduleSlot['end_time'],
                'date'              => $scheduleSlot['date'],
                'title'             => $this->generateSessionTitle($course, $scheduleSlot['session_type']),
                'description'       => $this->generateSessionDescription($course, $scheduleSlot['session_type']),
            ];
        } catch (\Exception $e) {
            throw new \Exception("Error generating CourseSessionSchedule: " . $e->getMessage());
        }
    }

    /**
     * Génère un planning réaliste de formation
     */
    private function generateRealisticSchedule($courseSession): array
    {
        $sessionStart = Carbon::parse($courseSession->start_date);
        $sessionEnd = Carbon::parse($courseSession->end_date);
        
        // Choisir une date aléatoire dans la période de formation (jours ouvrables uniquement)
        $currentDate = $sessionStart->copy();
        $validDates = [];
        
        while ($currentDate->lte($sessionEnd)) {
            if (!$currentDate->isWeekend()) {
                $validDates[] = $currentDate->copy();
            }
            $currentDate->addDay();
        }
        
        if (empty($validDates)) {
            $scheduleDate = $sessionStart;
        } else {
            $scheduleDate = $this->faker->randomElement($validDates);
        }

        // Définir les créneaux horaires standards d'une formation professionnelle
        $timeSlots = [
            'morning_session' => [
                'start' => $this->faker->randomElement(['08:30', '09:00']),
                'duration' => $this->faker->numberBetween(90, 180), // 1h30 à 3h
                'type' => 'Cours magistral'
            ],
            'morning_break' => [
                'start' => $this->faker->randomElement(['10:15', '10:30']),
                'duration' => 15,
                'type' => 'Pause'
            ],
            'late_morning' => [
                'start' => $this->faker->randomElement(['10:45', '11:00']),
                'duration' => $this->faker->numberBetween(75, 120), // 1h15 à 2h
                'type' => 'Travaux pratiques'
            ],
            'lunch_break' => [
                'start' => '12:00',
                'duration' => 60,
                'type' => 'Pause déjeuner'
            ],
            'afternoon_session' => [
                'start' => $this->faker->randomElement(['13:00', '13:30']),
                'duration' => $this->faker->numberBetween(90, 150), // 1h30 à 2h30
                'type' => 'Atelier pratique'
            ],
            'afternoon_break' => [
                'start' => '15:00',
                'duration' => 15,
                'type' => 'Pause'
            ],
            'late_afternoon' => [
                'start' => '15:15',
                'duration' => $this->faker->numberBetween(75, 105), // 1h15 à 1h45
                'type' => 'Synthèse et évaluation'
            ]
        ];

        // Choisir un créneau aléatoire (exclure les pauses pour les données principales)
        $mainSlots = ['morning_session', 'late_morning', 'afternoon_session', 'late_afternoon'];
        $selectedSlot = $this->faker->randomElement($mainSlots);
        $slot = $timeSlots[$selectedSlot];

        $startTime = $scheduleDate->copy()->setTimeFromTimeString($slot['start'] . ':00');
        $endTime = $startTime->copy()->addMinutes($slot['duration']);

        return [
            'date' => $scheduleDate->format('Y-m-d'),
            'start_time' => $startTime,
            'end_time' => $endTime,
            'session_type' => $slot['type']
        ];
    }

    /**
     * Génère un titre de session réaliste
     */
    private function generateSessionTitle($course, string $sessionType): string
    {
        $sessionTitles = [
            'Cours magistral' => [
                "Introduction à {$course->title}",
                "Fondamentaux : {$course->title}",
                "Concepts clés - {$course->title}",
                "Théorie et principes - {$course->title}"
            ],
            'Travaux pratiques' => [
                "TP : Application pratique - {$course->title}",
                "Exercices pratiques : {$course->title}",
                "Mise en situation - {$course->title}",
                "Laboratoire : {$course->title}"
            ],
            'Atelier pratique' => [
                "Atelier : {$course->title}",
                "Workshop pratique - {$course->title}",
                "Cas pratiques : {$course->title}",
                "Session d'application - {$course->title}"
            ],
            'Synthèse et évaluation' => [
                "Synthèse : {$course->title}",
                "Évaluation des acquis - {$course->title}",
                "Bilan et perspectives - {$course->title}",
                "Quiz et révisions - {$course->title}"
            ]
        ];

        $titles = $sessionTitles[$sessionType] ?? ["{$sessionType} - {$course->title}"];
        return $this->faker->randomElement($titles);
    }

    /**
     * Génère une description de session réaliste
     */
    private function generateSessionDescription($course, string $sessionType): string
    {
        $descriptions = [
            'Cours magistral' => [
                "Présentation théorique des concepts fondamentaux. Exposé détaillé avec support visuel et documentation.",
                "Introduction aux principes de base et aux méthodologies. Cours interactif avec questions-réponses.",
                "Exposé magistral sur les éléments clés du programme. Support de cours fourni."
            ],
            'Travaux pratiques' => [
                "Exercices pratiques en binômes ou en groupe. Mise en application des concepts théoriques.",
                "Travaux dirigés avec correction en temps réel. Accompagnement personnalisé des participants.",
                "Séance de mise en pratique avec études de cas concrets et exercices guidés."
            ],
            'Atelier pratique' => [
                "Atelier interactif avec manipulation d'outils et techniques. Apprentissage par la pratique.",
                "Workshop collaboratif axé sur la résolution de problèmes réels. Travail en équipe encouragé.",
                "Session pratique intensive avec projet à réaliser. Encadrement par l'expert formateur."
            ],
            'Synthèse et évaluation' => [
                "Récapitulatif des points clés de la formation. Évaluation des connaissances acquises.",
                "Bilan de la session avec quiz d'évaluation. Remise des attestations de participation.",
                "Synthèse générale et échange sur les acquis. Test de validation des compétences."
            ]
        ];

        $typeDescriptions = $descriptions[$sessionType] ?? ["Session de formation : {$sessionType}"];
        return $this->faker->randomElement($typeDescriptions);
    }
}
