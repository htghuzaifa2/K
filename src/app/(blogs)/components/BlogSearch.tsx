
'use client';

import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import styles from '../styles/blogs.module.css';

interface BlogSearchProps {
  onSearch: (query: string) => void;
}

export default function BlogSearch({ onSearch }: BlogSearchProps) {
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
      placeholder="Search for posts..."
    />
  );
}
