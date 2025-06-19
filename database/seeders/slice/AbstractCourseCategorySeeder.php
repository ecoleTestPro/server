<?php

namespace Database\Seeders\slice;

use App\Models\Category;
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

    private string $fakeContent =
    "<ol><li><p><strong>Pourquoi choisir la certification </strong><strong>Professional Scrum Product </strong><strong>Owner</strong><strong>&trade; I (PSPO I)</strong></p><ol><li><strong>Reconnaissance Professionnelle :</strong> La certification est reconnue mondialement et atteste de vos comp&eacute;tences en gestion de produit dans un contexte Scrum.</li><li><strong>Compr&eacute;hension Approfondie :</strong> Elle vous permet de comprendre en profondeur le cadre Scrum, ainsi que les r&ocirc;les et responsabilit&eacute;s d'un Product Owner.</li><li><strong>Am&eacute;lioration des Comp&eacute;tences :</strong> La formation pr&eacute;paratoire d&eacute;veloppe vos comp&eacute;tences en mati&egrave;re de gestion de produit, en vous apprenant &agrave; maximiser la valeur du produit et &agrave; g&eacute;rer efficacement le backlog.</li><li><strong>Opportunit&eacute;s de Carri&egrave;re :</strong> La certification peut am&eacute;liorer vos perspectives professionnelles, vous rendant plus attractif pour les employeurs &agrave; la recherche de comp&eacute;tences en Agile et Scrum.</li><li><strong>R&eacute;seau Professionnel :</strong> En obtenant cette certification, vous rejoignez une communaut&eacute; internationale de praticiens qui partagent des connaissances et des exp&eacute;riences.</li><li><strong>Adaptabilit&eacute; :</strong> Les comp&eacute;tences acquises sont applicables &agrave; divers secteurs et types de projets, vous rendant plus polyvalent dans votre carri&egrave;re.</li></ol><p><strong>A qui s'adresse cette formation ?</strong></p><p>Personnes responsables de l'optimisation de la valeur de produits et de lignes de produits, soit :</p><ul><li>Directeurs de produits charg&eacute;s du concept, de la fourniture et de l'utilisation par le client d'un produit</li><li>Directeurs du d&eacute;veloppement informatique, en charge d'un secteur d'affaires ou d'un syst&egrave;me interne</li><li>Directeurs de la strat&eacute;gie charg&eacute;s de l'orientation g&eacute;n&eacute;rale d'un produit ou d'une famille de produits</li></ul><p>Ou encore les Business Analystes,&nbsp;Chefs de projets,&nbsp;Product Manager, Experts m&eacute;tiers, Architectes, D&eacute;veloppeurs ou toute personne responsablesde transition vers l'agilit&eacute;s</p><p><strong>Pr&eacute;requis</strong></p><p>Il est exig&eacute; d'avoir des connaissances du d&eacute;veloppement it&eacute;ratif et incr&eacute;mentiel et recommand&eacute; de conna&icirc;tre les bases de Scrum. Comme pr&eacute;paration, il est fortement recommand&eacute; de t&eacute;l&eacute;charger gratuitement et lire&nbsp;le&nbsp;<a href='http://www.scrumguides.org/'><u>Guide Scrum</u></a>.<br />&nbsp;Nous vous conseillons de suivre au pr&eacute;alable le cours suivant ou de vous assurer de poss&eacute;der des connaissances &eacute;quivalentes :</p><p><strong>Le programme</strong></p><ol><li><strong>Value Driven Development</strong></li></ol><ul><li>Le r&ocirc;le principal d'un Product Owner est d'augmenter la valeur du produit dont il est responsable. Ce chapitre explore les facteurs et les strat&eacute;gies permettant de g&eacute;n&eacute;rer de la valeur ajout&eacute;e et &agrave; la mesurer</li></ul><ol><li><strong>Product</strong><strong> Management</strong></li></ol><ul><li>Agile se diff&eacute;rencie des approches traditionnelles. Ce chapitre analyse les diff&eacute;rences ainsi que la mani&egrave;re dont le Product Owner travaille dans un environnement Agile pour d&eacute;livrer ses produits</li></ul><ol><li><strong>Managing </strong><strong>Requirements</strong></li></ol><ul><li>Le Carnet du Produit (Product Backlog) est le carburant qui alimente l'&eacute;quipe de d&eacute;veloppement dont la gestion est l'une des principales t&acirc;ches du Product Owner Scrum. Ce chapitre pr&eacute;sente les R&eacute;cits Utilisateurs (User Stories), les exigences et les strat&eacute;gies organisationnelles.</li></ul><ol><li><strong>Planning</strong><strong> Releases</strong></li></ol><ul><li>A quoi ressemble un bon plan de communication ? Pourquoi faut-il communiquer ? Quel est l'impact d'un mauvais plan tant pour les parties prenantes ? Ce chapitre explore les strat&eacute;gies de diffusion et la fa&ccedil;on d'optimiser la valeur.</li></ul><ol><li><strong>Lean </strong><strong>Planning</strong></li></ol><ul><li>La communication est souvent la premi&egrave;re &eacute;tape vers la cr&eacute;ation de valeur. Quelle meilleure fa&ccedil;on d'apprendre &agrave; planifier la communication si ce n'est de le faire par soi-m&ecirc;me? Ce chapitre enseigne &agrave; identifier les bases des objectifs et des exigences, &agrave; trier les Backlogs, &agrave; &eacute;valuer les adaptations et &agrave; r&eacute;aliser une planification de livraison.</li></ul><ol><li><strong>Managing Products</strong></li></ol><ul><li>Une bonne compr&eacute;hension des co&ucirc;ts op&eacute;rationnels (co&ucirc;t total de possession (TCO)) est fondamentale pour r&eacute;ussir la gestion de produits. Comment concilier l'optimisation de cr&eacute;ation de valeur et la maximisation du potentiel d'un produit ou d'un syst&egrave;me comme atout dans une organisation ? Comment cela s'inscrit-il dans un plan de produits existant et pourquoi la 'Definition of Done' de l'&eacute;quipe de d&eacute;veloppement est-elle aussi fondamentale ?</li></ul><p><strong>Certification</strong></p><p>Cette formation permet de se pr&eacute;parer &agrave; l&rsquo;examen de certification &laquo;&nbsp;<a href='https://www.scrum.org/professional-scrum-product-owner-i-certification'><u>Professional Scrum Product </u><u>Owner</u><u> I</u></a>&nbsp;&raquo; (PSPO 1), inclus dans le prix de la formation.</p><p>A la fin de votre formation, nous vous remettrons un bon pour passer l'examen.</p><p><strong>Format </strong><strong>d'examen</strong><strong> :</strong></p><ul><li>En ligne</li><li>1 heure</li><li>80 questions &agrave; choix multiple, r&eacute;ponses multiples, vrai/faux</li><li>Suile de r&eacute;ussite : 85%</li><li>Langue :&nbsp;anglais</li></ul><p>&nbsp;</p><p><strong>Objectifs</strong></p><ul><li>Connaitre les facteurs et strat&eacute;gies qui g&eacute;n&egrave;rent de la valeur et comment les mesurer</li><li>Comprendre la diff&eacute;rence entre gestion de projet agile et traditionnelle</li><li>Comprendre comment le product&nbsp;owner travaille dans un environnement agile pour livrer ses produits</li><li>Comprendre les strat&eacute;gies de release et comment la cr&eacute;ation de valeur peut &ecirc;tre optimis&eacute;e</li><li>Comprendre les bases des objectifs de version (release)</li><li>Identifier les&nbsp;exigences</li><li>Trier les&nbsp;backlogs</li><li>&Eacute;valuer les adaptations et la planification initiale</li><li>Comprendre comment maximiser la cr&eacute;ation de valeur (ROI) des produits et des syst&egrave;mes et optimiser les co&ucirc;ts op&eacute;rationnels (TCO)</li><li>Comprendre ce qui acc&eacute;l&egrave;re concr&egrave;tement la cr&eacute;ation de valeur</li><li>Comprendre la gestion des parties prenantes, la planification des versions (release) et leur livraison</li></ul><p><a href='#8'><strong>Informations compl&eacute;mentaires</strong></a></p><p>Attention : Si vous planifiez &eacute;galement de suivre la &laquo;&nbsp;<a href='http://www.EcoleTest.ch/f/AJS'><u>Formation Scrum Master Certifiant</u></a>&nbsp;&raquo;, nous vous conseillons de respecter un laps de 3 mois entre ces deux formations ; d&rsquo;une part pour assurer un meilleur apprentissage dans le temps et d&rsquo;autre part parce que les contenus de ces deux formations se recoupent partiellement.</p><p><strong>Questions sur le cours</strong></p><p>Pour toute question, n'h&eacute;sitez pas &agrave; contacter : info@ecoletestpro.com.</p><p>Si vous souhaitez r&eacute;server ce cours en tant qu'individu ou entreprise, merci de vous adresser &agrave; : info@ecoletestpro.com.</p></li></ol>";

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
            'excerpt'            => $data['excerpt'] ?? '',
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
            'instructor_id'      => 1,
            'description'        => $data['description'] ?? json_encode(['content' => $this->fakeContent]),
        ];
    }

    protected function saveCourse()
    {
        foreach ($this->courses as $key => $course) {
            if (isset($course) && is_array($course)) {
                try {
                    CourseRepository::query()->updateOrCreate($course);
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
