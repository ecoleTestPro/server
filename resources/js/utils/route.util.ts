interface IRouteMap {
    link: string;
    linkFile?: string;
    title?: string;
    // chjildren?: IRouteMap[];
}

/**
 * Creates an object of type IRouteMap.
 * @param {string} link The href value for the route.
 * @param {string} [title] The title of the route.
 * @param {string} [linkFile] The file path for the link.
 * @returns {IRouteMap} An object of type IRouteMap.
 */
const createIRouteMap = (link: string, title?: string, linkFile?: string): IRouteMap => {
    try {
        return {
            link,
            title,
            linkFile,
        };
    } catch (error) {
        console.error('Error creating IRouteMap:', error);
        return {
            link: '/',
            title: '',
            linkFile: '',
        };
    }
}

interface IROUTE_MAP {
    public: {
        home: IRouteMap;
        aboutUs: IRouteMap;
        careers: IRouteMap;
        faqs: IRouteMap;
        contact: IRouteMap;
        privacyPolicy: IRouteMap;
        termsOfService: IRouteMap;
        search: IRouteMap;
        calendar: IRouteMap;
        courses: {
            list: IRouteMap;
            byCategory: (categorySlug: string) => IRouteMap;
            detail: (categorySlug: string, slug: string) => IRouteMap;
        };
        services: {
            index: IRouteMap;
            consulting: {
                index: IRouteMap;
                auditOfMaturityOfTests: IRouteMap;
                consultingTesting: IRouteMap;
            },
            testSerivces: {
                index: IRouteMap;
                testOutsourcingServices: IRouteMap;
                integrationSpecialists: IRouteMap;
            }
        }
        blogs: {
            list: IRouteMap;
            detail: (slug: string) => IRouteMap;
        }
    }
    auth: {
        login: IRouteMap,
        register: IRouteMap,
        forgotPassword: IRouteMap,
        resetPassword: IRouteMap,
        verifyEmail: IRouteMap,
        adminLogin: IRouteMap,
    },
    dashboard: {
        dashboard: IRouteMap,
        course: {
            list: IRouteMap,
            create: IRouteMap,
            edit: (slug: string) => IRouteMap
        },
        blogs: {
            index: IRouteMap,
            create: IRouteMap,
            edit: (slug: string) => IRouteMap
        },
        newsletters: {
            index: IRouteMap,
        }
    }
}

export const ROUTE_MAP: IROUTE_MAP = {
    public: {
        home: createIRouteMap(route('home'), 'Accueil'),
        aboutUs: createIRouteMap(route('aboutUs'), 'À propos de nous'),
        careers: createIRouteMap(route('careers'), 'Carrières'),
        faqs: createIRouteMap(route('faqs'), 'FAQs'),
        contact: createIRouteMap(route('contact'), 'Nous contacter'),
        privacyPolicy: createIRouteMap(route('privacyPolicy'), 'Politique de confidentialité'),
        termsOfService: createIRouteMap(route('termsOfService'), 'Conditions d’utilisation'),
        search: createIRouteMap(route('search.page'), 'Résultats de recherche'),
        calendar: createIRouteMap(route('courses.calendar'), 'Calendrier des formations'),
        courses: {
            list: createIRouteMap('/formations', 'Liste des formations'),
            byCategory: (categorySlug: string) => {
                return createIRouteMap(`/formation/${categorySlug}`, 'Formations par catégorie');
            },
            detail: (categorySlug: string, slug: string) => {
                return createIRouteMap(`/formation/${categorySlug}/${slug}`, 'Détail de la formation');
            }
        },
        services: {
            index: createIRouteMap(route('services'), 'Nos services'),
            consulting: {
                index: createIRouteMap(route('consulting'), 'Consulting'),
                auditOfMaturityOfTests: createIRouteMap(route('consulting.audit'), 'Audit de maturité de tests'),
                consultingTesting: createIRouteMap(route('consulting.testing'), 'Conseil Testing'),
            },
            testSerivces: {
                index: createIRouteMap(route('services.test.outsourcing'), 'Services de test'),
                testOutsourcingServices: createIRouteMap(route('services.test.outsourcing'), 'Services d’externalisation de test'),
                integrationSpecialists: createIRouteMap(route('services.integration.specialists'), 'Intégration de Spécialistes dans Vos LocauxTest Outsourcing Services'),
            }
        },
        blogs: {
            list: createIRouteMap('/blogs', 'Blogs'),
            detail: (slug: string) => createIRouteMap(`/blog/${slug}`, 'Détail du blog')

        },
    },
    auth: {
        login: createIRouteMap(route('login'), 'Connexion'),
        register: createIRouteMap(route('auth.register'), 'Inscription'),
        forgotPassword: createIRouteMap(route('password.request'), 'Mot de passe oublié'),
        resetPassword: createIRouteMap(route('password.email'), 'Réinitialiser le mot de passe'),
        verifyEmail: createIRouteMap(route('verification.notice'), 'Vérifier l’email'),
        adminLogin: createIRouteMap(route('admin.login'), 'Connexion Admin'),
    },
    dashboard: {
        dashboard: createIRouteMap(route('dashboard.index'), 'Tableau de bord'),
        course: {
            list: createIRouteMap(route('dashboard.course.index'), 'Liste des formations'),
            create: createIRouteMap(route('dashboard.course.create'), 'Créer une formation'),
            edit: (slug: string) => {
                return createIRouteMap(route('dashboard.course.edit', { slug }), 'Modifier la formation');
            },
        },
        blogs: {
            index: createIRouteMap(route('dashboard.blogs.index'), 'Liste des blogs'),
            create: createIRouteMap(route('dashboard.blogs.create'), 'Créer un blog'),
            edit: (slug: string) => {
                return createIRouteMap(route('dashboard.blogs.edit', { slug }), 'Modifier le blog');
            },
        },
        newsletters: {
            index: createIRouteMap(route('dashboard.newsletters.index'), 'Newsletters'),
        },
    }
}