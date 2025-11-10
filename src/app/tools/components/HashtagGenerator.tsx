
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FancyAccordionButton } from './FancyAccordionButton';
import { Copy, Loader2, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateHashtags } from '@/ai/flows/hashtag-generator';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';

export function HashtagGenerator() {
  const [topic, setTopic] = useState('');
  const [language, setLanguage] = useState('English');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast({
        variant: 'destructive',
        title: 'Topic is required',
        description: 'Please enter a topic to generate hashtags.',
      });
      return;
    }
    setIsLoading(true);
    setHashtags([]);
    try {
      const result = await generateHashtags({ topic, language });
      setHashtags(result.hashtags);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to generate hashtags. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (tag: string) => {
    navigator.clipboard.writeText(`#${tag}`);
    toast({ title: `Copied #${tag} to clipboard!` });
  };

  return (
    <div className="w-full">
      <Card className="bg-card/50 dark:bg-card/20 backdrop-blur-sm border-border/50">
        <CardHeader className="items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary mb-4">
                <Wand2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold font-headline">AI Hashtag Generator</CardTitle>
            <p className="text-muted-foreground">Generate viral hashtags for your topic in any language.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-2">
                <Label htmlFor="topic">Topic or Keywords</Label>
                <Input
                    id="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., Pakistani food, web development, summer fashion"
                />
            </div>
             <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Input
                    id="language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    placeholder="e.g., English, Urdu"
                />
            </div>
          </div>
          <Button onClick={handleGenerate} disabled={isLoading} className="w-full" size="lg">
            <Wand2 className={`mr-2 h-5 w-5 ${isLoading ? 'animate-pulse' : ''}`} />
            {isLoading ? 'Generating Hashtags...' : 'Generate Hashtags'}
          </Button>

          {hashtags.length > 0 && (
            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-semibold text-center">Suggested Hashtags</h3>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {hashtags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="group cursor-pointer text-base"
                    onClick={() => handleCopy(tag)}
                  >
                    #{tag}
                    <Copy className="ml-2 h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Badge>
                ))}
              </div>
            </div>
          )}
           {isLoading && (
              <div className="flex items-center justify-center pt-4">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
                    <p>This AI-powered tool helps you find the perfect hashtags for your social media posts.</p>
                    <ol>
                        <li>Enter your main topic or a few keywords in the "Topic" field.</li>
                        <li>Specify the language you want the hashtags in (e.g., "English", "Urdu", "Punjabi", or a mix).</li>
                        <li>Click "Generate Hashtags" and let the AI work its magic.</li>
                        <li>The suggested hashtags will appear below. Simply click on any hashtag to copy it to your clipboard.</li>
                    </ol>
                    <p>It's ideal for marketers, content creators, and businesses in Pakistan looking to increase their reach on platforms like Instagram, Twitter (X), and Facebook.</p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>

    </div>
  );
}
