'use client';

import Link from 'next/link';
import type { BlogPost } from '@/lib/blog-data';
import styles from '../styles/blogs.module.css';
import { Gift } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blogs/${post.slug}`} className={styles.card}>
      <Gift className={styles.cardIcon} />
      <h3 className={styles.cardTitle}>{post.title}</h3>
      <p className={styles.cardDescription}>{post.description}</p>
    </Link>
  );
}
