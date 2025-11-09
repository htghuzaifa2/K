'use client';

import Link from 'next/link';
import type { Tool } from '@/lib/tool-data';
import styles from '../styles/tools.module.css';

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link href={`/tools/${tool.slug}`} className={styles.card}>
      <h3 className={styles.cardTitle}>{tool.title}</h3>
    </Link>
  );
}
