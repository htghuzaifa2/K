
import { getBlogPostBySlug } from '@/lib/blog-data';
import { getBlogPosts } from '@/lib/blog-data';
import { notFound } from 'next/navigation';
import { APP_NAME } from '@/lib/constants';
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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="prose dark:prose-invert mx-auto max-w-4xl">
            <Link href="/blogs" className="mb-8 inline-block text-primary no-underline hover:underline">&larr; Back to Blogs</Link>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{post.title}</h1>
            <p className="text-lg italic text-muted-foreground">by kimi.pk Team</p>
            <div 
                dangerouslySetInnerHTML={{ __html: post.content }} 
            />
        </article>
    </div>
  );
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
