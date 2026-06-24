import React, { useMemo, useCallback } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

interface RichTextSlateProps {
    label: string;
    labelId: string;
    value: string;
    setData: (value: string) => void;
    className?: string;
}

const DEFAULT_VALUE: Descendant[] = [
    { type: 'paragraph', children: [{ text: '' }] },
];

export default function RichTextSlate({ label, labelId, value, setData, className = 'min-h-[200px] max-h-[300px] h-fit w-full overflow-y-auto' }: RichTextSlateProps) {
    const editor = useMemo(() => withReact(createEditor()), []);

    const initialValue = useMemo<Descendant[]>(() => {
        try {
            return value ? JSON.parse(value) : DEFAULT_VALUE;
        } catch {
            return DEFAULT_VALUE;
        }
    }, [value]);

    const handleChange = useCallback(
        (val: Descendant[]) => {
            setData(JSON.stringify(val));
        },
        [setData]
    );

    return (
        <div className="w-full">
            <label htmlFor={labelId} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <Slate editor={editor} value={initialValue} onChange={handleChange}>
                <Editable id={labelId} className={`p-4 border border-gray-300 rounded-lg ${className}`} />
            </Slate>
        </div>
    );
}
