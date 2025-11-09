'use client';

import Link from 'next/link';
import type { Tool } from '@/lib/tool-data';
import styles from '../styles/tools.module.css';
import { Gift } from 'lucide-react';

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link href={`/tools/${tool.slug}`} className={styles.card}>
      <Gift className={styles.cardIcon} />
      <h3 className={styles.cardTitle}>{tool.title}</h3>
      <p className={styles.cardDescription}>A useful tool for your needs.</p>
    </Link>
  );
}
