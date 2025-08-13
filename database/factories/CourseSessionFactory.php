<?php

namespace Database\Factories;

use App\Repositories\CourseRepository;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class CourseSessionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $course = CourseRepository::getAll()->random();

        // Génère des dates plus réalistes pour un centre de formation
        $startDate = $this->generateRealisticStartDate();
        $endDate = $this->generateRealisticEndDate($startDate, $course->duration ?? 5);

        return [
            'course_id'      => $course->id,
            'location'       => $this->faker->randomElement([
                "Abidjan, Plateau - Centre de formation EcoleTestPro",
                "Abidjan, Cocody - Salle de conférence Riviera",
                "Abidjan, Marcory - Centre d'affaires Zone 4",
                "San Pedro, Centre-ville - Hôtel Palm Beach",
                "Yamoussoukro, Centre - Complexe hôtelier Président"
            ]),
            'country'        => "Cote d'Ivoire",
            'city'           => $this->faker->randomElement(["Abidjan", "San Pedro", "Yamoussoukro", "Bouaké", "Korhogo"]),
            'longitude'      => $this->faker->randomFloat(4, -8.5, -2.5),
            'latitude'       => $this->faker->randomFloat(4, 4.0, 10.5),
            'timezone'       => "Africa/Abidjan",
            'language'       => "fr",
            'start_date'     => $startDate,
            'end_date'       => $endDate,
            'price'          => $course->regular_price,
            'price_discount' => $course->price,
            'tva'            => 18,
        ];
    }

    /**
     * Génère une date de début réaliste pour une formation professionnelle
     */
    private function generateRealisticStartDate(): Carbon
    {
        // 60% de sessions dans les 3 prochains mois, 30% dans les 6 mois, 10% dans l'année
        $probability = $this->faker->numberBetween(1, 100);
        
        if ($probability <= 60) {
            // Sessions proches (1-12 semaines)
            $weeksAhead = $this->faker->numberBetween(1, 12);
        } elseif ($probability <= 90) {
            // Sessions moyennes (3-6 mois)
            $weeksAhead = $this->faker->numberBetween(12, 26);
        } else {
            // Sessions lointaines (6-12 mois)
            $weeksAhead = $this->faker->numberBetween(26, 52);
        }

        // Commence toujours un lundi ou mardi (formations professionnelles)
        $startDay = $this->faker->randomElement(['monday', 'tuesday']);
        $baseDate = Carbon::now()->addWeeks($weeksAhead)->startOfWeek();
        
        if ($startDay === 'tuesday') {
            $baseDate->addDay();
        }

        // Horaire de formation standard (8h30 ou 9h00)
        $startTime = $this->faker->randomElement(['08:30:00', '09:00:00', '08:00:00']);
        
        return $baseDate->setTimeFromTimeString($startTime);
    }

    /**
     * Génère une date de fin réaliste selon la durée du cours
     */
    private function generateRealisticEndDate(Carbon $startDate, int $durationDays): string
    {
        $endDate = $startDate->copy();
        
        // Pour des formations courtes (1-3 jours)
        if ($durationDays <= 3) {
            $endDate->addDays($durationDays - 1);
            // Horaire de fin standard (16h30 ou 17h00)
            $endTime = $this->faker->randomElement(['16:30:00', '17:00:00', '16:00:00']);
            $endDate->setTimeFromTimeString($endTime);
        }
        // Pour des formations moyennes (4-10 jours)  
        elseif ($durationDays <= 10) {
            // Répartir sur 1-2 semaines en évitant les week-ends
            $businessDays = 0;
            while ($businessDays < $durationDays) {
                $endDate->addDay();
                if ($endDate->isWeekend()) {
                    continue; // Ignorer les week-ends
                }
                $businessDays++;
            }
            $endDate->setTimeFromTimeString('17:00:00');
        }
        // Pour des formations longues (>10 jours)
        else {
            // Répartir sur plusieurs semaines
            $weeks = ceil($durationDays / 5);
            $endDate->addWeeks($weeks);
            $endDate->setTimeFromTimeString('17:00:00');
        }

        return $endDate->format('Y-m-d H:i:s');
    }
}
