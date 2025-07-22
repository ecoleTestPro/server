import React, { lazy, Suspense, useEffect, useState } from 'react'

const ReactQuill = lazy(() => import('react-quill-new'));

interface RichTextQuillProps {
    label: string;
    labelId: string;
    value: string;
    setData: (value: string) => void;
    className?: string;
}

export default function RichTextQuill({ label, labelId, value, setData, className = 'min-h-[200px] max-h-[300px] h-fit w-full overflow-y-auto' }: RichTextQuillProps) {
    // const [value$, setValue$] = useState<string>('');

    // useEffect(() => {
    //     if (value && value$ == '') {
    //         setValue$(value);
    //     }
    // }, [value])
    

  return (
    <div>
        <style>
        {`
          #${labelId} .ql-container {
            min-height: 200px;
            height: fit-content;
          }
          #${labelId} .ql-editor {
            min-height: 200px;
            height: fit-content;
          }
        `}
        </style>
      <Suspense fallback={<div>Loading editor...</div>}>
        <ReactQuill
          id={labelId}
          value={value}
          onChange={(newValue) => setData(newValue)}
          className={className}
          modules={
            {
              toolbar: [
                ['bold', 'italic', 'underline', 'strike', ], // toggled buttons
                ['blockquote', 'code-block'],
                [{ 'header': 1 }, { 'header': 2 }, { 'header': 3 }, { 'header': 4 }, { 'header': 5 }, { 'header': 6 }], // custom button values
                // [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'script': 'sub' }, { 'script': 'super' }], // superscript/subscript
                [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent
                // ['table'], // table
                // [{ 'direction': 'rtl' }], // text direction
                ['link', 'image', 'video'], // link and image, video
                ['clean'] // remove formatting button
              ]
            }
          }
          formats={[
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet', 'indent',
            'link', 'image', 'video', 'code-block',
            'header', 'align', 'clean'
          ]}
        />
      </Suspense>
    </div>
  )
}