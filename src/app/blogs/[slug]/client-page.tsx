
'use client';
import Link from 'next/link';
import { Suspense } from 'react';
import { CodeBlock } from '@/components/code-block';
import type { BlogPostWithContent } from '@/lib/blog-data';

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


export function BlogPostClientPage({ post }: { post: BlogPostWithContent }) {
  return (
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
  );
}
