import { ROUTE_MAP } from '@/utils/route.util';
import * as React from 'react';
import { Button } from '../ui/button/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';

interface CookieConsentProps {
    title?: string;
    description?: string;
    acceptLabel?: string;
    declineLabel?: string;
    policyLink?: string;
}

export function CookieConsent({
    title = 'Cookie Consent',
    description = 'We use cookies to enhance your experience. By accepting, you agree to our cookie policy.',
    acceptLabel = 'Accept Cookies',
    declineLabel = 'Decline',
    // policyLink = '/cookie-policy', // Non utilisé actuellement
}: CookieConsentProps) {
    const [isOpen, setIsOpen] = React.useState(false);

    React.useEffect(() => {
        // Check if user has already made a choice
        const hasConsented = localStorage.getItem('cookieConsent');
        if (!hasConsented) {
            setIsOpen(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'accepted');
        setIsOpen(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookieConsent', 'declined');
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        <div className="mb-5">{description}</div>
                        <div>
                            <a
                                href={ROUTE_MAP.public.privacyPolicy.link}
                                className="text-secondary hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                En savoir plus sur notre politique en matière de cookies
                            </a>
                        </div>
                        .
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end gap-2">
                    <DialogClose asChild>
                        <Button variant="outline" type="button" onClick={handleDecline}>
                            {declineLabel}
                        </Button>
                    </DialogClose>
                    <Button variant="default" type="button" onClick={handleAccept}>
                        {acceptLabel}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
