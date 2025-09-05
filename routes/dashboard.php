<?php

use App\Http\Controllers\Private\BlogCategoryController;
use App\Http\Controllers\Private\BlogController;
use App\Http\Controllers\Private\CategoryController;
use App\Http\Controllers\Private\CourseController;
use App\Http\Controllers\Private\CourseSessionController;
use App\Http\Controllers\Private\DashboardController;
use App\Http\Controllers\Private\FaqController;
use App\Http\Controllers\Private\NewsletterController;
use App\Http\Controllers\Private\NewsletterTemplateController;
use App\Http\Controllers\Private\NewsletterLogController;
use App\Http\Controllers\Private\SettingController;
use App\Http\Controllers\Private\TestimonialController;
use App\Http\Controllers\Private\ReferenceController;
use App\Http\Controllers\Private\PartnerController;
use App\Http\Controllers\Private\JobOfferController;
use App\Http\Controllers\Private\EnrollmentController;
use App\Http\Controllers\Private\NotificationController;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Admin\BusinessHoursController;
use App\Http\Controllers\Private\PrivateAppointmentController;
use App\Http\Controllers\Public\AppointmentController;
use Illuminate\Support\Facades\Route;

use Inertia\Inertia;

/***
 * * Dashboard Routes
 */

Route::middleware(['auth', 'verified'])->prefix('dashboard')->group(function () {
    // DASHBOARD HOME
    Route::get('', [DashboardController::class, 'index'])->name('dashboard.index');

    // NOTIFICATIONS
    Route::get('notifications', [NotificationController::class, 'index'])->name('dashboard.notifications.index');


    // COURSE MANAGEMENT
    Route::group([
        'prefix' => 'courses',
    ], function () {
        Route::get('',                  [CourseController::class, 'index'])->name('dashboard.course.index');
        Route::get('all',               [CourseController::class, 'allCourses'])->name('dashboard.course.all');
        Route::get('edit/{slug}',       [CourseController::class, 'create'])->name('dashboard.course.edit');
        Route::get('create',            [CourseController::class, 'create'])->name('dashboard.course.create');
        Route::post('create',           [CourseController::class, 'store'])->name('dashboard.course.store');
        Route::put('update/{slug}',     [CourseController::class, 'update'])->name('dashboard.course.update');
        Route::get('partners/{slug}',   [CourseController::class, 'getCoursePartners'])->name('dashboard.course.partners.get');
        Route::post('partners/{slug}',  [CourseController::class, 'syncPartners'])->name('dashboard.course.partners.sync');
        Route::get('{id}/enrollments/count', [CourseController::class, 'getEnrollmentCount'])->name('dashboard.course.enrollments.count');
        Route::patch('{id}/toggle-featured', [CourseController::class, 'toggleFeatured'])->name('dashboard.course.toggle-featured');
        Route::delete('delete/{id}',    [CourseController::class, 'delete'])->name('dashboard.course.delete');
        Route::post('{course}/sessions', [CourseSessionController::class, 'store'])->name('dashboard.course.session.store');
        Route::put('sessions/{session}', [CourseSessionController::class, 'update'])->name('dashboard.course.session.update');
        Route::patch('sessions/{session}/toggle-confirmed', [CourseSessionController::class, 'toggleConfirmed'])->name('dashboard.course.session.toggle-confirmed');
        Route::patch('sessions/batch/confirm', [CourseSessionController::class, 'confirmMultiple'])->name('dashboard.course.session.confirm.batch');
        Route::delete('sessions/batch', [CourseSessionController::class, 'destroyMultiple'])->name('dashboard.course.session.delete.batch');
        Route::delete('sessions/{session}', [CourseSessionController::class, 'destroy'])->name('dashboard.course.session.delete');
    });

    // CATEGORY COURSE MANAGEMENT
    Route::group([
        'prefix' => 'categories',
    ], function () {
        Route::get('',                     [CategoryController::class, 'index'])->name('dashboard.category.index');
        Route::get('create',               [CategoryController::class, 'create'])->name('dashboard.category.create');
        Route::post('store',               [CategoryController::class, 'store'])->name('dashboard.category.store');
        Route::post('update',              [CategoryController::class, 'update'])->name('dashboard.category.update');
        Route::delete('delete/{category}', [CategoryController::class, 'delete'])->name('dashboard.category.delete');
    });

    // ENROLLMENTS MANAGEMENT
    Route::group([
        'prefix' => 'enrollments',
    ], function () {
        Route::get('', [EnrollmentController::class, 'index'])->name('dashboard.enrollment.index');
        Route::delete('delete/{enrollment}', [EnrollmentController::class, 'destroy'])->name('dashboard.enrollment.delete');
    });


    // APP SETTINGS 
    Route::group([
        'prefix' => 'settings',
    ], function () {
        Route::get('', [SettingController::class, 'index'])->name('settings.app.index');

        // Route::redirect('', 'dashboard/settings/profile');

        Route::get('profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        Route::get('password', [PasswordController::class, 'edit'])->name('password.edit');
        Route::put('password', [PasswordController::class, 'update'])->name('password.update');

        Route::get('appearance', function () {
            return Inertia::render('dashboard/settings/user/appearance');
        })->name('appearance');

        // APP SETTINGS
        Route::group([
            'prefix' => 'app',
        ], function () {
            // Route::get('', [SettingController::class, 'index'])->name('settings.app.index');
            // Route::patch('settings', [SettingsController::class, 'update'])->name('settings.update');
        });
    });

    // Blogs
    Route::group([
        'prefix' => 'blogs',
    ], function () {
        Route::get('', [BlogController::class, 'index'])->name('dashboard.blogs.index');
        Route::get('create', [BlogController::class, 'create'])->name('dashboard.blogs.create');
        Route::get('edit/{slug}', [BlogController::class, 'edit'])->name('dashboard.blogs.edit');
        Route::post('store', [BlogController::class, 'store'])->name('dashboard.blogs.store');
        Route::post('update', [BlogController::class, 'update'])->name('dashboard.blogs.update');
        Route::delete('delete/{id}', [BlogController::class, 'delete'])->name('dashboard.blogs.delete');
        Route::post('category/create', [BlogCategoryController::class, 'store'])->name('dashboard.blogs.category.store');
    });

    // TESTIMONIALS
    Route::group([
        'prefix' => 'testimonials',
    ], function () {
        Route::get('',               [TestimonialController::class, 'index'])->name('dashboard.testimonial.index');
        Route::get('create',         [TestimonialController::class, 'create'])->name('dashboard.testimonial.create');
        Route::get('edit/{slug}',    [TestimonialController::class, 'edit'])->name('dashboard.testimonial.edit');
        Route::post('create',        [TestimonialController::class, 'store'])->name('dashboard.testimonial.store');
        Route::put('update/{testimonial}', [TestimonialController::class, 'update'])->name('dashboard.testimonial.update');
        Route::delete('delete/{testimonial}', [TestimonialController::class, 'destroy'])->name('dashboard.testimonial.delete');
        Route::post('toggle/{testimonial}', [TestimonialController::class, 'toggle'])->name('dashboard.testimonial.toggle');
        Route::post('restore/{testimonial}', [TestimonialController::class, 'restore'])->name('dashboard.testimonial.restore');
    });


    // FAQS
    Route::group([
        'prefix' => 'faqs',
    ], function () {
        Route::get('',               [FaqController::class, 'index'])->name('dashboard.faqs.index');
        Route::post('create',        [FaqController::class, 'store'])->name('dashboard.faqs.store');
        Route::put('update/{faq}',   [FaqController::class, 'update'])->name('dashboard.faqs.update');
        Route::delete('delete/{faq}', [FaqController::class, 'destroy'])->name('dashboard.faqs.delete');
        Route::post('restore/{faq}', [FaqController::class, 'restore'])->name('dashboard.faqs.restore');
    });

    // REFERENCES
    Route::group([
        'prefix' => 'references',
    ], function () {
        Route::get('',               [ReferenceController::class, 'index'])->name('dashboard.references.index');
        Route::post('create',        [ReferenceController::class, 'store'])->name('dashboard.references.store');
        Route::put('update/{reference}', [ReferenceController::class, 'update'])->name('dashboard.references.update');
        Route::delete('delete/{reference}', [ReferenceController::class, 'destroy'])->name('dashboard.references.delete');
        Route::post('restore/{reference}', [ReferenceController::class, 'restore'])->name('dashboard.references.restore');
    });

    // JOB OFFERS
    Route::group([
        'prefix' => 'job-offers',
    ], function () {
        Route::get('', [JobOfferController::class, 'index'])->name('dashboard.job-offers.index');
        Route::post('create', [JobOfferController::class, 'store'])->name('dashboard.job-offers.store');
        Route::put('update/{jobOffer}', [JobOfferController::class, 'update'])->name('dashboard.job-offers.update');
        Route::delete('delete/{jobOffer}', [JobOfferController::class, 'destroy'])->name('dashboard.job-offers.delete');
        Route::post('restore/{id}', [JobOfferController::class, 'restore'])->name('dashboard.job-offers.restore');
        Route::post('toggle/{jobOffer}', [JobOfferController::class, 'toggle'])->name('dashboard.job-offers.toggle');
    });

    // PARTNERS
    Route::group([
        'prefix' => 'partners',
    ], function () {
        Route::get('',               [PartnerController::class, 'index'])->name('dashboard.partners.index');
        Route::post('create',        [PartnerController::class, 'store'])->name('dashboard.partners.store');
        Route::put('update/{partner}', [PartnerController::class, 'update'])->name('dashboard.partners.update');
        Route::delete('delete/{partner}', [PartnerController::class, 'destroy'])->name('dashboard.partners.delete');
        Route::post('restore/{partner}', [PartnerController::class, 'restore'])->name('dashboard.partners.restore');
    });

    // NEWSLETTERS
    Route::group([
        'prefix' => 'newsletters',
    ], function () {
        Route::get('', [NewsletterController::class, 'index'])->name('dashboard.newsletters.index');
        Route::get('compose', [NewsletterController::class, 'compose'])->name('dashboard.newsletters.compose');
        Route::post('send', [NewsletterController::class, 'send'])->name('dashboard.newsletters.send');
        Route::post('create', [NewsletterController::class, 'store'])->name('dashboard.newsletters.store');
        Route::delete('delete/{newsletter}', [NewsletterController::class, 'destroy'])->name('dashboard.newsletters.delete');
        Route::get('logs', [NewsletterController::class, 'logs'])->name('dashboard.newsletters.logs');
        Route::get('analytics', [NewsletterController::class, 'analytics'])->name('dashboard.newsletters.analytics');
    });

    // NEWSLETTER TEMPLATES
    Route::group([
        'prefix' => 'newsletter-templates',
    ], function () {
        Route::get('', [NewsletterTemplateController::class, 'index'])->name('dashboard.newsletter-templates.index');
        Route::post('create', [NewsletterTemplateController::class, 'store'])->name('dashboard.newsletter-templates.store');
        Route::delete('delete/{newsletterTemplate}', [NewsletterTemplateController::class, 'destroy'])->name('dashboard.newsletter-templates.delete');
    });

    // NEWSLETTER LOGS
    Route::group([
        'prefix' => 'newsletter-logs',
    ], function () {
        Route::get('', [NewsletterLogController::class, 'index'])->name('dashboard.newsletter-logs.index');
        Route::post('resend/{newsletterLog}', [NewsletterLogController::class, 'resend'])->name('dashboard.newsletter-logs.resend');
    });

    // APPOINTMENTS MANAGEMENT
    Route::group([
        'prefix' => 'appointments',
    ], function () {
        // Liste et gestion des rendez-vous
        Route::get('', [PrivateAppointmentController::class, 'index'])->name('dashboard.appointments.index');
        Route::get('calendar', [PrivateAppointmentController::class, 'calendar'])->name('dashboard.appointments.calendar');
        Route::get('{appointment}', [PrivateAppointmentController::class, 'show'])->name('dashboard.appointments.show');
        
        // Actions sur les rendez-vous
        Route::post('{appointment}/confirm', [PrivateAppointmentController::class, 'confirm'])->name('dashboard.appointments.confirm');
        Route::post('{appointment}/cancel', [PrivateAppointmentController::class, 'cancel'])->name('dashboard.appointments.cancel');
        Route::post('{appointment}/complete', [PrivateAppointmentController::class, 'complete'])->name('dashboard.appointments.complete');
        
        // Paramètres des rendez-vous
        Route::prefix('settings')->group(function () {
            Route::get('types', [PrivateAppointmentController::class, 'settingsTypes'])->name('dashboard.appointments.settings.types');
            Route::post('types', [PrivateAppointmentController::class, 'storeType'])->name('dashboard.appointments.settings.types.store');
            Route::put('types/{type}', [PrivateAppointmentController::class, 'updateType'])->name('dashboard.appointments.settings.types.update');
            Route::delete('types/{type}', [PrivateAppointmentController::class, 'destroyType'])->name('dashboard.appointments.settings.types.destroy');
            
            Route::get('durations', [PrivateAppointmentController::class, 'settingsDurations'])->name('dashboard.appointments.settings.durations');
            Route::post('durations', [PrivateAppointmentController::class, 'storeDuration'])->name('dashboard.appointments.settings.durations.store');
            
            Route::get('hours', [PrivateAppointmentController::class, 'settingsHours'])->name('dashboard.appointments.settings.hours');
            Route::post('hours', [PrivateAppointmentController::class, 'updateHours'])->name('dashboard.appointments.settings.hours.update');
        });
        
        // APIs publiques pour le frontend
        Route::prefix('api')->group(function () {
            Route::get('available-slots', [PrivateAppointmentController::class, 'getAvailableSlots'])->name('api.appointments.available-slots');
            Route::get('types', [PrivateAppointmentController::class, 'getActiveTypes'])->name('api.appointments.types');
            Route::get('durations', [PrivateAppointmentController::class, 'getActiveDurations'])->name('api.appointments.durations');
        });
    });
});

/**
 * Routes admin pour les horaires d'ouverture et rendez-vous
 */
Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
    // Business Hours
    Route::prefix('business-hours')->group(function () {
        Route::get('/', [BusinessHoursController::class, 'index'])->name('admin.business-hours.index');
        Route::patch('/', [BusinessHoursController::class, 'update'])->name('admin.business-hours.update');
        Route::post('/copy', [BusinessHoursController::class, 'copyToOtherDays'])->name('admin.business-hours.copy');
        Route::get('/preview-slots', [BusinessHoursController::class, 'previewSlots'])->name('admin.business-hours.preview-slots');
        Route::post('/reset', [BusinessHoursController::class, 'resetToDefaults'])->name('admin.business-hours.reset');
    });
    
    // Admin Appointments Management
    Route::prefix('appointments')->group(function () {
        Route::get('/', [App\Http\Controllers\Admin\AppointmentController::class, 'index'])->name('admin.appointments.index');
        Route::get('/{appointment}', [App\Http\Controllers\Admin\AppointmentController::class, 'show'])->name('admin.appointments.show');
        Route::put('/{appointment}/status', [App\Http\Controllers\Admin\AppointmentController::class, 'updateStatus'])->name('admin.appointments.update-status');
        Route::delete('/{appointment}', [App\Http\Controllers\Admin\AppointmentController::class, 'destroy'])->name('admin.appointments.destroy');
        Route::get('/export', [App\Http\Controllers\Admin\AppointmentController::class, 'export'])->name('admin.appointments.export');
    });
});
