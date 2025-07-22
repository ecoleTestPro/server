import React, { Suspense, lazy } from 'react';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


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
                <CKEditor
                    editor={ClassicEditor}
                    data={value}
                    onChange={(_event: unknown, editor: any) => {
                        const data = editor.getData();
                        setData(data);
                    }}
                    config={{
                        toolbar: {
                            items: [
                                'undo', 'redo',
                                '|', 'heading',
                                '|', 'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor',
                                '|', 'bold', 'italic', 'strikethrough', 'subscript', 'superscript', 'code',
                                '-', // break point
                                '|', 'alignment',
                                'link', 'uploadImage', 'blockQuote', 'codeBlock',
                                '|', 'bulletedList', 'numberedList', 'todoList', 'outdent', 'indent'
                            ],
                        },
                    }}
                    id={labelId}
                />
            </Suspense>
        </div>
    );
}
