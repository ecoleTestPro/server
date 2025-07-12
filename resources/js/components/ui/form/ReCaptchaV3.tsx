// import * as React from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogFooter,
//   DialogTitle,
//   DialogDescription,
//   DialogClose,
// } from "../../ui/dialog";
// import { Button } from "../../ui/button/button";
//     import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

// import { RECAPTCHA_SITE_KEY } from "@/data/data.constant";



// interface ReCaptchaV3Props {
//   action: string;
//   onVerify: (token: string | null) => void;
//   title?: string;
//   description?: string;
//   acceptLabel?: string;
//   declineLabel?: string;
//   policyLink?: string;
// }

// export function ReCaptchaV3({
//   action,
//   onVerify,
//   title = "reCAPTCHA Verification",
//   description = "This site is protected by reCAPTCHA v3 to prevent spam and abuse. By accepting, you agree to Google's Terms of Service and Privacy Policy.",
//   acceptLabel = "Accepter reCAPTCHA",
//   declineLabel = "Refuser",
//   policyLink = "https://policies.google.com",
// }: ReCaptchaV3Props) {
//   const [isOpen, setIsOpen] = React.useState(false);
//   const [scriptLoaded, setScriptLoaded] = React.useState(false);

//   React.useEffect(() => {
//     // Check if user has already consented to reCAPTCHA
//     const hasConsented = localStorage.getItem("recaptchaConsent");
//     if (!hasConsented) {
//       setIsOpen(true);
//     } else if (hasConsented === "accepted") {
//       loadReCaptchaScript();
//     }
//   }, []);

//   const loadReCaptchaScript = () => {
//     if (!window.grecaptcha) {
//       const script = document.createElement("script");
//       script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
//       script.async = true;
//       script.onload = () => {
//         setScriptLoaded(true);
//         executeReCaptcha();
//       };
//       document.body.appendChild(script);
//     } else {
//       setScriptLoaded(true);
//       executeReCaptcha();
//     }
//   };

//   const executeReCaptcha = () => {
//     if (window.grecaptcha && scriptLoaded) {
//       window.grecaptcha.ready(() => {
//         window.grecaptcha
//           .execute(RECAPTCHA_SITE_KEY, { action })
//           .then((token: string) => {
//             onVerify(token);
//           })
//           .catch((error: Error) => {
//             console.error("reCAPTCHA error:", error);
//             onVerify(null);
//           });
//       });
//     }
//   };

//   const handleAccept = () => {
//     localStorage.setItem("recaptchaConsent", "accepted");
//     setIsOpen(false);
//     loadReCaptchaScript();
//   };

//   const handleDecline = () => {
//     localStorage.setItem("recaptchaConsent", "declined");
//     setIsOpen(false);
//     onVerify(null);
//   };

//   return (
//         <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
//           {/* Your application components */}
//         </GoogleReCaptchaProvider>
//   );
// }