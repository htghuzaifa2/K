
'use client';

import { useEffect, useState } from 'react';
import { getBlogPosts, type BlogPost } from '@/lib/blog-data';
import BlogCard from './BlogCard';
import { Skeleton } from '@/components/ui/skeleton';

interface RelatedBlogsProps {
  currentBlogSlug: string;
}

const RECOMMENDATION_COUNT = 4;

function shuffle(array: any[]) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

export function RelatedBlogs({ currentBlogSlug }: RelatedBlogsProps) {
    const [relatedBlogs, setRelatedBlogs] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const allBlogs = getBlogPosts();
        const otherBlogs = allBlogs.filter(p => p.slug !== currentBlogSlug);
        const shuffled = shuffle(otherBlogs);
        setRelatedBlogs(shuffled.slice(0, RECOMMENDATION_COUNT));
        setIsLoading(false);
    }, [currentBlogSlug]);

    if (isLoading) {
        return (
             <div>
                <h2 className="mb-6 text-center text-3xl font-bold tracking-tight font-headline">You May Also Like</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="flex flex-col space-y-3">
                            <Skeleton className="aspect-video w-full rounded-xl" />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    if (relatedBlogs.length === 0) {
        return null;
    }

    return (
        <div>
            <h2 className="mb-6 text-center text-3xl font-bold tracking-tight font-headline">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {relatedBlogs.map((blog) => (
                    <BlogCard key={blog.slug} post={blog} />
                ))}
            </div>
        </div>
    );
}
