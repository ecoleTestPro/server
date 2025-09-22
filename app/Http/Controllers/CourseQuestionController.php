<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\CourseQuestion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class CourseQuestionController extends Controller
{
    /**
     * Store a new question for a course
     */
    public function store(Request $request)
    {
        // Use Laravel validation like other public forms
        $validated = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'civility' => 'nullable|string|in:Madame,Monsieur',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'company' => 'nullable|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'message' => 'required|string|max:2000',
            'accepts_privacy_policy' => 'required|accepted',
        ], [
            'course_id.required' => 'Le cours est requis.',
            'course_id.exists' => 'Le cours sélectionné n\'existe pas.',
            'first_name.required' => 'Le prénom est requis.',
            'last_name.required' => 'Le nom est requis.',
            'email.required' => 'L\'email est requis.',
            'email.email' => 'L\'email doit être une adresse valide.',
            'message.required' => 'Le message est requis.',
            'message.max' => 'Le message ne peut pas dépasser 2000 caractères.',
            'accepts_privacy_policy.required' => 'Vous devez accepter la politique de confidentialité.',
            'accepts_privacy_policy.accepted' => 'Vous devez accepter la politique de confidentialité.',
        ]);

        try {
            $course = Course::findOrFail($validated['course_id']);

            $question = CourseQuestion::create($validated);

            // TODO: Send email notification to admin
            // $this->sendNotificationToAdmin($question, $course);

            return back()->with('flash', [
                'success' => true,
                'message' => 'Votre question a été envoyée avec succès. Nous vous répondrons dans les plus brefs délais.',
            ]);

        } catch (\Exception $e) {
            return back()->withErrors([
                'message' => 'Une erreur s\'est produite lors de l\'envoi de votre question. Veuillez réessayer.'
            ]);
        }
    }

    /**
     * Get questions for a specific course (for admin)
     */
    public function index(Request $request)
    {
        // If it's an AJAX request, return JSON
        if ($request->expectsJson()) {
            $courseId = $request->get('course_id');
            $isAnswered = $request->get('is_answered');

            $query = CourseQuestion::with(['course' => function($query) {
                $query->with('category:id,title,slug');
            }])
                ->orderBy('created_at', 'desc');

            if ($courseId) {
                $query->forCourse($courseId);
            }

            if ($isAnswered !== null) {
                if ($isAnswered === '1' || $isAnswered === 'true') {
                    $query->answered();
                } else {
                    $query->unanswered();
                }
            }

            $questions = $query->paginate(20);

            return response()->json([
                'success' => true,
                'data' => $questions,
            ]);
        }

        // Otherwise, return the Inertia page
        return Inertia::render('dashboard/course-questions/index', [
            'data' => []
        ]);
    }

    /**
     * Mark question as answered and add admin response
     */
    public function answer(Request $request, CourseQuestion $question)
    {
        $validator = Validator::make($request->all(), [
            'admin_response' => 'required|string|max:2000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $question->update([
                'is_answered' => true,
                'admin_response' => $request->admin_response,
                'answered_at' => now(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Réponse ajoutée avec succès.',
                'data' => $question->fresh(),
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Une erreur s\'est produite.',
            ], 500);
        }
    }

    /**
     * Delete a question
     */
    public function destroy(CourseQuestion $question)
    {
        try {
            $question->delete();

            return response()->json([
                'success' => true,
                'message' => 'Question supprimée avec succès.',
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Une erreur s\'est produite lors de la suppression.',
            ], 500);
        }
    }

    /**
     * Send notification email to admin (to implement later)
     */
    // private function sendNotificationToAdmin(CourseQuestion $question, Course $course)
    // {
    //     // Implementation for sending email notification
    // }
}
