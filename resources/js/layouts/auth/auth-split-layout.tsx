import AppLogoIcon from '@/components/app-logo-icon';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Award, BookOpen, Sparkles, TrendingUp, Users } from 'lucide-react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    title?: string;
    description?: string;
}

const features = [
    {
        icon: BookOpen,
        title: 'Formations expertes',
        description: 'Accédez à plus de 100+ formations certifiantes',
    },
    {
        icon: Users,
        title: 'Communauté active',
        description: 'Rejoignez 5000+ apprenants motivés',
    },
    {
        icon: TrendingUp,
        title: 'Progression suivie',
        description: 'Suivez vos progrès en temps réel',
    },
    {
        icon: Award,
        title: 'Certifications reconnues',
        description: "Obtenez des certificats validés par l'industrie",
    },
];

export default function AuthSplitLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    const { name } = usePage<SharedData>().props;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/20">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

            <div className="relative grid min-h-screen lg:grid-cols-2">
                {/* Left Panel - Hero Section */}
                <div className="relative hidden lg:flex flex-col justify-between bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 p-8 xl:p-12 overflow-hidden">
                    {/* Decorative background elements */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/90 to-teal-800/90" />
                    <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-white/10 to-transparent rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-teal-400/20 to-transparent rounded-full blur-2xl" />

                    {/* Content */}
                    <div className="relative z-10">
                        {/* Logo and Brand */}
                        <Link href={route('home')} className="inline-flex items-center group mb-16">
                            <div className="flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl mr-3 group-hover:bg-white/20 transition-all duration-300">
                                <AppLogoIcon className="w-7 h-7 fill-current text-white" />
                            </div>
                            <div className="text-white">
                                <div className="font-bold text-xl">{name || 'EcoleTestPro'}</div>
                                <div className="text-emerald-100 text-sm">Plateforme de formation</div>
                            </div>
                        </Link>

                        {/* Hero Content */}
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <div className="inline-flex items-center px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-emerald-100 text-sm font-medium">
                                    <Sparkles className="w-4 h-4 mr-2" />
                                    Nouvelle génération d'apprentissage
                                </div>
                                <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight">
                                    Développez vos{' '}
                                    <span className="text-gradient bg-gradient-to-r from-emerald-200 to-teal-200 bg-clip-text text-transparent">
                                        compétences
                                    </span>{' '}
                                    avec les meilleurs experts
                                </h1>
                                <p className="text-emerald-100 text-lg leading-relaxed max-w-md">
                                    Transformez votre carrière grâce à nos formations certifiantes et notre communauté d'experts.
                                </p>
                            </div>

                            {/* Features Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                {features.map((feature, index) => {
                                    const Icon = feature.icon;
                                    return (
                                        <div
                                            key={feature.title}
                                            className="group p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                                            style={{ animationDelay: `${index * 100}ms` }}
                                        >
                                            <div className="flex items-start space-x-3">
                                                <div className="flex items-center justify-center w-8 h-8 bg-emerald-500/20 rounded-lg group-hover:bg-emerald-500/30 transition-colors">
                                                    <Icon className="w-4 h-4 text-emerald-200" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-semibold text-white text-sm mb-1">{feature.title}</h3>
                                                    <p className="text-emerald-100/80 text-xs leading-relaxed">{feature.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Quote/Testimonial */}
                    {false && (
                        <div className="relative z-10">
                            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                                            <span className="text-white font-semibold text-sm">👨‍🎓</span>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-white font-medium text-sm mb-2">
                                            "Une plateforme exceptionnelle qui m'a permis d'évoluer rapidement dans ma carrière. Les formations sont
                                            de qualité professionnelle."
                                        </p>
                                        <div className="text-emerald-200 text-xs">
                                            <span className="font-semibold">Sarah M.</span> • Développeuse Full-Stack
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Panel - Form Section */}
                <div className="flex items-center justify-center p-4 sm:p-6 lg:p-8">
                    <div className="w-full max-w-md space-y-8">
                        {/* Mobile Logo */}
                        <div className="flex justify-center lg:hidden">
                            <Link href={route('home')} className="inline-flex items-center group">
                                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mr-3 shadow-lg">
                                    <AppLogoIcon className="w-8 h-8 fill-current text-white" />
                                </div>
                                <div>
                                    <div className="font-bold text-xl text-gray-900">{name || 'EcoleTestPro'}</div>
                                    <div className="text-gray-600 text-sm">Plateforme de formation</div>
                                </div>
                            </Link>
                        </div>

                        {/* Form Header */}
                        <div className="text-center space-y-3">
                            {title && (
                                <div className="space-y-2">
                                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h1>
                                    {description && (
                                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">{description}</p>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Form Content */}
                        <div className="bg-white rounded-2xl shadow-xl shadow-emerald-500/10 p-6 sm:p-8 border border-gray-100">{children}</div>

                        {/* Bottom Links */}
                        <div className="text-center space-y-4">
                            <div className="flex items-center justify-center space-x-1 text-sm text-gray-500">
                                <span>En vous connectant, vous acceptez nos</span>
                                <Link
                                    href="#"
                                    className="text-emerald-600 hover:text-emerald-700 font-medium underline underline-offset-4 decoration-2 decoration-emerald-200 hover:decoration-emerald-300 transition-colors"
                                >
                                    conditions d'utilisation
                                </Link>
                            </div>

                            <div className="hidden lg:block">
                                <div className="flex items-center justify-center space-x-6 text-xs text-gray-400">
                                    <span>© 2024 EcoleTestPro</span>
                                    <span>•</span>
                                    <Link href="#" className="hover:text-gray-600 transition-colors">
                                        Aide
                                    </Link>
                                    <span>•</span>
                                    <Link href="#" className="hover:text-gray-600 transition-colors">
                                        Contact
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile bottom wave decoration */}
            <div className="lg:hidden absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-emerald-50 to-transparent pointer-events-none" />
        </div>
    );
}
