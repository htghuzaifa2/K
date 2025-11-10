
import { getBlogPostBySlug, getBlogPosts } from '@/lib/blog-data';
import { notFound } from 'next/navigation';
import { APP_NAME } from '@/lib/constants';
import Link from 'next/link';
import type { Metadata } from 'next';
import { CodeBlock } from '@/components/code-block';
import { Suspense } from 'react';
import { RelatedBlogs } from '../../components/RelatedBlogs';
import { Separator } from '@/components/ui/separator';

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

function parseContent(content: string) {
    const parts = content.split(/<pre><code class="language-(.*?)">([\s\S]*?)<\/code><\/pre>/g);
    const elements = [];
    for (let i = 0; i < parts.length; i++) {
        if (i % 3 === 0) {
            if (parts[i].trim()) {
                elements.push(<div key={`html-${i}`} dangerouslySetInnerHTML={{ __html: parts[i] }} />);
            }
        } else if (i % 3 === 1) {
            const lang = parts[i];
            const code = parts[i + 1];
            elements.push(
                <Suspense key={`code-${i}`} fallback={<div className="bg-muted rounded-md p-4">Loading code...</div>}>
                    <CodeBlock code={code} language={lang} />
                </Suspense>
            );
            i++; 
        }
    }
    return elements;
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <article className="prose dark:prose-invert mx-auto max-w-4xl">
                <Link href="/blogs" className="mb-8 inline-block text-primary no-underline hover:underline">&larr; Back to Blogs</Link>
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">{post.title}</h1>
                <p className="text-lg italic text-accent">by kimi.pk Team</p>
                <div>
                    {parseContent(post.content)}
                </div>
            </article>
        </div>
        <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <Separator className="my-12" />
            <RelatedBlogs currentBlogSlug={post.slug} />
        </div>
    </>
  );
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
