<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Digicomp</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss @2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link href="https://unpkg.com/ @shadcn/ui@latest/styles/shadow-palette-light.css" rel="stylesheet">
</head>

<body class="bg-white font-sans leading-normal tracking-normal">

    <!-- Header -->
    <header class="bg-white shadow">
        <div class="container mx-auto flex items-center justify-between p-4">
            <a href="#" class="text-green-500 text-xl font-bold">digicomp</a>
            <div class="flex items-center space-x-4">
                <form class="relative">
                    <input type="text" placeholder="Rechercher par formation, événement, ..." class="border border-green-500 rounded px-3 py-2 w-64">
                    <button type="submit" class="absolute right-0 top-0 mt-3 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </form>
                <div class="dropdown relative">
                    <button class="dropdown-toggle px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
                        FR
                    </button>
                </div>
                <a href="#" class="text-green-500"><i class="fas fa-user"></i></a>
                <a href="#" class="text-green-500"><i class="fas fa-heart"></i></a>
                <a href="#" class="text-green-500"><i class="fas fa-shopping-cart"></i></a>
            </div>
        </div>
        <nav class="container mx-auto p-4">
            <ul class="flex space-x-4">
                <li><a href="#" class="text-gray-700 hover:text-green-500">Formations</a></li>
                <li><a href="#" class="text-gray-700 hover:text-green-500">Certifications</a></li>
                <li><a href="#" class="text-gray-700 hover:text-green-500">Offre pour entreprises</a></li>
                <li><a href="#" class="text-gray-700 hover:text-green-500">Événements</a></li>
                <li><a href="#" class="text-gray-700 hover:text-green-500">Blog/News</a></li>
                <li><a href="#" class="text-gray-700 hover:text-green-500">À propos de Digicomp</a></li>
                <li><a href="#" class="bg-green-500 text-white px-4 py-2 rounded">Contact</a></li>
            </ul>
        </nav>
    </header>

    <!-- Hero Section -->
    <section class="bg-green-500 text-white py-20">
        <div class="container mx-auto flex flex-col md:flex-row items-center">
            <div class="w-full md:w-1/2 p-6">
                <h1 class="text-4xl font-bold mb-4">Des formations pour un succès durable</h1>
                <p class="mb-8">Faites évoluer votre carrière et contribuez activement au développement et au succès de votre entreprise grâce à l'acquisition de nouvelles compétences.</p>
                <h2 class="text-3xl font-bold mb-4 underline">Nos formations garanties</h2>
                <div class="grid grid-cols-2 gap-4">
                    <a href="#" class="bg-white text-green-500 px-4 py-2 rounded">Microsoft</a>
                    <a href="#" class="bg-white text-green-500 px-4 py-2 rounded">Gestion de projets et de services</a>
                    <a href="#" class="bg-white text-green-500 px-4 py-2 rounded">IT Providers & Technologies</a>
                    <a href="#" class="bg-white text-green-500 px-4 py-2 rounded">Sécurité</a>
                    <a href="#" class="bg-white text-green-500 px-4 py-2 rounded">Intelligence Artificielle (IA)</a>
                    <a href="#" class="bg-white text-green-500 px-4 py-2 rounded">Software Engineering</a>
                    <a href="#" class="bg-white text-green-500 px-4 py-2 rounded">Business Applications</a>
                    <a href="#" class="bg-white text-green-500 px-4 py-2 rounded">Digital Media & Design</a>
                </div>
                <a href="#" class="text-green-500 underline mt-4">Toutes nos formations garanties</a>
            </div>
            <div class="w-full md:w-1/2 p-6">
                <img src="https://source.unsplash.com/random/300x300/?woman " alt="Woman smiling" class="w-full h-full object-cover">
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="bg-green-700 text-white py-20">
        <div class="container mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="bg-white text-green-700 p-6">
                    <img src="https://source.unsplash.com/random/100x100/?ai " alt="AI" class="w-16 h-16 mb-4">
                    <h3 class="text-xl font-bold mb-2">Intelligence Artificielle (IA)</h3>
                    <p>Déterminez les enjeux spécifiques auxquels votre entreprise fait face et explorez comment l'IA et son fort potentiel peut vous apporter des solutions concrètes. Nous vous accompagnons dans l'acquisition des compétences IA indispensables pour prospérer votre avenir numérique.</p>
                    <a href="#" class="text-green-700 underline">Découvrir notre offre</a>
                </div>
                <div class="bg-white text-green-700 p-6">
                    <img src="https://source.unsplash.com/random/100x100/?microsoft " alt="Microsoft" class="w-16 h-16 mb-4">
                    <h3 class="text-xl font-bold mb-2">Nous vous formons aux technologies Microsoft</h3>
                    <p>Que ce soit pour un cours Microsoft officiel ou un logiciel spécifique, découvrez notre offre complète.</p>
                    <a href="#" class="text-green-700 underline">Découvrir</a>
                </div>
                <div class="bg-white text-green-700 p-6">
                    <h3 class="text-xl font-bold mb-2">Formations Adobe</h3>
                    <p>Création graphique, montage vidéo, photographie, ... Nous vous formons aux logiciels de création de la suite Adobe Creative Cloud.</p>
                    <a href="#" class="text-green-700 underline">Découvrir nos formations</a>
                </div>
                <div class="bg-white text-green-700 p-6">
                    <h3 class="text-xl font-bold mb-2">ITIL® : le framework par excellence pour les services IT</h3>
                    <p>Apprenez les bonnes pratiques afin d'atteindre une synergie optimale entre vos projets IT et une valeur ajoutée conséquente pour votre business.</p>
                    <a href="#" class="text-green-700 underline">Découvrir</a>
                </div>
                <div class="bg-white text-green-700 p-6">
                    <h3 class="text-xl font-bold mb-2">Cybersécurité et protection des données</h3>
                    <p>Découvrez les cadres légaux, les normes et les certifications qui vous permettront de devenir expert(e) de la cybersécurité et de la protection des données.</p>
                    <a href="#" class="text-green-700 underline">Découvrir</a>
                </div>
            </div>
        </div>
    </section>

    <!-- About Us Section -->
    <section class="py-20">
        <div class="container mx-auto">
            <h2 class="text-3xl font-bold mb-4">Digital Competence. Made of People.</h2>
            <p>Nous relevons vos défis professionnels avec des formations continues animées par des expert·e·s qualifié·e·s. Depuis plus de 45 ans, en tant que partenaire leader de formation en suisse romande, nous vous accompagnons dans le développement de vos compétences digitales.</p>
        </div>
    </section>

    <!-- Bestseller Section -->
    <section class="py-20 bg-gray-100">
        <div class="container mx-auto">
            <h2 class="text-2xl font-bold mb-8">Bestseller</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="bg-white p-4">
                    <p class="text-green-500">COURS</p>
                    <h3 class="text-lg font-bold mb-2">Microsoft Power BI Data Analyst – Formation intensive («PL300»)</h3>
                    <p>3 jours<br>Lausanne, Genève, Bâle, Berne, Zurich<br>Live Virtual Training<br>CHF 2'550.-</p>
                    <a href="#" class="bg-green-500 text-white px-4 py-2 rounded">Plus d'informations</a>
                </div>
                <!-- Repeat for other courses -->
            </div>
        </div>
    </section>

    <!-- Current Courses Section -->
    <section class="py-20">
        <div class="container mx-auto">
            <h2 class="text-2xl font-bold mb-8">Nos cours du moment</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="bg-white p-4">
                    <h3 class="text-lg font-bold mb-2">Gestion de projets</h3>
                    <table class="w-full">
                        <thead>
                            <tr>
                                <th>Titre</th>
                                <th>Prochaine session</th>
                                <th>Langue</th>
                                <th>Prix</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><a href="#">SAFe 6.0 Lean Portfolio Management («LPM»)</a></td>
                                <td>19.05.25 - 20.05.25</td>
                                <td>DE</td>
                                <td><a href="#">Toutes les dates</a></td>
                                <td>CHF 2'450.-</td>
                            </tr>
                            <!-- Repeat for other courses -->
                        </tbody>
                    </table>
                </div>
                <!-- Repeat for other categories -->
            </div>
            <a href="#" class="bg-green-500 text-white px-4 py-2 rounded">Toutes nos formations garanties</a>
        </div>
    </section>

    <!-- Client Logos Section -->
    <section class="py-20 bg-gray-100">
        <div class="container mx-auto">
            <h2 class="text-3xl font-bold mb-8 text-center">Plus de 300 entreprises font confiance à Digicomp</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <img src="https://source.unsplash.com/random/100x50/?logo1 " alt="Logo 1" class="w-full h-10 object-cover">
                <img src="https://source.unsplash.com/random/100x50/?logo2 " alt="Logo 2" class="w-full h-10 object-cover">
                <img src="https://source.unsplash.com/random/100x50/?logo3 " alt="Logo 3" class="w-full h-10 object-cover">
                <img src="https://source.unsplash.com/random/100x50/?logo4 " alt="Logo 4" class="w-full h-10 object-cover">
                <!-- Repeat for other logos -->
            </div>
        </div>
    </section>

    <!-- Testimonial Section -->
    <section class="py-20">
        <div class="container mx-auto">
            <div class="bg-green-100 p-6 rounded">
                <p class="text-center italic">« Cours structuré, intervenant très pro, accessible, pédagogue et à l'écoute. »</p>
                <p class="text-sm">Google Analytics 4 & Tag Manager - Niveau débutant<br>Jeanne L., mai 2025<br>Mediatonic SA</p>
                <a href="#" class="text-green-500 underline">Découvrir la formation</a>
            </div>
            <div class="flex justify-center mt-4">
                <span class="inline-block bg-gray-200 rounded-full w-3 h-3 mx-1"></span>
                <span class="inline-block bg-gray-200 rounded-full w-3 h-3 mx-1"></span>
                <span class="inline-block bg-gray-200 rounded-full w-3 h-3 mx-1"></span>
                <span class="inline-block bg-gray-200 rounded-full w-3 h-3 mx-1"></span>
                <span class="inline-block bg-gray-200 rounded-full w-3 h-3 mx-1"></span>
            </div>
        </div>
    </section>

    <!-- Quality Assurance Section -->
    <section class="py-20 bg-gray-100">
        <div class="container mx-auto">
            <h2 class="text-2xl font-bold mb-8">Notre gage de qualité</h2>
            <p>Nous sommes partenaire de formation officiel des plus importants fournisseurs de technologies informatiques, nous collaborons avec des organisations de certification réputées et coopérons avec des institutions de formation renommées.</p>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                <img src="https://source.unsplash.com/random/100x50/?partner1 " alt="Partner 1" class="w-full h-10 object-cover">
                <img src="https://source.unsplash.com/random/100x50/?partner2 " alt="Partner 2" class="w-full h-10 object-cover">
                <img src="https://source.unsplash.com/random/100x50/?partner3 " alt="Partner 3" class="w-full h-10 object-cover">
                <img src="https://source.unsplash.com/random/100x50/?partner4 " alt="Partner 4" class="w-full h-10 object-cover">
                <!-- Repeat for other partners -->
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section class="bg-green-500 text-white py-20">
        <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-6">
                <p>Contact & demandes de renseignements</p>
                <h2 class="text-2xl font-bold mb-4">Besoin d'information ou d'un cours sur mesure ?</h2>
                <p>Notre équipe se tient à votre disposition pour vous renseigner et vous accompagner dans vos projets.</p>
                <a href="#" class="bg-green-500 text-white px-4 py-2 rounded">Nous contacter</a>
            </div>
            <div class="p-6">
                <h2 class="text-xl font-bold mb-4">L'équipe Digicomp</h2>
                <div class="flex space-x-4">
                    <img src="https://source.unsplash.com/random/50x50/?person1 " alt="Person 1" class="w-12 h-12 rounded-full">
                    <img src="https://source.unsplash.com/random/50x50/?person2 " alt="Person 2" class="w-12 h-12 rounded-full">
                    <img src="https://source.unsplash.com/random/50x50/?person3 " alt="Person 3" class="w-12 h-12 rounded-full">
                    <img src="https://source.unsplash.com/random/50x50/?person4 " alt="Person 4" class="w-12 h-12 rounded-full">
                </div>
                <div class="mt-4">
                    <p><i class="fas fa-phone"></i> Genève : +41 022 738 80 80</p>
                    <p><i class="fas fa-phone"></i> Lausanne : +41 21 321 65 00</p>
                    <p><i class="fas fa-envelope"></i> romandie@digicomp.ch</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-100 py-10">
        <div class="container mx-auto flex flex-col md:flex-row justify-between">
            <div class="w-full md:w-1/3 p-4">
                <h3 class="text-xl font-bold mb-4">Restez en contact</h3>
                <p>Conseil personnalisé au<br>022 738 80 80 ou 021 321 65 00<br>du Lu au Ve, 08h00–17h00</p>
                <p>romandie@digicomp.ch</p>
                <p>Digicomp Academy SA<br>Rue de Monthoux 64 – 1201 Genève<br>Avenue de la Gare 50 - 1003 Lausanne</p>
            </div>
            <div class="w-full md:w-1/3 p-4">
                <h3 class="text-xl font-bold mb-4">Top des éditeurs</h3>
                <p>Microsoft</p>
                <p>VMware</p>
                <p>Citrix</p>
                <p>Apple</p>
                <p>Adobe</p>
                <p>SAP</p>
                <h3 class="text-xl font-bold mb-4 mt-8">Offre de services</h3>
                <p>Assessments</p>
                <p>Centre de tests</p>
                <p>Location de salles</p>
            </div>
            <div class="w-full md:w-1/3 p-4">
                <h3 class="text-xl font-bold mb-4">Digicomp</h3>
                <p>Sites</p>
                <p>Contact</p>
                <p>Impressum</p>
                <p>Politique de confidentialité</p>
                <p>CG</p>
                <p>Jobs</p>
                <p>Droit des marques</p>
                <p>Gestion des réclamations</p>
                <p>Notre modèle andragogique</p>
                <h3 class="text-xl font-bold mb-4 mt-8">Certifications</h3>
                <p>eduQua</p>
                <p>ISO 9001</p>
                <p>Dun & Bradstreet</p>
            </div>
        </div>
        <div class="container mx-auto flex justify-between mt-8">
            <div>
                <a href="#" class="bg-green-500 text-white px-4 py-2 rounded">Contact</a>
            </div>
            <div class="flex space-x-4">
                <a href="#"><i class="fab fa-facebook-square text-green-500"></i></a>
                <a href="#"><i class="fab fa-instagram text-green-500"></i></a>
                <a href="#"><i class="fab fa-linkedin-in text-green-500"></i></a>
                <a href="#"><i class="fab fa-youtube text-green-500"></i></a>
            </div>
        </div>
    </footer>

</body>

</html>