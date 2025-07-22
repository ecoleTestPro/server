<?php

namespace Database\Seeders;

use App\Enum\MediaTypeEnum;
use App\Models\Media;
use App\Models\Partner;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class ReferenceSeeder extends Seeder
{
    public function createMedia(string $slug): Media
    {
        return Media::create([
            'type'      => MediaTypeEnum::IMAGE->value,
            "extension" => "png",
            'path'      => "references",
            "src"       => "references/" . $slug . ".png"
        ]);
    }

    public function run(): void
    {
        try {
            $references = [
                ['CDM - Crédit du Maroc', ['audit-conseil', 'reconversion']], // cdm-credit-du-maroc
                ['Attijariwafa bank', ['audit-conseil']], // attijariwafa-bank
                ['Crédit Agricole', ['audit-conseil']], // credit-agricole
                ['BNP Paribas', ['audit-conseil']], // bnp-paribas
                ['HPS', ['audit-conseil', 'reconversion']], // hps
                ['Deloitte', ['audit-conseil', 'reconversion']], // deloitte
                ['inwi', ['audit-conseil']], // inwi
                ['LabelVie Groupe', ['audit-conseil']], // labelvie-groupe
                ['Meti - IT Expertise for Retail', ['audit-conseil']], // meti-it-expertise-for-retail
                ['Compagnie Optorg', ['audit-conseil']], // compagnie-optorg
                ['Tractafric Equipment / CAT', ['audit-conseil']], // tractafric-equipment-cat
                ['Société Générale', ['audit-conseil']], // societe-generale
                ['Wallonie - Service Public SPW', ['audit-conseil']], // wallonie-service-public-spw
                ['Smacl Assurances', ['audit-conseil']], // smacl-assurances
                ['CNP Assurances', ['audit-conseil']], // cnp-assurances
                ['Cardif - BNP Paribas Group', ['audit-conseil']], // cardif-bnp-paribas-group
                ['IFP Énergies Nouvelles', ['audit-conseil']], // ifp-energies-nouvelles


                ['DXC Technology', ['reconversion']], // dxc-technology
                ['Alten', ['reconversion']], // alten
                ['Docaposte', ['reconversion']], // docaposte
                ['Harman', ['reconversion']], // harman
                ['CERTILOG', ['reconversion']], // certilog
                ['M2i Formation', ['reconversion']], // m2i-formation
                ['Orsys Formation', ['reconversion']], // orsys-formation
                ['WebForce 3', ['reconversion']], // webforce-3
                ['ib Cegos', ['reconversion']], // ib-cegos
                ['HPS acpqualife', ['reconversion']], // hps-acpqualife
                ['CMI', ['reconversion']], // cmi
                ['Code Logic', ['reconversion']], // code-logic
                ['plb formation', ['reconversion']], // plb-formation
                ['elitek', ['reconversion']], // elitek
                ['Université Mundiapolis Casablanca', ['reconversion']], // universite-mundiapolis-casablanca
                ['OMNISHORE', ['reconversion']], // omnishore
                ['AXA', ['reconversion']], // axa
                ['Tuto\'s me formation', ['reconversion']], // tutos-me-formation
                ['SICPA', ['reconversion']], // sicpa
                ['ACIAL', ['reconversion']], // acial
                ['Mentor Graphics', ['reconversion']], // mentor-graphics
                ['Softeam Institute', ['reconversion']], // softeam-institute
            ];

            foreach ($references as $r) {
                $media = $this->createMedia(Str::slug($r[0]));

                $tags = implode(';', $r[1]);

                Partner::create([
                    'name'         => $r[0],
                    'tag'          => $tags,
                    'is_reference' => true,
                    'media_id'     => $media->id,
                    'is_active'    => true,
                ]);
            }
        } catch (\Exception $e) {
            Log::error('Error seeding references: ' . $e->getMessage());
        }
    }
}
