<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\PublicAbstractController;
use App\Mail\Contact;
use App\Mail\ContactFormMail;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
use Inertia\Inertia;

/**
 * @OA\Info(
 *     title="API de Contact",
 *     version="1.0.0",
 *     description="API pour gérer les soumissions de formulaires de contact",
 *     @OA\Contact(
 *         email="keraste38@gmail.com"
 *     )
 * )
 */
class ContactUsController extends PublicAbstractController
{
    private $default_data = [];

    private $email = 'keraste38@gmail.com';

    public function __construct()
    {
        $this->default_data = $this->getDefaultData();
    }

    public function contact()
    {
        $data = $this->default_data;
        return Inertia::render('public/contact-us', [
            'data' => $data,
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/contact-submit",
     *     tags={"Contact"},
     *     summary="Soumettre un formulaire de contact",
     *     description="Permet d'envoyer un message via le formulaire de contact",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"firstName","lastName","email","phone","subject","message"},
     *             @OA\Property(property="firstName", type="string", example="Jean"),
     *             @OA\Property(property="lastName", type="string", example="Dupont"),
     *             @OA\Property(property="email", type="string", format="email", example="jean.dupont@example.com"),
     *             @OA\Property(property="phone", type="string", example="+33612345678"),
     *             @OA\Property(property="subject", type="string", example="Demande d'information"),
     *             @OA\Property(property="message", type="string", example="Bonjour, je souhaite plus d'informations sur vos services."),
     *             @OA\Property(property="civility", type="string", enum={"mr","mme","mlle"}, example="mr"),
     *             @OA\Property(property="company", type="string", nullable=true, example="Entreprise XYZ")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Message envoyé avec succès",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Votre message a été envoyé avec succès.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Erreur lors de l'envoi du message",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Une erreur s'est produite lors de l'envoi de votre message. Veuillez réessayer plus tard.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Erreur de validation",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="The given data was invalid."),
     *             @OA\Property(property="errors", type="object")
     *         )
     *     )
     * )
     */
    public function contactSubmit(Request $request)
    {
        // Validation des données
        $validated = $request->validate([
            'firstName'             => 'required|string|max:255',
            'lastName'              => 'required|string|max:255',
            'email'                 => 'required|email|max:255',
            'phone'                 => 'required|string|max:255',
            'subjectMessage'       => 'required|string|max:225',
            'message'               => 'required|string|max:1000',
            'civility'              => 'nullable|in:mr,mme,mlle',
            'company'               => 'nullable|string|max:255',
        ]);

        try {
            // Envoyer l'e-mail
            Mail::to($this->email)->send(new Contact(
                $validated['firstName'],
                $validated['lastName'],
                $validated['email'],
                $validated['phone'],
                $validated['subjectMessage'],
                $validated['message'],
                $validated['civility'] ?? 'mr',
                $validated['company']
            ));

            return response()->json([
                'success' => true,
                'message' => 'Votre message a été envoyé avec succès.',
            ]);
        } catch (Exception $e) {
            Log::error('Erreur lors de l\'envoi de l\'e-mail de contact: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Une erreur s\'est produite lors de l\'envoi de votre message. Veuillez réessayer plus tard.',
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ], 500);
        }
    }
}
