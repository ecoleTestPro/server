import React from 'react'

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue ,SelectLabel} from '../ui/select';

interface ISelectItem {
    id: number
    title: string
    value: string
  }

interface SelectCustomProps {
    selectLabel:string
    required?: boolean
    disabled?: boolean
    defaultValue?: string
    onValueChange: (value: string) => void
    processing: boolean
    data: ISelectItem[]
}

export default function SelectCustom({ required, disabled, processing, onValueChange, data, selectLabel, defaultValue }: SelectCustomProps) {
  return (
    <Select disabled={processing} required={required}  value={defaultValue} onValueChange={onValueChange}>
        <SelectTrigger className="w-full">
            <SelectValue placeholder="Sélectionner une catégorie" />
        </SelectTrigger>

        <SelectContent>
            <SelectGroup>
                <SelectLabel>{selectLabel}</SelectLabel>

                {data &&
                    data.map((item) => (
                        <SelectItem key={item.id} value={item?.id?.toString() ?? ''}>
                            {item.title}
                        </SelectItem>
                    ))}
            </SelectGroup>
        </SelectContent>
    </Select>
  )
}
