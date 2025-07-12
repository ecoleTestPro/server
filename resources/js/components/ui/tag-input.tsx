import { X } from 'lucide-react';
import { useState } from 'react';
import { Input } from './input';
import { Button } from './button/button';

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

export default function TagInput({ tags, onChange, placeholder }: TagInputProps) {
  const [value, setValue] = useState('');

  const addTag = () => {
    const newTag = value.trim();
    if (newTag && !tags.includes(newTag)) {
      onChange([...tags, newTag]);
    }
    setValue('');
  };

  const removeTag = (tag: string) => {
    onChange(tags.filter((t) => t !== tag));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || 'Ajouter un tag'}
        />
        <Button type="button" variant="secondary" onClick={addTag}>
          Ajouter
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags && tags.length > 0 && tags?.map((tag) => (
          <span
            key={tag}
            className="bg-gray-200 dark:bg-gray-700 text-sm px-2 py-1 rounded-full flex items-center"
          >
            {tag}
            <X className="ml-1 h-4 w-4 cursor-pointer" onClick={() => removeTag(tag)} />
          </span>
        ))}
      </div>
    </div>
  );
}

