import React from 'react'
import { Tooltip , TooltipContent, TooltipTrigger} from './tooltip'
import { Button } from './button/button'

interface TooltipCustomProps {
    children: React.ReactNode;
    tootipText: string;
}

export default function TooltipCustom({ children , tootipText}: TooltipCustomProps) {
  return (
     <Tooltip>
        <TooltipTrigger asChild>
            <Button variant="outline">
                {children}
            </Button>
        </TooltipTrigger>
        <TooltipContent>
            <p>{tootipText}</p>
        </TooltipContent>
    </Tooltip>
  )
}
