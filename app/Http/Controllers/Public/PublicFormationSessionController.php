<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\PublicAbstractController;
use App\Repositories\CategoryRepository;
use App\Repositories\CourseRepository;
use App\Repositories\CourseSessionRepository;
use Exception;
use Illuminate\Support\Facades\Log;
use Eluceo\iCal\Domain\Entity\Calendar;
use Eluceo\iCal\Domain\Entity\Event;
use Eluceo\iCal\Domain\ValueObject\DateTime;
use Eluceo\iCal\Domain\ValueObject\TimeSpan;
use Eluceo\iCal\Presentation\Factory\CalendarFactory;

class PublicFormationSessionController extends PublicAbstractController
{

    private $default_data = [];

    public function __construct()
    {
        $this->default_data = $this->getDefaultData();
    }

    /**
     * Renvoie les horaires d'une session de formation.
     *
     * @param int $sessionId ID de la session
     * @return \Illuminate\Http\JsonResponse
     */
    public function getSessionSchedules($sessionId)
    {
        try {
            $schedules = CourseSessionRepository::getById($sessionId);
            if (!$schedules) {
                return response()->json(['error' => 'Aucun horaire trouvé pour cette session.'], 404);
            }

            return response()->json($schedules);
        } catch (Exception $e) {
            Log::error("Error in getSessionSchedules: {$e->getMessage()}");
            return response()->json(['error' => 'Une erreur est survenue lors de la récupération des horaires.'], 500);
        }
    }

    public function downloadSessionSchedules($sessionId)
    {
        try {
            // Récupérer les horaires depuis le repository
            $session = CourseSessionRepository::getById($sessionId);
            if (!$session || !$session->schedules) {
                return response()->json(['error' => 'Aucun horaire trouvé pour cette session.'], 404);
            }

            // Créer un calendrier
            $calendar = new Calendar();

            // Ajouter chaque événement au calendrier
            foreach ($session->schedules as $schedule) {
                $event = new Event();
                $event
                    ->setSummary($schedule->title ?? 'Session sans titre')
                    ->setDescription($schedule->description ?? '')
                    ->setLocation(new \Eluceo\iCal\Domain\ValueObject\Location($schedule->location ?? 'Lieu non spécifié'))
                    ->setOccurrence(
                        new TimeSpan(
                            new DateTime(new \DateTimeImmutable($schedule->start_time), false),
                            new DateTime(new \DateTimeImmutable($schedule->end_time), false)
                        )
                    );

                $calendar->addEvent($event);
            }

            // Transformer le calendrier en composant iCalendar
            $calendarFactory = new CalendarFactory();
            $calendarComponent = $calendarFactory->createCalendar($calendar);

            // Générer le contenu du fichier .ics
            $icsContent = (string) $calendarComponent;

            // Définir les en-têtes pour le téléchargement
            $fileName = 'session_' . $sessionId . '.ics';
            $headers = [
                'Content-Type' => 'text/calendar; charset=utf-8',
                'Content-Disposition' => 'attachment; filename="' . $fileName . '"',
            ];

            // Retourner la réponse avec le contenu .ics
            return response($icsContent, 200, $headers);
        } catch (Exception $e) {
            Log::error("Error in downloadSessionSchedules: {$e->getMessage()}");
            return response()->json(['error' => 'Une erreur est survenue lors du téléchargement des horaires.'], 500);
        }
    }
}
