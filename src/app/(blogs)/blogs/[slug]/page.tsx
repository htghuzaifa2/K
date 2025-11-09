
import { getBlogPostBySlug } from '@/lib/blog-data-client';
import { getBlogPosts } from '@/lib/blog-data';
import { notFound } from 'next/navigation';
import { APP_NAME } from '@/lib/constants';
import styles from '../../styles/blogs.module.css';
import Link from 'next/link';
import type { Metadata } from 'next';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: `Not Found - ${APP_NAME}`,
    };
  }

  return {
    title: `${post.title} - ${APP_NAME}`,
    description: post.description,
  };
}


export default function BlogPostPage({ params }: Props) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
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

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
