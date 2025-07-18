import * as React from 'react';
import { cn } from '@/lib/utils';

interface InputFileProps extends React.InputHTMLAttributes<HTMLInputElement> {
  multiple?: boolean;
  onFilesChange?: (files: FileList | null) => void;
}

export function InputFile({
    className,
    multiple = false,
    onFilesChange,
    id: propId,
    ...props
}: InputFileProps) {
    const [dragActive, setDragActive] = React.useState(false);
    const [previews, setPreviews] = React.useState<{ src: string; type: string }[]>([]);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const id = propId ?? React.useId();

  const handleFiles = (files: FileList | null) => {
    if (onFilesChange) onFilesChange(files);
    if (files) {
      const previews = Array.from(files).map((file) => ({
        src: URL.createObjectURL(file),
        type: file.type,
      }));
      setPreviews(previews);
    } else {
      setPreviews([]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragActive(false);
  };


  return (
    <div>
      <label
        htmlFor={id}
        className={cn(
          'flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200 p-6 bg-white dark:bg-gray-900',
          dragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' : 'border-gray-300',
          className
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {previews.length === 0 && (
          <>
            <svg className="w-10 h-10 mb-2 text-blue-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-8m0 0-3.5 3.5M12 8l3.5 3.5M21 16.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2.5M16.5 12.5 12 8l-4.5 4.5" />
            </svg>
            <span className="text-base font-medium text-gray-700 dark:text-gray-200">
              Glissez-déposez {multiple ? 'des fichiers' : 'un fichier'} ici ou cliquez pour sélectionner
            </span>
          </>
        )}
        {previews.length > 0 && (
          <div className="flex flex-wrap gap-4 w-full justify-center">
            {previews.map((file, idx) => (
              file.type.startsWith('video') ? (
                <video key={idx} src={file.src} className="max-h-40 w-full object-cover rounded" controls />
              ) : (
                <img key={idx} src={file.src} alt={`preview-${idx}`} className="max-h-40 w-full object-cover rounded" />
              )
            ))}
          </div>
        )}
        <input
          id={id}
          ref={inputRef}
          type="file"
          accept={props.accept || 'image/*'}
          multiple={multiple}
          className="hidden"
          onChange={handleChange}
          {...props}
        />
      </label>
    </div>
  );
}