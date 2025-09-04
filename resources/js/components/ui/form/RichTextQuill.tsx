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
          /* Mode clair par défaut */
          #${labelId} .ql-container {
            min-height: 200px;
            height: fit-content;
            border: 1px solid #e5e7eb;
            border-radius: 0.5rem;
            background-color: #ffffff;
          }
          #${labelId} .ql-editor {
            min-height: 200px;
            height: fit-content;
            font-size: 14px;
            line-height: 1.6;
            background-color: #ffffff;
            color: #374151;
          }
          #${labelId} .ql-toolbar {
            border: 1px solid #e5e7eb;
            border-bottom: none;
            border-radius: 0.5rem 0.5rem 0 0;
            background: #f9fafb;
            color: #374151;
          }
          
          /* Mode sombre avec classe dark sur html */
          :is(html.dark, .dark) #${labelId} .ql-container {
            border-color: #6b7280 !important;
            background-color: #1f2937 !important;
          }
          :is(html.dark, .dark) #${labelId} .ql-editor {
            background-color: #1f2937 !important;
            color: #f3f4f6 !important;
          }
          :is(html.dark, .dark) #${labelId} .ql-toolbar {
            border-color: #6b7280 !important;
            background: #374151 !important;
            color: #f3f4f6 !important;
          }
          
          /* Styles pour les éléments en mode sombre */
          :is(html.dark, .dark) #${labelId} .ql-editor h1,
          :is(html.dark, .dark) #${labelId} .ql-editor h2,
          :is(html.dark, .dark) #${labelId} .ql-editor h3 {
            color: #f9fafb !important;
          }
          :is(html.dark, .dark) #${labelId} .ql-editor ol > li::before {
            color: #f3f4f6 !important;
          }
          :is(html.dark, .dark) #${labelId} .ql-editor ul > li::before {
            color: #9ca3af !important;
          }
          :is(html.dark, .dark) #${labelId} .ql-editor blockquote {
            color: #d1d5db !important;
            border-left-color: #60a5fa !important;
            background-color: #374151 !important;
          }
          :is(html.dark, .dark) #${labelId} .ql-editor code {
            background-color: #374151 !important;
            color: #fbbf24 !important;
          }
          
          /* Fallback pour une meilleure compatibilité */
          html.dark #${labelId} .ql-editor,
          .dark #${labelId} .ql-editor {
            background-color: #1f2937 !important;
            color: #f3f4f6 !important;
          }
          #${labelId} .ql-toolbar .ql-formats {
            margin-right: 15px;
          }
          #${labelId} .ql-editor ol[data-list="ordered"] {
            padding-left: 1.5em;
            list-style-type: decimal;
          }
          #${labelId} .ql-editor ul[data-list="bullet"] {
            padding-left: 1.5em;
            list-style-type: disc;
          }
          #${labelId} .ql-editor ul[data-list="check"] {
            padding-left: 1.5em;
            list-style-type: none;
          }
          #${labelId} .ql-editor ul[data-list="check"] > li::before {
            content: '☐ ';
            color: #6b7280;
            font-weight: bold;
          }
          #${labelId} .ql-editor li {
            margin-bottom: 0.25rem;
          }
          #${labelId} .ql-editor h1 { font-size: 2em; font-weight: bold; }
          #${labelId} .ql-editor h2 { font-size: 1.5em; font-weight: bold; }
          #${labelId} .ql-editor h3 { font-size: 1.17em; font-weight: bold; }
          #${labelId} .ql-editor blockquote {
            border-left: 4px solid #e5e7eb;
            margin: 1em 0;
            padding-left: 1em;
            color: #6b7280;
          }
          #${labelId} .ql-editor code {
            padding: 2px 4px;
            border-radius: 3px;
            font-family: 'Monaco', 'Consolas', monospace;
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
                [{ 'font': [] }], // font family
                [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
                ['bold', 'italic', 'underline', 'strike'], // toggled buttons
                [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
                [{ 'script': 'sub' }, { 'script': 'super' }], // superscript/subscript
                [{ 'header': 1 }, { 'header': 2 }, { 'header': 3 }], // custom button values
                ['blockquote', 'code-block'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }], // lists
                [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent
                [{ 'align': [] }], // text align
                [{ 'direction': 'rtl' }], // text direction
                ['link', 'image', 'video'], // link and image, video
                ['clean'] // remove formatting button
              ],
              clipboard: {
                // toggle to add extra line breaks when pasting HTML:
                matchVisual: false,
              }
            }
          }
          formats={[
            'header', 'font', 'size',
            'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
            'list', 'bullet', 'check', 'indent',
            'script', 'align', 'direction',
            'color', 'background',
            'link', 'image', 'video',
            'clean'
          ]}
        />
      </Suspense>
    </div>
  )
}