


interface IRouteMap {
    link: string;
    linkFile?: string;
    title?: string;
    chjildren?: IRouteMap[];
}



export const ROUTE_MAP: {
    home: IRouteMap;
    courses: IRouteMap;
    courseDetail: (categoryId: number, id: number) => IRouteMap;
    courseCategories: IRouteMap;
    courseCategory: (categoryId: number) => IRouteMap;
    consulting: IRouteMap;
    services: IRouteMap;
    blogs: IRouteMap;
    careers: IRouteMap;
    faqs: IRouteMap;
    contact: IRouteMap;
    aboutUs: IRouteMap;
    privacyPolicy: IRouteMap;
    termsOfService: IRouteMap;
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
        link: '/courses',
        chjildren: [
            {
                link: '/courses/:categoryId',
                title: 'Category',
            },
            {
                link: '/courses/:categoryId/courses/:courseId',
                title: 'Course',
            },
        ],
    },
    courseDetail: (categoryId: number, id: number) => {
        return {
            title: 'Détail de la formation',
            link: `/courses/${categoryId}/courses/${id}`,
        }
    },
    courseCategories: {
        title: 'Catégories de formations',
        link: '/courses/categories',
    },
    courseCategory: (categoryId: number) => {
        return {
            title: 'Catégorie de formation',
            link: `/courses/categories/${categoryId}`,
        }
    },
    consulting: {
        title: 'Consulting',
        link: '/consulting',
        chjildren: [
            {
                link: '/consulting/audit-of-maturity-of-tests',
                title: 'Audit de maturité de test',
            },
            {
                link: '/consulting/consulting-testing',
                title: 'Conseil Testing',
            },
        ]
    },
    services: {
        title: 'Services',
        link: '/services',
    },
    blogs: {
        title: 'Blogs',
        link: '/blogs',
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
}