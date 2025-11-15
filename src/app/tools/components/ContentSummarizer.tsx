
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FancyAccordionButton } from './FancyAccordionButton';
import { Copy, Loader2, BookText, Trash2, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { summarizeContent } from '@/ai/flows/content-summarizer';

export function ContentSummarizer() {
  const [inputText, setInputText] = useState('');
  const [language, setLanguage] = useState('English');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSummarize = async () => {
    if (!inputText.trim()) {
      toast({
        variant: 'destructive',
        title: 'Input text is required',
        description: 'Please paste some text to summarize.',
      });
      return;
    }
    setIsLoading(true);
    setSummary('');
    try {
      const result = await summarizeContent({ text: inputText, language });
      setSummary(result.summary);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to generate summary. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (summary) {
      navigator.clipboard.writeText(summary);
      toast({ title: 'Summary copied to clipboard!' });
    }
  };

  const handleClear = () => {
    setInputText('');
    setSummary('');
  };

  return (
    <div className="w-full">
      <Card className="bg-card/50 dark:bg-card/20 backdrop-blur-sm border-border/50">
        <CardHeader className="items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary mb-4">
                <BookText className="h-6 w-6 text-primary-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold font-headline">AI Content Summarizer</CardTitle>
            <p className="text-muted-foreground">Summarize long articles in English or Urdu.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="input-text">Paste your text here</Label>
            <Textarea
              id="input-text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste a long article or paragraph..."
              rows={10}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="language">Content Language</Label>
              <Input
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                placeholder="e.g., English, Urdu"
              />
            </div>
            <Button onClick={handleSummarize} disabled={isLoading} className="w-full self-end" size="lg">
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <FileText className="mr-2 h-5 w-5" />}
              {isLoading ? 'Summarizing...' : 'Summarize'}
            </Button>
          </div>

          { (summary || isLoading) && (
            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-lg font-semibold text-center">Summary</h3>
              {isLoading ? (
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <div className="space-y-2">
                    <Textarea
                        value={summary}
                        readOnly
                        rows={8}
                        className="bg-background/50"
                    />
                     <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={handleCopy}>
                            <Copy className="mr-2 h-4 w-4" /> Copy Summary
                        </Button>
                    </div>
                </div>
              )}
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
                    <p>This AI-powered tool helps you quickly understand long texts by providing a concise summary.</p>
                    <ol>
                        <li>Paste any article, report, or paragraph into the main text box.</li>
                        <li>Specify the language of the content (e.g., "English" or "Urdu").</li>
                        <li>Click the "Summarize" button.</li>
                        <li>The AI will read the text and generate a short, easy-to-read summary below.</li>
                        <li>Use the "Copy Summary" button to save the result.</li>
                    </ol>
                    <p>It's perfect for students, researchers, and professionals in Pakistan who need to get the main points of a document quickly, in either English or Urdu.</p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>

    </div>
  );
}
