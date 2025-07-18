<?php

namespace Database\Seeders;

use App\Enum\MediaTypeEnum;
use App\Models\Media;
use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $testimonials = [
            [
                'name' => 'Sophie Lefèvre',
                'designation' => 'Chef de Projet IT',
                'description' => "La formation ITIL® proposée par TestPro m'a permis d'optimiser la coordination de nos projets IT. Les exemples concrets et les outils fournis font toute la différence.",
                'rating' => 4,
            ],
            [
                'name' => 'Thomas Girard',
                'designation' => 'Consultant en IA',
                'description' => "Les modules d'intelligence artificielle sont d'une grande qualité. J'ai pu mieux comprendre les applications pratiques et conseiller mes clients avec confiance. Un excellent investissement !",
                'rating' => 4.5,
            ],
            [
                'name' => 'Claire Moreau',
                'designation' => 'Marketing Digital',
                'description' => 'Les formations Adobe ont transformé ma manière de créer des campagnes visuelles. Le site est intuitif et les ressources sont adaptées à tous les niveaux. Un vrai plus pour ma carrière !',
                'rating' => 5,
            ],
            [
                'name' => 'Mamadou Diarra',
                'designation' => 'Ingénieur QA',
                'description' => "J'ai suivi la formation ISTQB Foundation sur la plateforme. Les cours sont bien structurés et les exercices pratiques m'ont réellement préparé à l'examen.",
                'rating' => 5,
            ],
            [
                'name' => 'Sarah Ndiaye',
                'designation' => 'Développeuse Full Stack',
                'description' => "Grâce au cursus DevOps, j'ai pu mettre en place une intégration continue efficace pour mon équipe. Les formateurs sont disponibles et le contenu est très clair.",
                'rating' => 4.5,
            ],
            [
                'name' => 'Jean-Paul Koffi',
                'designation' => 'Responsable Qualité',
                'description' => "La formation en ingénierie des exigences m'a aidé à structurer nos spécifications projets avec plus de rigueur. Je recommande vivement TestPro.",
                'rating' => 4,
            ],
        ];

        foreach ($testimonials as $testimonial) {
            $testimonial['media_id'] = Media::factory()->create(['type' => MediaTypeEnum::IMAGE])->id;
            $testimonial['is_active'] = true;
            Testimonial::create($testimonial);
        }
    }
}
