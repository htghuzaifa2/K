
'use client';

import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import styles from '../styles/tools.module.css';

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
      className={styles.searchInput}
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Search for tools..."
    />
  );
}
