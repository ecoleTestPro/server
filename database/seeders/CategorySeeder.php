<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Repositories\CategoryRepository;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        /**
         *  [START] Formations certifiantes
         */
        $formationCertifiante = CategoryRepository::query()->updateOrCreate([
            'title'       => 'Formations Certifiantes',
            'is_featured' => true,
        ]);
        // $testLogiciel 
        CategoryRepository::query()->updateOrCreate([
            'title'       => 'TEST LOGICIEL',
            'parent_id'   => $formationCertifiante->id,
            'is_featured' => false,
        ]);

        // [END] Formations certifiantes

        $formationSurMesure = [
            'title'       => 'Formations Sur Mesure',
            'is_featured' => true,
        ];
        CategoryRepository::query()->updateOrCreate($formationSurMesure);

        $programmesDeReconversion = [
            'title'       => 'Programmes de Reconversion',
            'is_featured' => true,
        ];
        CategoryRepository::query()->updateOrCreate($programmesDeReconversion);
    }
}
