import React from 'react'


interface BadgeneProps {
    title:string
    classNameColor?: string,
    bgColor?:string
}
export default function Badgene({ title, classNameColor, bgColor }: BadgeneProps) {
  return (
    <div className="relative mt-[10px] mb-[20px] inline-block">
        <span className="bg-primary-600 absolute top-[4.5px] h-[5px] w-[5px] -rotate-[6.536deg] ltr:-left-[3.6px] rtl:-right-[3.6px]"></span>
        <span className="bg-primary-600 absolute -top-[9.5px] h-[5px] w-[5px] -rotate-[6.536deg] ltr:right-0 rtl:left-0"></span>
        <span className="border-primary-600 text-primary-600 relative inline-block -rotate-[6.536deg] border px-[17.2px] py-[5.5px]">
            {title}
            <span className="bg-primary-600 absolute -bottom-[2.5px] h-[5px] w-[5px] -rotate-[6.536deg] ltr:-left-[3.5px] rtl:-right-[3.5px]"></span>
            <span className="bg-primary-600 absolute -bottom-[2.5px] h-[5px] w-[5px] -rotate-[6.536deg] ltr:-right-[3.5px] rtl:-left-[3.5px]"></span>
        </span>
    </div>
  )
}
