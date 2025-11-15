
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FancyAccordionButton } from './FancyAccordionButton';
import { Copy, Loader2, Youtube } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateYouTubeSeo, type YouTubeSeoOutput } from '@/ai/flows/youtube-seo-generator';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

function SeoResultSection({ title, content, onCopy, isList = false }: { title: string; content: string | string[]; onCopy: (text: string) => void; isList?: boolean }) {
    if (!content || (Array.isArray(content) && content.length === 0)) return null;

    const handleCopy = () => {
        const textToCopy = Array.isArray(content) ? content.join(', ') : content;
        onCopy(textToCopy);
    };

    return (
        <div className="space-y-3">
            <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">{title}</h3>
                <Button variant="ghost" size="sm" onClick={handleCopy}>
                    <Copy className="mr-2 h-4 w-4" /> Copy All
                </Button>
            </div>
            {isList ? (
                <div className="flex flex-wrap gap-2">
                    {(content as string[]).map((item, index) => (
                        <Badge
                            key={index}
                            variant="outline"
                            className="group cursor-pointer text-sm"
                            onClick={() => onCopy(item)}
                        >
                            {item}
                            <Copy className="ml-2 h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Badge>
                    ))}
                </div>
            ) : (
                <Textarea
                    readOnly
                    value={content as string}
                    rows={8}
                    className="bg-background/50 whitespace-pre-wrap"
                />
            )}
        </div>
    );
}

export function YouTubeSeoGenerator() {
  const [topic, setTopic] = useState('');
  const [language, setLanguage] = useState('English');
  const [seoResult, setSeoResult] = useState<YouTubeSeoOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast({
        variant: 'destructive',
        title: 'Video topic is required',
        description: 'Please describe your video to generate SEO content.',
      });
      return;
    }
    setIsLoading(true);
    setSeoResult(null);
    try {
      const result = await generateYouTubeSeo({ topic, language });
      setSeoResult(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to generate SEO content. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: `Copied to clipboard!` });
  };

  return (
    <div className="w-full">
      <Card className="bg-card/50 dark:bg-card/20 backdrop-blur-sm border-border/50">
        <CardHeader className="items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary mb-4">
                <Youtube className="h-6 w-6 text-primary-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold font-headline">YouTube SEO Generator</CardTitle>
            <p className="text-muted-foreground">Get AI-powered titles, descriptions, and tags for your videos.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-2">
                <Label htmlFor="topic">Video Topic or Description</Label>
                <Input
                    id="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., 'how to build a quiet PC in Pakistan'"
                />
            </div>
             <div className="space-y-2">
                <Label htmlFor="language">Audience Language</Label>
                <Input
                    id="language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    placeholder="e.g., English, Urdu"
                />
            </div>
          </div>
          <Button onClick={handleGenerate} disabled={isLoading} className="w-full" size="lg">
            <Youtube className={`mr-2 h-5 w-5 ${isLoading ? 'animate-pulse' : ''}`} />
            {isLoading ? 'Generating SEO Content...' : 'Generate SEO Content'}
          </Button>

          {isLoading ? (
              <div className="flex items-center justify-center pt-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
           ) : seoResult && (
            <div className="space-y-8 pt-6 border-t">
                <SeoResultSection title="Suggested Titles" content={seoResult.titles} onCopy={handleCopy} isList />
                <SeoResultSection title="Generated Description" content={seoResult.description} onCopy={handleCopy} />
                <SeoResultSection title="Suggested Tags" content={seoResult.tags} onCopy={handleCopy} isList />
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
                    <p>This AI-powered tool helps you create SEO-friendly titles, descriptions, and tags for your YouTube videos to improve their visibility.</p>
                    <ol>
                        <li>Enter your video topic or a short description in the main input field.</li>
                        <li>Specify the primary language of your target audience (e.g., "Urdu" or "English").</li>
                        <li>Click "Generate SEO Content."</li>
                        <li>The AI will generate a list of catchy titles, a well-structured description, and a set of relevant tags.</li>
                        <li>You can click on individual titles or tags to copy them, or use the "Copy All" button for each section.</li>
                    </ol>
                    <p>It's an essential tool for content creators in Pakistan who want to rank higher in YouTube and Google search results.</p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
