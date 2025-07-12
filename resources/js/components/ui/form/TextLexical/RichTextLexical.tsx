import React, { useState } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { LexicalErrorBoundary as DefaultLexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { EditorState } from 'lexical';

// Define the props type for LexicalErrorBoundary to include onError
interface LexicalErrorBoundaryProps {
  children: React.ReactNode;
  onError: (error: Error) => void; // Required by Lexical's ErrorBoundaryType
}

// Error boundary class component compatible with Lexical
class LexicalErrorBoundary extends React.Component<LexicalErrorBoundaryProps, { hasError: boolean }> {
  constructor(props: LexicalErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Call the onError prop to handle the error as required by Lexical
    this.props.onError(error);
    // Optionally log the error for debugging
    // console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Une erreur est survenue dans l’éditeur.</div>;
    }
    return this.props.children;
  }
}

const theme = {
  ltr: 'ltr',
  rtl: 'rtl',
  paragraph: 'editor-paragraph',
  quote: 'editor-quote',
  heading: {
    h1: 'editor-heading-h1',
    h2: 'editor-heading-h2',
    h3: 'editor-heading-h3',
    h4: 'editor-heading-h4',
    h5: 'editor-heading-h5',
    h6: 'editor-heading-h6',
  },
  list: {
    nested: {
      listitem: 'editor-nested-listitem',
    },
    ol: 'editor-list-ol',
    ul: 'editor-list-ul',
    listitem: 'editor-listItem',
    listitemChecked: 'editor-listItemChecked',
    listitemUnchecked: 'editor-listItemUnchecked',
  },
  hashtag: 'editor-hashtag',
  image: 'editor-image',
  link: 'editor-link',
  text: {
    bold: 'editor-textBold',
    code: 'editor-textCode',
    italic: 'editor-textItalic',
    strikethrough: 'editor-textStrikethrough',
    subscript: 'editor-textSubscript',
    superscript: 'editor-textSuperscript',
    underline: 'editor-textUnderline',
    underlineStrikethrough: 'editor-textUnderlineStrikethrough',
  },
  code: 'editor-code',
  codeHighlight: {
    atrule: 'editor-tokenAttr',
    attr: 'editor-tokenAttr',
    boolean: 'editor-tokenProperty',
    builtin: 'editor-tokenSelector',
    cdata: 'editor-tokenComment',
    char: 'editor-tokenSelector',
    class: 'editor-tokenFunction',
    'class-name': 'editor-tokenFunction',
    comment: 'editor-tokenComment',
    constant: 'editor-tokenProperty',
    deleted: 'editor-tokenProperty',
    doctype: 'editor-tokenComment',
    entity: 'editor-tokenOperator',
    function: 'editor-tokenFunction',
    important: 'editor-tokenVariable',
    inserted: 'editor-tokenSelector',
    keyword: 'editor-tokenAttr',
    namespace: 'editor-tokenVariable',
    number: 'editor-tokenProperty',
    operator: 'editor-tokenOperator',
    prolog: 'editor-tokenComment',
    property: 'editor-tokenProperty',
    punctuation: 'editor-tokenPunctuation',
    regex: 'editor-tokenVariable',
    selector: 'editor-tokenSelector',
    string: 'editor-tokenSelector',
    symbol: 'editor-tokenProperty',
    tag: 'editor-tokenProperty',
    url: 'editor-tokenOperator',
    variable: 'editor-tokenVariable',
  },
};

interface RichTextLexicalProps {
  label: string;
  labelId: string;
  value: string;
  setData: (value: string) => void;
  className?: string;
}

export default function RichTextLexical({
  label,
  labelId,
  value,
  setData,
  className = 'min-h-[200px] max-h-[300px] h-fit w-full overflow-y-auto',
}: RichTextLexicalProps) {
  // Configuration initiale de Lexical
  const initialConfig = {
    namespace: 'MyEditor',
    onError: (error: Error) => console.error(error),
    editorState: value ? value : null,
    theme: theme
  };

  // Gérer les changements dans l'éditeur
  const onChange = (editorState: EditorState) => {
    editorState.read(() => {
      // Convertir l'état de l'éditeur en chaîne JSON ou HTML selon vos besoins
      const jsonString = JSON.stringify(editorState);
      setData(jsonString);
    });
  };

  return (
    <div className="w-full">
      <label htmlFor={labelId} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <LexicalComposer initialConfig={initialConfig}>
        <div className="relative border border-gray-300 rounded-lg shadow-sm">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                id={labelId}
                className={`p-4 ${className} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            }
            placeholder={
              <div className="absolute top-4 left-4 text-gray-400 pointer-events-none">
                Écrivez ici...
              </div>
            }
            ErrorBoundary={DefaultLexicalErrorBoundary}
          />
          <HistoryPlugin />
          <OnChangePlugin onChange={onChange} />
        </div>
      </LexicalComposer>
    </div>
  );
}