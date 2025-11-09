
'use client';

import { getBlogPostBySlug } from '@/lib/blog-data';
import { notFound } from 'next/navigation';
import { APP_NAME } from '@/lib/constants';
import styles from '../../styles/blogs.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { BlogPost } from '@/lib/blog-data';

type Props = {
  params: { slug: string };
};

function BlogPostSkeleton() {
    return (
        <article className={styles.article}>
            <div className="animate-pulse">
                <div className="h-4 bg-muted rounded w-1/4 mb-8"></div>
                <div className="h-10 bg-muted rounded w-3/4 mb-8"></div>
                <div className="space-y-4">
                    <div className="h-6 bg-muted rounded w-full"></div>
                    <div className="h-6 bg-muted rounded w-full"></div>
                    <div className="h-6 bg-muted rounded w-5/6"></div>
                </div>
            </div>
        </article>
    );
}

export default function BlogPostPage({ params }: Props) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundPost = getBlogPostBySlug(params.slug);
    if (!foundPost) {
      notFound();
    } else {
      setPost(foundPost);
      
      // Update metadata on the client
      document.title = `${foundPost.title} - ${APP_NAME}`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', foundPost.description);
      }

      setLoading(false);
    }
  }, [params.slug]);


  if (loading || !post) {
    return <BlogPostSkeleton />;
  }

  return (
    <article className={styles.article}>
      <Link href="/blogs" className={styles.backLink}>&larr; Back to Blogs</Link>
      <h1 className={styles.articleTitle}>{post.title}</h1>
      <div 
        className={styles.articleContent}
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />
    </article>
  );
}
