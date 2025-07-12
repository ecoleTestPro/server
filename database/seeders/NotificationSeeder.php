<?php

namespace Database\Seeders;

use App\Enum\NotificationTypeEnum;
use App\Repositories\NotificationRepository;
use Illuminate\Database\Seeder;

class NotificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        NotificationRepository::query()->updateOrCreate([
            'type' => NotificationTypeEnum::NewContentFromCourse->value,
        ], [
            'is_enabled' => true,
            'heading' => 'Ajouter un nouveau contenu : Gardez votre cours frais et attrayant',
            'content' => 'Un nouveau contenu a été ajouté à votre cours inscrit {course_title}'
        ]);

        NotificationRepository::query()->updateOrCreate([
            'type' => NotificationTypeEnum::NewCourseFromInstructor->value,
        ], [
            'is_enabled' => true,
            'heading' => 'Bien joué ! Votre cours est maintenant prêt pour les apprenants du monde entier',
            'content' => 'Votre instructeur a ajouté un nouveau cours {course_title}'
        ]);
        NotificationRepository::query()->updateOrCreate([
            'type' => NotificationTypeEnum::NewExamFromCourse->value,
        ], [
            'is_enabled' => true,
            'heading' => 'Êtes-vous prêt ? Une nouvelle évaluation vous attend',
            'content' => 'Un nouvel examen a été ajouté à votre cours inscrit {course_title}',
        ]);
        NotificationRepository::query()->updateOrCreate([
            'type' => NotificationTypeEnum::NewQuizFromCourse->value,
        ], [
            'is_enabled' => true,
            'heading' => 'Êtes-vous prêt ? Un nouveau quiz vous attend',
            'content' => 'Un nouveau quiz a été ajouté à votre cours inscrit {course_title}',
        ]);
        NotificationRepository::query()->updateOrCreate([
            'type' => NotificationTypeEnum::CustomNotification->value,
        ], [
            'is_enabled' => true,
            'heading' => 'Nouvelle notification de ' . config('app.name'),
            'content' => 'Vente Flash ! Inscrivez-vous à {course_title} avec 60 % de réduction – 24 heures seulement !',
        ]);
        NotificationRepository::query()->updateOrCreate([
            'type' => NotificationTypeEnum::NewEnrollmentNotification->value,
        ], [
            'is_enabled' => true,
            'heading' => 'Nouvelle inscription au cours',
            'content' => 'Félicitations ! Vous êtes maintenant inscrit à {course_title}. Débloquons ensemble de nouvelles opportunités !',
        ]);

        NotificationRepository::query()->updateOrCreate([
            'type' => NotificationTypeEnum::NewUserRegistered->value,
        ], [
            'is_enabled' => true,
            'heading' => 'Nouvelle inscription utilisateur',
            'content' => 'L\'utilisateur {user_name} vient de s\'inscrire sur la plateforme',
        ]);
    }
}
