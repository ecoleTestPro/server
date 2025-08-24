<?php

namespace App\Http\Controllers\Admin;

use App\Models\Appointment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\JsonResponse;

class AppointmentController
{
    /**
     * Affiche la liste des rendez-vous pour l'administration
     */
    public function index(Request $request): Response
    {
        $query = Appointment::with(['user'])
            ->orderBy('appointment_date', 'desc');

        // Filtres de recherche
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('client_email', 'like', "%{$search}%")
                    ->orWhere('client_phone', 'like', "%{$search}%")
                    ->orWhere('title', 'like', "%{$search}%")
                    ->orWhereHas('user', function ($userQuery) use ($search) {
                        $userQuery->where('name', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%");
                    });
            });
        }

        // Filtre par statut
        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }


        // Filtre par date
        if ($request->filled('date_from')) {
            $query->whereDate('appointment_date', '>=', $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->whereDate('appointment_date', '<=', $request->date_to);
        }

        $appointments = $query->paginate(15)->withQueryString();


        return Inertia::render('dashboard/appointments/index', [
            'appointments' => $appointments,
            'filters' => $request->only(['search', 'status', 'date_from', 'date_to']),
        ]);
    }

    /**
     * Affiche les détails d'un rendez-vous
     */
    public function show(Appointment $appointment): Response
    {
        $appointment->load(['user']);

        return Inertia::render('dashboard/appointments/show', [
            'appointment' => $appointment,
        ]);
    }

    /**
     * Met à jour le statut d'un rendez-vous
     */
    public function updateStatus(Request $request, Appointment $appointment): JsonResponse
    {
        $request->validate([
            'status' => 'required|in:' . implode(',', [
                Appointment::STATUS_PENDING,
                Appointment::STATUS_CONFIRMED,
                Appointment::STATUS_COMPLETED,
                Appointment::STATUS_CANCELLED
            ]),
            'notes' => 'nullable|string|max:500'
        ]);

        $appointment->update([
            'status' => $request->status,
            'admin_notes' => $request->notes,
            'admin_user_id' => auth()->id()
        ]);

        // Log de l'activité
        activity()
            ->performedOn($appointment)
            ->causedBy(auth()->user())
            ->withProperties([
                'old_status' => $appointment->getOriginal('status'),
                'new_status' => $request->status,
                'notes' => $request->notes
            ])
            ->log('Statut du rendez-vous mis à jour');

        return response()->json([
            'message' => 'Statut mis à jour avec succès',
            'appointment' => $appointment->fresh(['user'])
        ]);
    }

    /**
     * Supprime un rendez-vous
     */
    public function destroy(Appointment $appointment): JsonResponse
    {
        // Log de l'activité avant suppression
        activity()
            ->performedOn($appointment)
            ->causedBy(auth()->user())
            ->withProperties($appointment->toArray())
            ->log('Rendez-vous supprimé');

        $appointment->delete();

        return response()->json([
            'message' => 'Rendez-vous supprimé avec succès'
        ]);
    }

    /**
     * Exporte la liste des rendez-vous
     */
    public function export(Request $request): \Symfony\Component\HttpFoundation\BinaryFileResponse
    {
        $query = Appointment::with(['user'])->orderBy('appointment_date', 'desc');

        // Appliquer les mêmes filtres que l'index
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('client_email', 'like', "%{$search}%")
                    ->orWhere('client_phone', 'like', "%{$search}%")
                    ->orWhere('title', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }


        $appointments = $query->get();

        $csvData = [];
        $csvData[] = [
            'ID',
            'Titre',
            'Client Email',
            'Client Téléphone',
            'Date et Heure',
            'Durée (min)',
            'Type',
            'Statut',
            'Description',
            'Créé le'
        ];

        foreach ($appointments as $appointment) {
            $csvData[] = [
                $appointment->id,
                $appointment->title,
                $appointment->client_email,
                $appointment->client_phone,
                $appointment->appointment_date->format('Y-m-d H:i'),
                $appointment->duration,
                $this->getTypeLabel($appointment->type),
                $this->getStatusLabel($appointment->status),
                $appointment->description,
                $appointment->created_at->format('Y-m-d H:i')
            ];
        }

        $filename = 'rendez-vous-' . now()->format('Y-m-d-H-i') . '.csv';
        $handle = fopen('php://temp', 'w');

        foreach ($csvData as $row) {
            fputcsv($handle, $row, ';');
        }

        rewind($handle);
        $content = stream_get_contents($handle);
        fclose($handle);

        return response()->streamDownload(function () use ($content) {
            echo $content;
        }, $filename, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ]);
    }

    private function getTypeLabel(string $type): string
    {
        return match ($type) {
            Appointment::TYPE_CONSULTATION => 'Consultation',
            Appointment::TYPE_INFORMATION => 'Demande d\'information',
            Appointment::TYPE_SUPPORT => 'Support technique',
            Appointment::TYPE_ENROLLMENT => 'Inscription formation',
            Appointment::TYPE_OTHER => 'Autre',
            default => $type,
        };
    }

    private function getStatusLabel(string $status): string
    {
        return match ($status) {
            Appointment::STATUS_PENDING => 'En attente',
            Appointment::STATUS_CONFIRMED => 'Confirmé',
            Appointment::STATUS_COMPLETED => 'Terminé',
            Appointment::STATUS_CANCELLED => 'Annulé',
            default => $status,
        };
    }
}
