<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Repositories\CategoryRepository;
use Illuminate\Support\Facades\Log;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        try {
            /**
             *  [START] Formations certifiantes
             */
            $formationCertifiante = CategoryRepository::query()->updateOrCreate([
                'title'       => 'Formations Certifiantes',
                'is_featured' => true,
            ]);
            // $testLogiciel 
            $testLogiciel = CategoryRepository::query()->updateOrCreate([
                'title'       => 'TEST LOGICIEL',
                'parent_id'   => $formationCertifiante->id,
                'is_featured' => false,
            ]);
            CategoryRepository::query()->updateOrCreate([
                'title'       => 'Fondation',
                'parent_id'   => $testLogiciel->id,
                'is_featured' => false,
            ]);
            CategoryRepository::query()->updateOrCreate([
                'title'       => 'Avancé',
                'parent_id'   => $testLogiciel->id,
                'is_featured' => false,
            ]);
            CategoryRepository::query()->updateOrCreate([
                'title'       => 'Spécialiste',
                'parent_id'   => $testLogiciel->id,
                'is_featured' => false,
            ]);


            CategoryRepository::query()->updateOrCreate([
                'title'       => 'QUALITÉ LOGICIELLE',
                'parent_id'   => $formationCertifiante->id,
                'is_featured' => false,
            ]);
            CategoryRepository::query()->updateOrCreate([
                'title'       => 'INGÉNIERIE DES EXIGENCES',
                'parent_id'   => $formationCertifiante->id,
                'is_featured' => false,
            ]);



            // [END] Formations certifiantes

            $formationSurMesure = CategoryRepository::query()->updateOrCreate([
                'title'       => 'Formations Sur Mesure',
                'is_featured' => true,
            ]);
            CategoryRepository::query()->updateOrCreate([
                'title'       => 'OUTILS DE TEST',
                'parent_id'   => $formationSurMesure->id,
                'is_featured' => true,
            ]);
            CategoryRepository::query()->updateOrCreate([
                'title'       => 'METHODOLOGIES',
                'parent_id'   => $formationSurMesure->id,
                'is_featured' => true,
            ]);
            CategoryRepository::query()->updateOrCreate([
                'title'       => 'DEVELOPPEMENT',
                'parent_id'   => $formationSurMesure->id,
                'is_featured' => true,
            ]);

            // $programmesDeReconversion = [
            //     'title'       => 'Programmes de Reconversion',
            //     'is_featured' => true,
            // ];
            // CategoryRepository::query()->updateOrCreate($programmesDeReconversion);
        } catch (\Exception $e) {
            Log::error('Error seeding categories: ' . $e->getMessage());
        }
    }
}
