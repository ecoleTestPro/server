import { Link } from "@inertiajs/react";


interface BtnSecondaryProps {
    className?: string;
    label: string;
    href?: string;
    onClick?: () => void;
}

export default function BtnSecondary({ className, label, href, onClick }: BtnSecondaryProps) {

    const btnClass = `${className} inline-block cursor-pointer rounded-md hover:bg-primary hover:rounded-lg border border-tr bg-secondary px-[25px] py-[9px] text-base font-medium text-white transition-all duration-300 hover:scale-105 md:px-[30px] md:py-[6px]`

    if(href) {
        return <Link href={href} className={btnClass}>{label}</Link>
    }

    
    return (  
        <button
            type="button"
            className={btnClass}
            onClick={onClick}   
        >
            {label}
        </button>
  )
}
