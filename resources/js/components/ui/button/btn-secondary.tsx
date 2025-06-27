import { Link } from "@inertiajs/react";


interface BtnSecondaryProps {
    className?: string;
    label: string;
    href?: string;
    onClick?: () => void;
}

export default function BtnSecondary({ className, label, href, onClick }: BtnSecondaryProps) {

    const btnClass = `${className} inline-block cursor-pointer rounded-[100px] border border-gray-600 bg-gray-600 px-[25px] py-[9px] text-base font-medium text-white transition-all duration-300 hover:border-blue-500 hover:bg-blue-500 hover:scale-105 md:top-[13px] md:px-[30px] md:py-[10.5px]`

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
