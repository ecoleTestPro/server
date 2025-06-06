import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { BtnHoverEffect } from '@/components/ui/button/btnHoverEfffect';
import { BtnLinkCustom } from '@/components/ui/button/Btnlink';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { UserMenuContent } from '@/components/user-menu-content';
import { useInitials } from '@/hooks/use-initials';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { JSX, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface UserAction {
    name: string;
    icon: JSX.Element;
    link: string;
    modalComponent?: IModalComponent;
}

interface IModalComponent {
    header: string;
    description?: string;
    content: JSX.Element;
}

function HeaderUserAction() {
    const { auth } = usePage<SharedData>().props;
    const page = usePage<SharedData>();
    const getInitials = useInitials();
    const { t, i18n } = useTranslation();

    const [openModal, setOpenModal] = useState(false);
    const [modalContent, setModalContent] = useState<IModalComponent | null>(null);

    const userActionLogged: UserAction[] = [
        {
            name: 'Favoris',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                </svg>
            ),
            link: route('login'),
        },
        {
            name: 'Panier',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 3h2l1.5 9h12l1.5-9h2M6 21a2 2 0 1 0 4 0H6zm8 0a2 2 0 1 0 4 0h-4zM6.5 7h13l-1.5 9H7L6.5 7z"
                    />
                </svg>
            ),
            link: route('login'),
        },
    ];

    const userActionNotLogged = useMemo(
        () => [
            {
                name: t('login.login', 'Se connecter'),
                icon: (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                        />
                    </svg>
                ),
                link: route('login'),
            },
            {
                name: t('register.register', "S'inscrire"),
                icon: (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                        />
                    </svg>
                ),
                link: route('auth.register'),
            },
        ],
        [t, i18n.language],
    );

    onCloseDialog: () => {
        setOpenModal(false);
        setModalContent(null);
    };

    function ModalComponent() {
        return (
            <Dialog open={openModal} onOpenChange={setOpenModal}>
                <DialogContent className="p-4">
                    <DialogHeader>
                        {modalContent && modalContent.header && (
                            <DialogTitle>
                                <h3 className="text-primary text-2xl font-bold">{modalContent?.header}</h3>
                            </DialogTitle>
                        )}
                        {modalContent && modalContent.description && (
                            <DialogDescription>
                                <p className="text-muted-foreground">{modalContent?.description}</p>
                            </DialogDescription>
                        )}
                    </DialogHeader>
                    <div className="mt-4">{modalContent?.content}</div>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <div>
            {/* Modal */}
            <ModalComponent />

            {auth && !auth.user ? (
                //  ! user not logged
                <div className="flex gap-2">
                    {/* User Icons */}
                    {userActionNotLogged.map(({ name, icon, link, modalComponent }) =>
                        modalComponent ? (
                            <button
                                key={name}
                                type="button"
                                className="focus:outline-none"
                                onClick={() => {
                                    setModalContent(modalComponent);
                                    setOpenModal(true);
                                }}
                            >
                                <BtnHoverEffect text={name} icon={icon} />
                            </button>
                        ) : (
                            <BtnLinkCustom key={name} text={name} icon={icon} href={link} />
                        ),
                    )}
                </div>
            ) : (
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="size-10 rounded-full p-1">
                                <Avatar className="size-8 overflow-hidden rounded-full">
                                    <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                                    <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                        {getInitials(auth.user.name)}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end">
                            <UserMenuContent user={auth.user} />
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div className="flex gap-2">
                        {/* User Icons */}
                        {userActionLogged.map(({ name, icon, link }) => (
                            <Link key={name} href={link} className="text-green-500 transition hover:text-green-700" aria-label={name}>
                                {icon}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default HeaderUserAction;
