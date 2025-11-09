
'use client';

import Link from 'next/link';
import type { BlogPost } from '@/lib/blog-data';
import styles from '../styles/blogs.module.css';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blogs/${post.slug}`} className={styles.card}>
      <h3 className={styles.cardTitle}>{post.title}</h3>
    </Link>
  );
}
