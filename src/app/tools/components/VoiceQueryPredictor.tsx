
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FancyAccordionButton } from './FancyAccordionButton';
import { Copy, Loader2, AudioWaveform } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { predictVoiceQueries } from '@/ai/flows/voice-query-predictor';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Language = 'English' | 'Urdu/Roman-Urdu';

export function VoiceQueryPredictor() {
  const [keyword, setKeyword] = useState('');
  const [language, setLanguage] = useState<Language>('English');
  const [queries, setQueries] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!keyword.trim()) {
      toast({
        variant: 'destructive',
        title: 'Keyword is required',
        description: 'Please enter a keyword to generate voice queries.',
      });
      return;
    }
    setIsLoading(true);
    setQueries([]);
    try {
      const result = await predictVoiceQueries({ keyword, language });
      setQueries(result.queries);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to generate voice queries. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (query: string) => {
    navigator.clipboard.writeText(query);
    toast({ title: `Copied query to clipboard!` });
  };

  return (
    <div className="w-full">
      <Card className="bg-card/50 dark:bg-card/20 backdrop-blur-sm border-border/50">
        <CardHeader className="items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary mb-4">
                <AudioWaveform className="h-6 w-6 text-primary-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold font-headline">Voice Search Query Predictor</CardTitle>
            <p className="text-muted-foreground">Predict how users will ask for your content via voice search.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-2">
                <Label htmlFor="keyword">Keyword / Topic</Label>
                <Input
                    id="keyword"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="e.g., best smartphone, how to learn react"
                />
            </div>
             <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                 <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
                    <SelectTrigger id="language-select">
                        <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Urdu/Roman-Urdu">Urdu / Roman-Urdu</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </div>
          <Button onClick={handleGenerate} disabled={isLoading} className="w-full" size="lg">
            <AudioWaveform className={`mr-2 h-5 w-5 ${isLoading ? 'animate-pulse' : ''}`} />
            {isLoading ? 'Predicting Queries...' : 'Predict Voice Queries'}
          </Button>

          {queries.length > 0 && (
            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-semibold text-center">Predicted Voice Queries</h3>
              <ul className="space-y-2">
                {queries.map((query, index) => (
                  <li key={index} className="flex items-center justify-between gap-2 rounded-md border bg-background p-3">
                    <span className="flex-grow">{query}</span>
                    <Button variant="ghost" size="icon" onClick={() => handleCopy(query)}>
                        <Copy className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
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
                    <p>This tool helps you understand how users in Pakistan might ask for your content using voice search on Google Assistant, Siri, or other voice assistants.</p>
                    <ol>
                        <li>Enter your core topic or keyword (e.g., "latest mobile prices").</li>
                        <li>Choose the language your audience is likely to use (English or Urdu/Roman-Urdu).</li>
                        <li>Click "Predict Voice Queries" to get a list of natural, conversational questions.</li>
                        <li>Use these predicted queries in your website's content, FAQs, and headings to better match what voice search users are asking for.</li>
                    </ol>
                    <p>Optimizing for voice search can help you capture more organic traffic from the growing number of mobile users in Pakistan.</p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>

    </div>
  );
}
