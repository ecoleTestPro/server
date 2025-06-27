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

export const ROUTE_MAP = {
    aboutUs: createIRouteMap('/about-us', 'À propos de nous'),
    home: createIRouteMap('/', 'Accueil'),
    courses: createIRouteMap('/formations', 'Formations'),
    courseDetail: (categorySlug: string, slug: string) => {
        return createIRouteMap(`/formation/${categorySlug}/${slug}`, 'Détail de la formation');
    },
    courseCategory: (categorySlug: string) => {
        return createIRouteMap(`/formation/${categorySlug}`, 'Catégorie de formation');
    },
    editCourse: (slug: string) => {
        return createIRouteMap(`/dashboard/courses/edit/${slug}`, 'Modifier la formation');
    },
    consulting: createIRouteMap('/consulting', 'Consulting'),
    auditOfMaturityOfTests: createIRouteMap('/consulting/audit-of-maturity-of-tests', 'Audit de maturité de test'),
    consultingTesting: createIRouteMap('/consulting/consulting-testing', 'Conseil Testing'),
    services: createIRouteMap('/services', 'Services'),
    serviceTestOutsourcingServices: createIRouteMap('/services/test-outsourcing-services', 'Services d’externalisation de test'),
    serviceIntegrationSpecialists: createIRouteMap('/services/integration-of-specialists-on-your-premises-test-outsourcing-services', 'Intégration de Spécialistes dans Vos LocauxTest Outsourcing Services'),
    blogs: createIRouteMap('/blogs', 'Blogs'),
    blogDetail: (slug: string) => {
        return createIRouteMap(`/blog/${slug}`, 'Détail du blog');
    },
    careers: createIRouteMap('/careers', 'Carrières'),
    faqs: createIRouteMap('/faqs', 'FAQs'),
    contact: createIRouteMap('/contact', 'Nous contacter'),
    privacyPolicy: createIRouteMap('/privacy-policy', 'Politique de confidentialité'),
    termsOfService: createIRouteMap('/terms-of-service', 'Conditions d’utilisation'),
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
    }
}