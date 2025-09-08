import { lazy, Suspense, useMemo } from 'react'

const ReactQuill = lazy(() => import('react-quill-new'));

interface AdvancedRichTextEditorProps {
    label?: string;
    labelId: string;
    value: string;
    onChange: (value: string) => void;
    className?: string;
    placeholder?: string;
    readOnly?: boolean;
    theme?: 'snow' | 'bubble';
    height?: string;
}

export default function AdvancedRichTextEditor({ 
    label, 
    labelId, 
    value, 
    onChange, 
    className = 'min-h-[200px] max-h-[400px] h-fit w-full',
    placeholder = 'Commencez à écrire...',
    readOnly = false,
    theme = 'snow',
    height = '200px'
}: AdvancedRichTextEditorProps) {

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [{ 'font': [] }, { 'size': ['small', false, 'large', 'huge'] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'script': 'sub' }, { 'script': 'super' }],
                ['blockquote', 'code-block'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
                [{ 'indent': '-1' }, { 'indent': '+1' }],
                [{ 'align': [] }],
                [{ 'direction': 'rtl' }],
                ['link', 'image', 'video'],
                ['clean']
            ],
        },
        clipboard: {
            matchVisual: false,
        },
        history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false
        }
    }), []);

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
        'list', 'bullet', 'check', 'indent',
        'script', 'align', 'direction',
        'color', 'background',
        'link', 'image', 'video',
        'clean'
    ];

    return (
        <div className="w-full">
            {label && (
                <label htmlFor={labelId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {label}
                </label>
            )}
            <style>
                {`
                    #${labelId} {
                        border-radius: 8px;
                        overflow: hidden;
                        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
                    }
                    #${labelId} .ql-container {
                        min-height: ${height};
                        height: fit-content;
                        border: 1px solid #d1d5db;
                        border-top: none;
                        border-radius: 0 0 8px 8px;
                        font-family: 'Inter', sans-serif;
                    }
                    #${labelId} .ql-editor {
                        min-height: ${height};
                        height: fit-content;
                        font-size: 14px;
                        line-height: 1.6;
                        padding: 16px;
                    }
                    #${labelId} .ql-toolbar {
                        border: 1px solid #d1d5db;
                        border-bottom: none;
                        border-radius: 8px 8px 0 0;
                        background: linear-gradient(to bottom, #ffffff, #f9fafb);
                        padding: 8px 12px;
                    }
                    #${labelId} .ql-toolbar .ql-formats {
                        margin-right: 15px;
                    }
                    #${labelId} .ql-toolbar button {
                        padding: 4px 6px;
                        border-radius: 4px;
                        transition: all 0.2s;
                    }
                    #${labelId} .ql-toolbar button:hover {
                        background-color: #e5e7eb;
                    }
                    #${labelId} .ql-toolbar button.ql-active {
                        background-color: #3b82f6;
                        color: white;
                    }
                    
                    /* Liste numérotée */
                    #${labelId} .ql-editor ol[data-list="ordered"] {
                        padding-left: 2em;
                        list-style-type: decimal;
                    }
                    #${labelId} .ql-editor ol[data-list="ordered"] > li {
                        margin-bottom: 0.5rem;
                    }
                    
                    /* Liste à puces */
                    #${labelId} .ql-editor ul[data-list="bullet"] {
                        padding-left: 2em;
                        list-style-type: disc;
                    }
                    #${labelId} .ql-editor ul[data-list="bullet"] > li {
                        margin-bottom: 0.5rem;
                    }
                    
                    /* Liste de contrôle */
                    #${labelId} .ql-editor ul[data-list="check"] {
                        padding-left: 2em;
                        list-style-type: none;
                    }
                    #${labelId} .ql-editor ul[data-list="check"] > li {
                        margin-bottom: 0.5rem;
                        position: relative;
                        padding-left: 0.5rem;
                    }
                    #${labelId} .ql-editor ul[data-list="check"] > li::before {
                        content: "☐";
                        position: absolute;
                        left: -1.5em;
                        font-size: 16px;
                        color: #9ca3af;
                        cursor: pointer;
                    }
                    #${labelId} .ql-editor ul[data-list="check"] > li.ql-checked::before {
                        content: "☑";
                        color: #10b981;
                    }
                    
                    /* Titres */
                    #${labelId} .ql-editor h1 { 
                        font-size: 2.25em; 
                        font-weight: 700; 
                        margin: 1rem 0 0.5rem 0;
                        color: #111827;
                        border-bottom: 2px solid #e5e7eb;
                        padding-bottom: 0.5rem;
                    }
                    #${labelId} .ql-editor h2 { 
                        font-size: 1.875em; 
                        font-weight: 600; 
                        margin: 1rem 0 0.5rem 0;
                        color: #1f2937;
                    }
                    #${labelId} .ql-editor h3 { 
                        font-size: 1.5em; 
                        font-weight: 600; 
                        margin: 0.75rem 0 0.5rem 0;
                        color: #374151;
                    }
                    #${labelId} .ql-editor h4 { 
                        font-size: 1.25em; 
                        font-weight: 500; 
                        margin: 0.75rem 0 0.25rem 0;
                        color: #4b5563;
                    }
                    
                    /* Citation */
                    #${labelId} .ql-editor blockquote {
                        border-left: 4px solid #3b82f6;
                        margin: 1.5em 0;
                        padding: 1em 1.5em;
                        background-color: #f8fafc;
                        color: #475569;
                        font-style: italic;
                        border-radius: 0 8px 8px 0;
                    }
                    
                    /* Code */
                    #${labelId} .ql-editor code {
                        background-color: #f1f5f9;
                        padding: 2px 6px;
                        border-radius: 4px;
                        font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
                        font-size: 0.875em;
                        color: #e11d48;
                    }
                    
                    /* Bloc de code */
                    #${labelId} .ql-editor .ql-code-block-container {
                        background-color: #1e293b;
                        border-radius: 8px;
                        margin: 1em 0;
                        padding: 1em;
                        overflow-x: auto;
                    }
                    #${labelId} .ql-editor .ql-code-block {
                        background-color: transparent;
                        color: #e2e8f0;
                        font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
                        font-size: 0.875em;
                        line-height: 1.6;
                        white-space: pre;
                    }
                    
                    /* Liens */
                    #${labelId} .ql-editor a {
                        color: #3b82f6;
                        text-decoration: underline;
                        transition: color 0.2s;
                    }
                    #${labelId} .ql-editor a:hover {
                        color: #1d4ed8;
                    }
                    
                    /* Images */
                    #${labelId} .ql-editor img {
                        border-radius: 8px;
                        max-width: 100%;
                        height: auto;
                        margin: 1em 0;
                        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                    }
                    
                    /* Mode clair par défaut */
                    #${labelId} .ql-container {
                        background-color: #ffffff;
                        color: #374151;
                    }
                    #${labelId} .ql-editor {
                        background-color: #ffffff;
                        color: #374151;
                    }
                    #${labelId} .ql-toolbar {
                        background: linear-gradient(to bottom, #ffffff, #f9fafb);
                        border-color: #d1d5db;
                        color: #374151;
                    }
                    #${labelId} .ql-editor h1,
                    #${labelId} .ql-editor h2,
                    #${labelId} .ql-editor h3,
                    #${labelId} .ql-editor h4 {
                        color: #111827;
                    }
                    #${labelId} .ql-editor ol > li::before {
                        color: #374151;
                    }
                    #${labelId} .ql-editor ul > li::before {
                        color: #6b7280;
                    }
                    #${labelId} .ql-editor a {
                        color: #3b82f6;
                    }
                    #${labelId} .ql-editor blockquote {
                        color: #475569;
                    }
                    #${labelId} .ql-editor code {
                        background-color: #f1f5f9;
                        color: #e11d48;
                    }
                    
                    /* Mode sombre avec classe dark sur html - priorité plus haute */
                    :is(html.dark, .dark) #${labelId} .ql-toolbar {
                        background: linear-gradient(to bottom, #374151, #4b5563) !important;
                        border-color: #6b7280 !important;
                        color: #f3f4f6 !important;
                    }
                    :is(html.dark, .dark) #${labelId} .ql-container {
                        border-color: #6b7280 !important;
                        background-color: #1f2937 !important;
                        color: #f3f4f6 !important;
                    }
                    :is(html.dark, .dark) #${labelId} .ql-editor {
                        background-color: #1f2937 !important;
                        color: #f3f4f6 !important;
                    }
                    :is(html.dark, .dark) #${labelId} .ql-editor h1,
                    :is(html.dark, .dark) #${labelId} .ql-editor h2,
                    :is(html.dark, .dark) #${labelId} .ql-editor h3,
                    :is(html.dark, .dark) #${labelId} .ql-editor h4 {
                        color: #f9fafb !important;
                    }
                    :is(html.dark, .dark) #${labelId} .ql-editor ol > li::before {
                        color: #f3f4f6 !important;
                    }
                    :is(html.dark, .dark) #${labelId} .ql-editor ul > li::before {
                        color: #9ca3af !important;
                    }
                    :is(html.dark, .dark) #${labelId} .ql-editor a {
                        color: #60a5fa !important;
                    }
                    :is(html.dark, .dark) #${labelId} .ql-editor a:hover {
                        color: #93c5fd !important;
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
                    :is(html.dark, .dark) #${labelId} .ql-editor .ql-code-block-container {
                        background-color: #111827 !important;
                    }
                    :is(html.dark, .dark) #${labelId} .ql-editor .ql-code-block {
                        color: #e2e8f0 !important;
                    }
                    
                    /* Fallback pour une meilleure compatibilité */
                    html.dark #${labelId} .ql-editor,
                    .dark #${labelId} .ql-editor {
                        background-color: #1f2937 !important;
                        color: #f3f4f6 !important;
                    }
                `}
            </style>
            <Suspense fallback={
                <div className="flex items-center justify-center p-8 border border-gray-300 rounded-lg">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    <span className="ml-2 text-gray-600">Chargement de l'éditeur...</span>
                </div>
            }>
                <ReactQuill
                    id={labelId}
                    theme={theme}
                    value={value}
                    onChange={onChange}
                    modules={modules}
                    formats={formats}
                    className={className}
                    placeholder={placeholder}
                    readOnly={readOnly}
                />
            </Suspense>
        </div>
    )
}