<?php

namespace Database\Seeders\slice;

use App\Enum\MediaTypeEnum;
use App\Models\Category;
use App\Models\Media;
use App\Repositories\CategoryRepository;
use App\Repositories\CourseRepository;
use Illuminate\Support\Facades\Log;

abstract class AbstractCourseCategorySeeder
{
    /**
     *  The category to which the courses will be associated.
     *
     * @var Category|null
     */
    protected Category $category;

    /**
     * The courses to be seeded for the current category.
     *
     * @var array
     */
    protected array $courses;

    /**
     * A fake excerpt for the course description.
     */
    private string $fakeExcerpt = "La certification Professional Scrum Product Owner™ I (PSPO I) est une reconnaissance internationale des compétences en gestion de produit dans un environnement Scrum. Elle atteste de la capacité à maximiser la valeur du produit et à gérer efficacement le backlog, tout en favorisant une compréhension approfondie du cadre Scrum.";

    /**
     * A fake content for the course description.
     *
     * This content is used to provide a detailed description of the course, including its objectives, prerequisites, and topics covered.
     */
    private string $fakeContent = "<p><strong>Le programme</strong></p><p>1 - D&eacute;veloppement&nbsp;logiciel Agile</p><ul>  <li>Les fondamentaux du d&eacute;veloppement logiciel Agile</li>  <li>Aspects des approches Agile</li></ul><p>2 - Principes, pratiques, et processus fondamentaux Agile</p><ul>  <li>Les diff&eacute;rences des tests entre les approches traditionnelles et Agile</li>  <li>Statuts du test dans les projets Agile</li>  <li>R&ocirc;les et comp&eacute;tences d'un testeur dans une &eacute;quipe Agile</li></ul><p>3 - Les m&eacute;thodes, techniques, et outils pour les tests Agile</p><ul>  <li>M&eacute;thodes de test Agile</li>  <li>&Eacute;valuer les risques qualit&eacute; et estimer l'effort de test</li>  <li>Techniques&nbsp;dans&nbsp;les&nbsp;projets Agile</li>  <li>Outils&nbsp;dans&nbsp;les&nbsp;projets Agile</li></ul><p>4 - Passage de l'examen de certification ISTQB Testeur Agile</p><ul>  <li>Conseils et r&eacute;visions en vue de l'examen</li>  <li>Examen blanc&nbsp;avec&nbsp;correction&nbsp;comment&eacute;e</li>  <li>    La certification ISTQB Testeur Agile peut &ecirc;tre pass&eacute;e le dernier jour de la formation en ligne ou &agrave; une date ult&eacute;rieure. L'examen dure 60 minutes et se compose de 40 questions &agrave; choix multiples. Pour    obtenir la certification, il est requis d'atteindre un score minimum de 65 %.  </li></ul>";

    private $fakeAudience = "<div>Professionnels de l'analyse des processus métier, de la modélisation de solutions : MOA, AMOA, Product Owners, concepteurs de produits, architectes, analystes d'affaires.</div>";


    private string $fakeWhyChooseCourse = "<ul><li><strong>Acquisition de comp&eacute;tences essentielles&nbsp;: </strong>Apprenez les bases de l'analyse m&eacute;tier, ce qui est crucial pour la r&eacute;ussite des projets.</li><li><strong>Reconnaissance internationale&nbsp;: </strong>La certification IQBBA est reconnue mondialement, offrant ainsi une validation de vos comp&eacute;tences.</li><li><strong>Am&eacute;lioration de la communication&nbsp;: </strong>Renforcez votre capacit&eacute; &agrave; communiquer efficacement avec les diff&eacute;rentes parties prenantes.</li><li><strong>Opportunit&eacute;s professionnelles accrues&nbsp;: </strong>Ouvre des portes vers des postes d'analyse dans divers secteurs</li></ul>";



    /**
     * Constructs an array representing a course with the given data.
     *
     * @param array $data An associative array containing course data, which may include:
     *                    - 'title' (string): The title of the course.
     *                    - 'slug' (string): The URL-friendly version of the course title.
     *                    - 'excerpt' (string, optional): A short description of the course.
     *                    - 'is_featured' (bool, optional): Whether the course is featured.
     *                    - 'is_published' (bool, optional): Whether the course is published.
     *                    - 'periodicity_unit' (string, optional): The unit of time for the course periodicity.
     *                    - 'periodicity_value' (int, optional): The value of time for the course periodicity.
     *                    - 'price_includes_tax' (bool, optional): Whether the price includes tax.
     *                    - 'regular_price' (int, optional): The standard price of the course.
     *                    - 'price' (int, optional): The discounted price of the course.
     *                    - 'duration' (int, optional): The duration of the course in days.
     *                    - 'description' (string, optional): A detailed description of the course in JSON format.
     *
     * @return array An associative array containing the constructed course data.
     * @throws \InvalidArgumentException If required fields are missing or invalid.
     */
    protected function buildCourse(array $data): array
    {
        if (empty($data['title']) || empty($data['slug'])) {
            throw new \InvalidArgumentException('Title and slug are required fields.');
        }

        if (!$this->category || !isset($this->category->id)) {
            throw new \InvalidArgumentException('Category is not set or invalid.');
        }

        return [
            'title'              => $data['title'],
            'slug'               => $data['slug'],
            'level'              => $data['level'] ?? '',
            'is_featured'        => $data['is_featured'] ?? false,
            'is_published'       => $data['is_published'] ?? true,
            'location_mode'      => "En présentiel à Abidjan ou classe à distance",
            'attachment'         => 'Livre de référence',
            'periodicity_unit'   => $data['periodicity_unit'] ?? 'DAY',
            'periodicity_value'  => $data['periodicity_value'] ?? 5,
            'price_includes_tax' => $data['price_includes_tax'] ?? false,
            'regular_price'      => $data['regular_price'] ?? 1000000,
            'price'              => $data['price'] ?? 650000,
            'published_at'       => now(),
            'duration'           => $data['duration'] ?? 2,
            'category_id'        => $this->category->id,
            'instructor_id'      => 1, // ! Default instructor ID, should be replaced with actual instructor ID
            'excerpt'            => $data['excerpt'] ?? $this->fakeExcerpt, // TODO : remove fake excerpt
            'description'        => $data['description'] ?? json_encode([
                'pedagogical_objectives' => "<ul><li>Acqu&eacute;rir une ma&icirc;trise des meilleures pratiques de testing dans un projet Agile.</li><li>Comprendre le r&ocirc;le d'un testeur dans une &eacute;quipe agile</li><li>Conna&icirc;tre la terminologie propre aux tests en environnement agile</li><li>Pr&eacute;paration &agrave; la certification ISTQB Foundation &laquo; Agile Tester &raquo;.</li><li>Am&eacute;lioration de la synergie entre les &eacute;quipes de d&eacute;veloppement et de tests.</li></ul>",
                'course_strengths'       => "<ul><li><ul><li><ul><li>Des travaux pratiques tout au long de la formation permettent aux participants de se familiariser avec le processus d'analyse.</li><li>De nombreuses illustrations facilitent la compr&eacute;hension des r&egrave;gles et des standards en vigueur dans l'analyse m&eacute;tier.</li><li>Un syst&egrave;me de r&eacute;vision continue de l'examen, mis en place au fur et &agrave; mesure de la progression de la formation, optimise les chances de r&eacute;ussite des candidats.</li><li>Le co&ucirc;t de la formation inclut &eacute;galement le passage de l'examen</li></ul></li></ul></li></ul>",
                'evaluation'             => "Pendant la formation, le formateur suit l'évolution des participants en utilisant divers outils, incluant des quiz à choix multiples, des simulations pratiques et des exercices pratiques. En outre, un test de positionnement est effectué avant et après la formation pour évaluer les compétences développées par chaque participant.",
                'prerequisites'          => "Connaissances de base du cycle de vie des logiciels (systèmes d'information) spécification et conception", // TODO : remove fake prerequisites
                'why_choose'             => $this->fakeWhyChooseCourse, // TODO : remove fake why choose course
                'target_audience'        => $this->fakeAudience, // TODO : remove fake audience
                'exam'                   => "<ul><li><ul><li><strong>Langue</strong>&nbsp;: En fran&ccedil;ais</li><li><strong>Dur&eacute;e</strong>&nbsp;: 60 minutes pour l'examen en fran&ccedil;ais pour 40 questions &agrave; choix multiple. (Les personnes dont le fran&ccedil;ais n'est pas la langue maternelle peuvent b&eacute;n&eacute;ficier de 25% de temps suppl&eacute;mentaire)</li><li><strong>Seuil</strong><strong> de </strong><strong>r&eacute;ussite</strong>&nbsp;:&nbsp;65%</li><li><strong>Options d'examen : En ligne ou au centre &agrave; Abidjan :</strong> L'examen peut &ecirc;tre r&eacute;alis&eacute; apr&egrave;s la formation en ligne, soit depuis votre domicile, soit dans notre centre de test situ&eacute; &agrave; Abidjan.</li></ul></li></ul>",
                'content'                => $this->fakeContent, // TODO : remove fake content,
            ]),
        ];
    }

    protected function saveMedia(array $course)
    {
        if (!isset($course['slug']) || empty($course['slug'])) {
            Log::error('Course slug is required to save media.');
            return;
        }

        // thumbnail
        $mediaThumbnail = Media::create([
            'type'      => MediaTypeEnum::IMAGE,
            "extension" => "png",
            'path'      => "course/thumbnail",
            "src"       => "course/thumbnail/" . $course['slug'] . ".png"
        ]);

        // organization-logo
        $mediaOrganizationLogo = Media::create([
            'type'      => MediaTypeEnum::IMAGE,
            "extension" => "png",
            'path'      => "course/organization-logo",
            "src"       => "course/organization-logo/" . $course['slug'] . ".png"
        ]);

        // logo
        $mediaLogo = Media::create([
            'type'      => MediaTypeEnum::IMAGE,
            "extension" => "png",
            'path'      => "course/logo",
            "src"       => "course/logo/" . $course['slug'] . ".png"
        ]);

        return CourseRepository::query()->updateOrCreate(
            [
                'slug' => $course['slug'],
            ],
            [
                'media_id'             => $mediaThumbnail->id,
                // 'organization_logo_id' => $mediaOrganizationLogo->id,
                // 'logo_id'              => $mediaLogo->id,
            ]
        );
    }

    protected function saveCourse()
    {
        foreach ($this->courses as $key => $course) {
            if (isset($course) && is_array($course)) {
                try {
                    CourseRepository::query()->updateOrCreate($course);
                    $this->saveMedia($course);
                } catch (\Exception $e) {
                    Log::error('Error while creating course: ' . $e->getMessage());
                }
            }
        }
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->saveCourse();
    }
}
