
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FancyAccordionButton } from './FancyAccordionButton';
import { Copy, Loader2, Search, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateSeoKeywords, type SeoKeywordGeneratorOutput } from '@/ai/flows/seo-keyword-generator';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';

function KeywordCategory({ title, keywords, onCopy }: { title: string; keywords: string[]; onCopy: (tag: string) => void; }) {
    if (!keywords || keywords.length === 0) return null;

    return (
        <div className="space-y-3">
            <h3 className="font-semibold">{title}</h3>
            <div className="flex flex-wrap gap-2">
                {keywords.map((keyword, index) => (
                    <Badge
                        key={index}
                        variant="outline"
                        className="group cursor-pointer text-sm"
                        onClick={() => onCopy(keyword)}
                    >
                        {keyword}
                        <Copy className="ml-2 h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Badge>
                ))}
            </div>
        </div>
    );
}

export function SeoKeywordGenerator() {
  const [seedKeyword, setSeedKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [keywordIdeas, setKeywordIdeas] = useState<SeoKeywordGeneratorOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!seedKeyword.trim()) {
      toast({
        variant: 'destructive',
        title: 'Seed keyword is required',
        description: 'Please enter a topic to generate keyword ideas.',
      });
      return;
    }
    setIsLoading(true);
    setKeywordIdeas(null);
    try {
      const result = await generateSeoKeywords({ seedKeyword, location });
      setKeywordIdeas(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to generate keyword ideas. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (keyword: string) => {
    navigator.clipboard.writeText(keyword);
    toast({ title: `Copied "${keyword}" to clipboard!` });
  };

  return (
    <div className="w-full">
      <Card className="bg-card/50 dark:bg-card/20 backdrop-blur-sm border-border/50">
        <CardHeader className="items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary mb-4">
                <Search className="h-6 w-6 text-primary-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold font-headline">Local SEO Keyword Generator</CardTitle>
            <p className="text-muted-foreground">Get keyword ideas optimized for the Pakistani market.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-2">
                <Label htmlFor="seed-keyword">Seed Keyword</Label>
                <Input
                    id="seed-keyword"
                    value={seedKeyword}
                    onChange={(e) => setSeedKeyword(e.target.value)}
                    placeholder="e.g., best biryani, freelance developer"
                />
            </div>
             <div className="space-y-2">
                <Label htmlFor="location">Location (Optional)</Label>
                <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., Karachi, Lahore"
                />
            </div>
          </div>
          <Button onClick={handleGenerate} disabled={isLoading} className="w-full" size="lg">
            <Wand2 className={`mr-2 h-5 w-5 ${isLoading ? 'animate-pulse' : ''}`} />
            {isLoading ? 'Generating Ideas...' : 'Generate Keyword Ideas'}
          </Button>

          {keywordIdeas && (
            <div className="space-y-6 pt-4 border-t">
                <KeywordCategory title="Long-Tail Keywords" keywords={keywordIdeas.longTailKeywords} onCopy={handleCopy} />
                <KeywordCategory title="Question Keywords" keywords={keywordIdeas.questionKeywords} onCopy={handleCopy} />
                <KeywordCategory title="Roman Urdu Keywords" keywords={keywordIdeas.romanUrduKeywords} onCopy={handleCopy} />
                <KeywordCategory title="Urdu Keywords" keywords={keywordIdeas.urduKeywords} onCopy={handleCopy} />
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
                    <p>This AI-powered tool helps you discover valuable SEO keywords tailored for the Pakistani audience.</p>
                    <ol>
                        <li>Enter your main topic or "seed keyword" (e.g., "digital marketing").</li>
                        <li>Optionally, add a location like "Karachi" to get locally-focused ideas.</li>
                        <li>Click "Generate Keyword Ideas" and the AI will provide lists of keywords.</li>
                        <li>You'll get long-tail variations, common questions, Roman-Urdu slang, and pure Urdu script keywords.</li>
                        <li>Click on any keyword to instantly copy it to your clipboard.</li>
                    </ol>
                    <p>It's an essential tool for marketers, bloggers, and business owners in Pakistan wanting to improve their Google search ranking.</p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>

    </div>
  );
}
