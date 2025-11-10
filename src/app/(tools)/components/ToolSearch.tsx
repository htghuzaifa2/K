
'use client';

import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';

interface ToolSearchProps {
  onSearch: (query: string) => void;
}

export default function ToolSearch({ onSearch }: ToolSearchProps) {
  const [text, setText] = useState('');
  const [debouncedText] = useDebounce(text, 300);

  useEffect(() => {
    onSearch(debouncedText);
  }, [debouncedText, onSearch]);

  return (
    <input
      className="mx-auto block w-full max-w-lg rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Search for tools by title..."
    />
  );
}
