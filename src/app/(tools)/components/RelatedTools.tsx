
'use client';

import { useEffect, useState } from 'react';
import { getTools, type Tool } from '@/lib/tool-data';
import ToolCard from './ToolCard';
import { Skeleton } from '@/components/ui/skeleton';

interface RelatedToolsProps {
  currentToolSlug: string;
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

export function RelatedTools({ currentToolSlug }: RelatedToolsProps) {
    const [relatedTools, setRelatedTools] = useState<Tool[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const allTools = getTools();
        const otherTools = allTools.filter(p => p.slug !== currentToolSlug);
        const shuffled = shuffle(otherTools);
        setRelatedTools(shuffled.slice(0, RECOMMENDATION_COUNT));
        setIsLoading(false);
    }, [currentToolSlug]);

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

    if (relatedTools.length === 0) {
        return null;
    }

    return (
        <div>
            <h2 className="mb-6 text-center text-3xl font-bold tracking-tight font-headline">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {relatedTools.map((tool) => (
                    <ToolCard key={tool.slug} tool={tool} />
                ))}
            </div>
        </div>
    );
}
