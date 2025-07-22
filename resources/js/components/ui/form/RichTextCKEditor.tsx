import React, { Suspense, lazy } from 'react';

const CKEditorComponent = lazy(() => import('@ckeditor/ckeditor5-react').then(mod => ({ default: mod.CKEditor })));
const ClassicEditor = lazy(() => import('@ckeditor/ckeditor5-build-classic'));

interface RichTextCKEditorProps {
    label: string;
    labelId: string;
    value: string;
    setData: (value: string) => void;
    className?: string;
}

export default function RichTextCKEditor({
    label,
    labelId,
    value,
    setData,
    className = 'min-h-[200px] max-h-[300px] h-fit w-full overflow-y-auto',
}: RichTextCKEditorProps) {
    return (
        <div>
            <label htmlFor={labelId} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <Suspense fallback={<div>Loading editor...</div>}>
                <CKEditorComponent
                    editor={ClassicEditor}
                    data={value}
                    onChange={(_event: unknown, editor: any) => {
                        const data = editor.getData();
                        setData(data);
                    }}
                    config={{
                        toolbar: {
                            items: [
                                'heading',
                                '|',
                                'bold',
                                'italic',
                                'link',
                                'bulletedList',
                                'numberedList',
                                '|',
                                'blockQuote',
                                'undo',
                                'redo',
                            ],
                        },
                    }}
                    id={labelId}
                    className={className}
                />
            </Suspense>
        </div>
    );
}
