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
        $query = Appointment::orderBy('appointment_date', 'desc');

        // Filtres de recherche
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('client_email', 'like', "%{$search}%")
                    ->orWhere('client_phone', 'like', "%{$search}%")
                    ->orWhere('title', 'like', "%{$search}%");
            });
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
            'filters' => $request->only(['search', 'date_from', 'date_to']),
        ]);
    }

    /**
     * Affiche les détails d'un rendez-vous
     */
    public function show(Appointment $appointment): Response
    {
        return Inertia::render('dashboard/appointments/show', [
            'appointment' => $appointment,
        ]);
    }

    /**
     * Supprime un rendez-vous
     */
    public function destroy(Appointment $appointment): JsonResponse
    {
        $appointment->delete();

        return response()->json([
            'message' => 'Rendez-vous supprimé avec succès'
        ]);
    }

    /**
     * Exporte la liste des rendez-vous
     */
    public function export(Request $request): \Symfony\Component\HttpFoundation\StreamedResponse
    {
        $query = Appointment::orderBy('appointment_date', 'desc');

        // Appliquer les mêmes filtres que l'index
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('client_email', 'like', "%{$search}%")
                    ->orWhere('client_phone', 'like', "%{$search}%")
                    ->orWhere('title', 'like', "%{$search}%");
            });
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
}
