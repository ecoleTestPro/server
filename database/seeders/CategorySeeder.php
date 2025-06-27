<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Repositories\CategoryRepository;
use Database\Seeders\slice\DeveloppementCategorySeeder;
use Database\Seeders\slice\FormationCertifianteCategorySeeder;
use Database\Seeders\slice\IngenierieDesExigencesCategorySeeder;
use Database\Seeders\slice\MethodologiesCategorySeeder;
use Database\Seeders\slice\OutilDeTestCategorySeeder;
use Database\Seeders\slice\QualiteLogicielleCategorySeeder;
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
                'slug'       => 'formations-certifiantes',
                'is_featured' => true,
            ]);

            $testLogiciel = CategoryRepository::query()->updateOrCreate([
                'title'       => 'TEST LOGICIEL',
                'slug'       => 'test-logiciel',
                'parent_id'   => $formationCertifiante->id,
                'is_featured' => false,
            ]);
            new FormationCertifianteCategorySeeder($testLogiciel)->run();


            $qualiteLogicielle = CategoryRepository::query()->updateOrCreate([
                'title'       => 'QUALITÉ LOGICIELLE',
                'slug'       => 'qualite-logicielle',
                'parent_id'   => $formationCertifiante->id,
                'is_featured' => false,
            ]);
            new QualiteLogicielleCategorySeeder($qualiteLogicielle)->run();

            $ingenierieDesExigences = CategoryRepository::query()->updateOrCreate([
                'title'       => 'INGÉNIERIE DES EXIGENCES',
                'slug'       => 'ingenierie-des-exigences',
                'parent_id'   => $formationCertifiante->id,
                'is_featured' => false,
            ]);
            new IngenierieDesExigencesCategorySeeder($ingenierieDesExigences)->run();
            // [END] Formations certifiantes


            /**
             *  [START] Formations sur mesure
             */
            $formationSurMesure = CategoryRepository::query()->updateOrCreate([
                'title'       => 'Formations Sur Mesure',
                'slug'       => 'formations-sur-mesure',
                'is_featured' => true,
            ]);
            $outilDeTest = CategoryRepository::query()->updateOrCreate([
                'title'       => 'OUTILS DE TEST',
                'slug'       => 'outils-de-test',
                'parent_id'   => $formationSurMesure->id,
                'is_featured' => true,
            ]);
            new OutilDeTestCategorySeeder($outilDeTest)->run();

            $methodologies = CategoryRepository::query()->updateOrCreate([
                'title'       => 'METHODOLOGIES',
                'slug'       => 'methodologies',
                'parent_id'   => $formationSurMesure->id,
                'is_featured' => true,
            ]);
            new MethodologiesCategorySeeder($methodologies)->run();

            $developpement = CategoryRepository::query()->updateOrCreate([
                'title'       => 'DEVELOPPEMENT',
                'slug'       => 'developpement',
                'parent_id'   => $formationSurMesure->id,
                'is_featured' => true,
            ]);
            new DeveloppementCategorySeeder($developpement)->run();

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
