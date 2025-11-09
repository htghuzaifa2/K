
import { getBlogPostBySlug, getBlogPosts, getDummyPostContent } from '@/lib/blog-data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';
import styles from '../../styles/blogs.module.css';
import Link from 'next/link';

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
    description: `Read the blog post: ${post.title}`,
    openGraph: {
        title: post.title,
        description: `Read the blog post: ${post.title}`,
        type: 'article',
    }
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }
  
  const postContent = getDummyPostContent(post.title);

  return (
    <article className={styles.article}>
      <Link href="/blogs" className={styles.backLink}>&larr; Back to Blogs</Link>
      <h1 className={styles.articleTitle}>{post.title}</h1>
      <div 
        className={styles.articleContent}
        dangerouslySetInnerHTML={{ __html: postContent }} 
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
