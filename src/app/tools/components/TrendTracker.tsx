
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FancyAccordionButton } from './FancyAccordionButton';
import { Loader2, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getTrendingTopics, type TrendTrackerOutput } from '@/ai/flows/trend-tracker';
import { Label } from '@/components/ui/label';

interface Trend {
    topic: string;
    description: string;
}

function TrendCategory({ title, trends }: { title: string; trends: Trend[] }) {
    if (!trends || trends.length === 0) return null;

    return (
        <div className="space-y-4">
            <h3 className="font-semibold text-xl text-primary">{title}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {trends.map((trend, index) => (
                    <Card key={index} className="bg-background/50">
                        <CardHeader className="p-4">
                            <CardTitle className="text-base font-bold">{trend.topic}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <p className="text-sm text-muted-foreground">{trend.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export function TrendTracker() {
  const [location, setLocation] = useState('');
  const [trends, setTrends] = useState<TrendTrackerOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFetchTrends = async () => {
    setIsLoading(true);
    setTrends(null);
    try {
      const result = await getTrendingTopics({ location });
      setTrends(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to fetch trending topics. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Card className="bg-card/50 dark:bg-card/20 backdrop-blur-sm border-border/50">
        <CardHeader className="items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary mb-4">
                <TrendingUp className="h-6 w-6 text-primary-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold font-headline">Pakistan Trend Tracker</CardTitle>
            <p className="text-muted-foreground">Discover what's trending in Pakistan right now.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="md:col-span-2 space-y-2">
                <Label htmlFor="location">City (Optional)</Label>
                <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., Karachi, Lahore"
                />
            </div>
            <Button onClick={handleFetchTrends} disabled={isLoading} className="w-full" size="lg">
                <TrendingUp className={`mr-2 h-5 w-5 ${isLoading ? 'animate-pulse' : ''}`} />
                {isLoading ? 'Fetching Trends...' : 'Fetch Trends'}
            </Button>
          </div>

          {trends && (
            <div className="space-y-8 pt-6 border-t">
                <TrendCategory title="News & Current Affairs" trends={trends.news} />
                <TrendCategory title="Technology" trends={trends.tech} />
                <TrendCategory title="Entertainment" trends={trends.entertainment} />
                <TrendCategory title="Sports" trends={trends.sports} />
            </div>
          )}
           {isLoading && (
              <div className="flex flex-col items-center justify-center pt-8 text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="mt-2 text-muted-foreground">Analyzing trends for you...</p>
              </div>
           )}

        </CardContent>
      </Card>
      
      <div className="mt-6">
        <Accordion type="single" collapsible>
            <AccordionItem value="guide" className="border-none">
                <AccordionTrigger className="p-0 hover:no-underline [&>svg]:hidden">
                    <FancyAccordionButton />
                </AccordionTrigger>
                <AccordionContent className="mt-2 p-6 rounded-lg bg-card/50 dark:bg-card/20 prose dark:prose-invert max-w-none text-sm">
                    <p>This AI-powered tool helps you discover what topics are currently trending across Pakistan, perfect for content creators, marketers, and curious minds.</p>
                    <ol>
                        <li>Optionally, enter a city name (like "Lahore" or "Karachi") to get trends specific to that location. Leave it blank for nationwide trends.</li>
                        <li>Click the "Fetch Trends" button.</li>
                        <li>The AI will analyze current data and present a list of trending topics organized by category: News, Tech, Entertainment, and Sports.</li>
                        <li>Use these insights to create relevant blog posts, social media content, or marketing campaigns.</li>
                    </ol>
                    <p>It's a quick way to tap into the pulse of the Pakistani internet and understand what people are talking about right now.</p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>

    </div>
  );
}
