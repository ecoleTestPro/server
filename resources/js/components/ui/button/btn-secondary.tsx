

interface BtnSecondaryProps {
    className?: string;
    label: string;
    onClick?: () => void;
}

export default function BtnSecondary({ className, label, onClick }: BtnSecondaryProps) {
  return (
    
        <button
            type="button"
            className={`${className} mt-[20px] inline-block cursor-pointer rounded-[100px] border border-gray-600 bg-gray-600 px-[25px] py-[9px] text-base font-medium text-white transition-all duration-300 hover:border-blue-500 hover:bg-blue-500 hover:scale-105 md:absolute md:top-[13px] md:mt-0 md:px-[30px] md:py-[10.5px] ltr:md:right-[13px] rtl:md:left-[13px]`}
            onClick={onClick}
        >
            {label}
        </button>
  )
}
