import { Button } from '@/components/ui/button';
import { CLASS_NAME } from '@/data/styles/style.constant';
import { cn } from '@/lib/utils';
import { IMainMenuItem } from '@/types/header.type';
import * as React from 'react';

interface NavMenuProps {
    menu: IMainMenuItem[];
}

export default function NavMenu({ menu }: NavMenuProps) {
    const [target, setTarget] = React.useState<IMainMenuItem | null>(null);
    const [isOpen, setIsOpen] = React.useState(false);

    if (!menu || menu.length === 0) {
        return null; // or render a fallback UI
    }

    const onClick = (item: IMainMenuItem) => {
        if (isOpen) {
            onCLose();
            return;
        }
        setTarget(item);
        setIsOpen(true);
    };

    const onCLose = () => {
        setTarget(null);
        setIsOpen(false);
    };

    const onMouseLeave = () => {
        setTarget(null);
        setIsOpen(false);
    };

    const isCurrent = (item: IMainMenuItem) => {
        if (!target) {
            return false;
        }

        return item.id === target.id;
    };
    return (
        <>
            <div className="flex w-full">
                {menu.map((item, index) => (
                    <div key={index}>
                        <div
                            className={`cursor-pointer border-b-2 ${isCurrent(item) ? 'border-primary' : 'border-transparent'}`}
                            onClick={() => onClick(item)}
                        >
                            {/* <NavigationMenuTrigger> */}
                            <span className="hover:text-accent-foreground focus:text-accent-foreground flex items-center rounded-md px-2 py-2 text-sm text-black transition">
                                {item.label}
                                {item.children && (
                                    <span className="ml-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className={`size-4 ${isCurrent(item) ? 'text-primary' : 'text-gray-500'}`}
                                            style={{
                                                transform: isCurrent(item) ? 'rotate(180deg)' : 'rotate(0deg)',
                                                transition: 'transform 0.3s ease',
                                            }}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </span>
                                )}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {target && isOpen && (
                <div className="absolute top-[90px] left-0 flex w-full shadow-lg">
                    {/* Sous-menu */}
                    {target.children && (
                        <div className={`absolute top-[50px] left-0 mx-auto grid w-[100vw] p-4 ${CLASS_NAME['bg-white']}`}>
                            {/* <NavigationMenuContent> */}
                            <div className="grid w-full min-w-full grid-cols-5 grid-rows-1 gap-2">
                                {/* Colonne gauche (image ou contenu principal) */}
                                {target.title && target.description && (
                                    <div>
                                        <article className="group">
                                            <img
                                                alt=""
                                                src="https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                                                className="h-56 w-full rounded-xl object-cover shadow-xl transition group-hover:grayscale-[50%]"
                                            />

                                            <div className="p-4">
                                                {target.title && (
                                                    <a href="#">
                                                        <h3 className="text-lg font-medium text-gray-900"> {target.title} </h3>
                                                    </a>
                                                )}

                                                {target.description && (
                                                    <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">{target.description}</p>
                                                )}

                                                {target.description && <Button className="mt-2">Détails</Button>}
                                            </div>
                                        </article>
                                    </div>
                                )}

                                {/* Colonne centrale (liste des liens) */}
                                <div className="col-span-3">
                                    {target.children.items.map((itemChild, index) => (
                                        <div className="mb-4 flex" key={index}>
                                            <div className="p-4">
                                                {itemChild.label && (
                                                    <a href="#">
                                                        <h3 className="text-lg font-medium text-gray-900"> {itemChild.label} </h3>
                                                    </a>
                                                )}
                                            </div>
                                            <div>
                                                {itemChild.subItems &&
                                                    itemChild.subItems.map((itemChildSubItem, index) => (
                                                        <>
                                                            <ListItem key={index} href={itemChildSubItem.href}>
                                                                {itemChildSubItem.label}
                                                            </ListItem>
                                                        </>
                                                    ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Colonne droite (contenu supplémentaire) */}
                                <div className="col-start-5">{/* Ajoutez ici du contenu supplémentaire si nécessaire */}</div>
                            </div>
                            {/* </NavigationMenuContent> */}
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

// Composant ListItem pour les éléments du sous-menu
const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(({ className, title, children, ...props }, ref) => {
    return (
        <li className="list-none p-2">
            {/* <NavigationMenuLink asChild> */}
            <a
                ref={ref}
                className={cn(
                    'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none',
                    className,
                )}
                {...props}
            >
                <div className="text-sm leading-none font-medium">{title}</div>
                <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
            </a>
            {/* </NavigationMenuLink> */}
        </li>
    );
});
ListItem.displayName = 'ListItem';
