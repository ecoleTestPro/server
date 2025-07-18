<?php

namespace Database\Seeders;

use App\Enum\MediaTypeEnum;
use App\Models\Media;
use App\Models\Partner;
use Illuminate\Database\Seeder;

class ReferenceSeeder extends Seeder
{
    public function run(): void
    {
        $references = [
            'CDM - Crédit du Maroc',
            'Attijariwafa bank',
            'Crédit Agricole',
            'BNP Paribas',
            'HPS',
            'Deloitte',
            'inwi',
            'LabelVie Groupe',
            'Meti - IT Expertise for Retail',
            'Compagnie Optorg',
            'Tractafric Equipment / CAT',
            'Société Générale',
            'Wallonie - Service Public SPW',
            'Smacl Assurances',
            'CNP Assurances',
            'Cardif - BNP Paribas Group',
            'IFP Énergies Nouvelles',
        ];

        foreach ($references as $text) {
            $media = Media::factory()->create(['type' => MediaTypeEnum::IMAGE]);
            Partner::create([
                'name' => $text,
                'tag' => 'audit-conseil',
                'is_reference' => true,
                'media_id' => $media->id,
                'is_active' => true,
            ]);
        }
    }
}
