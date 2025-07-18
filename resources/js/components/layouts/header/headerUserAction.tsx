import { NotificationsDropdown } from '@/components/notification/NotificationsDropdown';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BtnHoverEffect } from '@/components/ui/button/btnHoverEfffect';
import { BtnLinkCustom } from '@/components/ui/button/Btnlink';
import { Button } from '@/components/ui/button/button';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { UserMenuContent } from '@/components/user-menu-content';
import { useInitials } from '@/hooks/use-initials';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { JSX, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CalendarMenu from './CalendarMenu';

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

    const userActionLogged: UserAction[] = [];

    const userActionNotLogged: UserAction[] = useMemo(
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
                    {/* sessions calendar */}
                    <CalendarMenu />

                    {/* User Icons */}
                    {false && userActionNotLogged.map(({ name, icon, link, modalComponent }) =>
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
                            <BtnLinkCustom key={name} icon={icon} href={link} title={name} />
                        ),
                    )}
                </div>
            ) : (
                <div className="flex items-center gap-2">
                    {/* User Avatar */}
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

                    {/* sessions calendar */}
                    <CalendarMenu />

                    {/* Notifications */}
                    <NotificationsDropdown />

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
