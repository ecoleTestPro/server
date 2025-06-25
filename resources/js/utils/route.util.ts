


interface IRouteMap {
    link: string;
    linkFile?: string;
    title?: string;
    chjildren?: IRouteMap[];
}



export const ROUTE_MAP: {
    home: IRouteMap;
    courses: IRouteMap;
    courseDetail: (categorySlug: string, slug: string) => IRouteMap;
    courseCategory: (categorySlug: string) => IRouteMap;
    editCourse: (slug: string) => IRouteMap;
    consulting: IRouteMap;
    auditOfMaturityOfTests: IRouteMap;
    consultingTesting: IRouteMap;
    services: IRouteMap;
    serviceTestOutsourcingServices: IRouteMap
    serviceIntegrationSpecialists: IRouteMap
    blogs: IRouteMap;
    blogDetail: (slug: string) => IRouteMap;
    careers: IRouteMap;
    faqs: IRouteMap;
    contact: IRouteMap;
    aboutUs: IRouteMap;
    privacyPolicy: IRouteMap;
    termsOfService: IRouteMap;
    auth: {
        login: IRouteMap;
        register: IRouteMap;
        forgotPassword: IRouteMap;
        resetPassword: IRouteMap;
        verifyEmail: IRouteMap;
        adminLogin: IRouteMap;
    }
} = {
    aboutUs: {
        link: '/about-us',
        title: 'A propos de nous',
    },
    home: {
        link: '/',
        title: 'Accueil',
    },
    courses: {
        title: 'Formations',
        link: '/formations',
    },
    courseDetail: (categorySlug: string, slug: string) => {
        return {
            title: 'Détail de la formation',
            link: `/formation/${categorySlug}/${slug}`,
        }
    },
    courseCategory: (categorySlug: string) => {
        return {
            title: 'Catégorie de formation',
            link: `/formation/${categorySlug}`,
        }
    },
    editCourse: (slug: string) => {
        return {
            title: 'Modifier la formation',
            link: `/dashboard/courses/edit/${slug}`,
        }
    },
    consulting: {
        title: 'Consulting',
        link: '/consulting',
    },
    auditOfMaturityOfTests: {
        title: 'Audit de maturité de test',
        link: '/consulting/audit-of-maturity-of-tests',
    },
    consultingTesting: {
        title: 'Conseil Testing',
        link: '/consulting/consulting-testing',
    },
    services: {
        title: 'Services',
        link: '/services',
    },
    serviceTestOutsourcingServices: {
        title: 'Services d’externalisation de test',
        link: '/services/test-outsourcing-services',
    },
    serviceIntegrationSpecialists: {
        title: 'Intégration de Spécialistes dans Vos LocauxTest Outsourcing Services',
        link: '/services/integration-of-specialists-on-your-premises-test-outsourcing-services',
    },
    blogs: {
        title: 'Blogs',
        link: '/blogs',
    },
    blogDetail: (slug: string) => {
        return {
            title: 'Détail du blog',
            link: `/blog/${slug}`,
        }
    },
    careers: {
        title: 'Carrières',
        link: '/careers',
    },
    faqs: {
        title: 'FAQs',
        link: '/faqs',
    },
    contact: {
        title: 'Nous contacter',
        link: '/contact',
    },
    privacyPolicy: {
        title: 'Politique de confidentialité',
        link: '/privacy-policy',
    },
    termsOfService: {
        title: 'Conditions d’utilisation',
        link: '/terms-of-service',
    },
    auth: {
        login: {
            link: '/login',
            title: 'Connexion',
        },
        register: {
            link: '/register',
            title: 'Inscription',
        },
        forgotPassword: {
            link: '/forgot-password',
            title: 'Mot de passe oublié',
        },
        resetPassword: {
            link: '/reset-password',
            title: 'Réinitialiser le mot de passe',
        },
        verifyEmail: {
            link: '/verify-email',
            title: 'Vérifier l’email',
        },
        adminLogin: {
            link: '/admin/login',
            title: 'Connexion Admin',
        },
    }
}