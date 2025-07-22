import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from '../ui/select';

export interface ISelectItem {
  id: number;
  title: string;
  value: string | number;
  canSelectParent?: boolean;
  subItem?: ISelectItem[];
}

interface SelectCustomProps {
  selectLabel: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string;
  value?: string;
  onValueChange: (value: string) => void;
  processing: boolean;
  data: ISelectItem[];
  groupLabel?: string;
}

export default function SelectCustom({
  required,
  disabled,
  processing,
  onValueChange,
  data,
  selectLabel,
  defaultValue,
  value,
  groupLabel,
}: SelectCustomProps) {
  return (
    <Select
      disabled={processing}
      required={required}
      value={value ?? defaultValue}
      onValueChange={onValueChange}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Sélectionner..." />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup aria-label={groupLabel}>
          <SelectLabel>{selectLabel}</SelectLabel>

          {data?.map((item) => (
            <React.Fragment key={item.id}>
              {/* Render parent item if selectable or no sub-items */}
              {(!item.subItem || item.canSelectParent) && (
                <SelectItem value={item.value.toString()}>
                  {item.title}
                </SelectItem>
              )}

              {/* Render sub-items if they exist */}
              {item.subItem && item.subItem.length > 0 && (
                <>
                 <SelectGroup>
                    <SelectItem
                    value={item.value.toString()}
                      disabled={true} // Disable the parent item to prevent selection
                      className="pl-6" // Indentation for sub-items
                    >
                      {item.title}
                    </SelectItem>
              
                </SelectGroup>
                <SelectGroup>
                
                  {item.subItem.map((subItem) => (
                    <SelectItem
                      key={subItem.id}
                      value={subItem.value.toString()}
                      className="pl-6" // Indentation for sub-items
                    >
                      {`— ${subItem.title}`} {/* Prefix for visual hierarchy */}
                    </SelectItem>
                  ))}
                </SelectGroup>
                </>
              )}
            </React.Fragment>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}