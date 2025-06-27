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
        />
      </Suspense>
    </div>
  )
}