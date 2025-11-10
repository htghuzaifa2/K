
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Copy, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FancyAccordionButton } from './FancyAccordionButton';

const loremIpsumWords = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".split(' ');

export function LoremIpsumGenerator() {
  const [wordCount, setWordCount] = useState(50);
  const [generatedText, setGeneratedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateText = () => {
    setIsLoading(true);
    if (wordCount <= 0) {
      setGeneratedText('');
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
        let text = '';
        while (text.split(' ').length < wordCount) {
          const sentenceLength = Math.floor(Math.random() * 10) + 5;
          let sentence = '';
          for (let i = 0; i < sentenceLength; i++) {
            sentence += loremIpsumWords[Math.floor(Math.random() * loremIpsumWords.length)] + ' ';
          }
          sentence = sentence.trim();
          sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1) + '. ';
          text += sentence;
        }
        setGeneratedText(text.split(' ').slice(0, wordCount).join(' '));
        setIsLoading(false);
    }, 300);
  };

  const handleCopy = () => {
    if (generatedText) {
      navigator.clipboard.writeText(generatedText);
      toast({ title: 'Copied to clipboard!' });
    }
  };
  
  return (
    <div className="w-full">
      <Card className="bg-card/50 dark:bg-card/20 backdrop-blur-sm border-border/50">
        <CardHeader className="items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary mb-4">
                <span className="text-2xl font-bold text-primary-foreground font-headline">¶</span>
            </div>
            <h1 className="text-3xl font-bold font-headline">Lorem Ipsum Generator</h1>
            <p className="text-muted-foreground">Generate placeholder text with a specific word count.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="wordCount">Number of Words</Label>
              <Input
                id="wordCount"
                type="number"
                value={wordCount}
                onChange={(e) => setWordCount(parseInt(e.target.value, 10))}
                placeholder="e.g., 50"
                min="1"
              />
            </div>
            <Button onClick={generateText} disabled={isLoading} className="w-full">
              <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Generating...' : 'Generate Text'}
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
                <Label htmlFor="generatedText">Generated Text</Label>
                <Button variant="ghost" size="icon" onClick={handleCopy} disabled={!generatedText}>
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copy text</span>
                </Button>
            </div>
            <Textarea
              id="generatedText"
              value={generatedText}
              readOnly
              placeholder="Generated Lorem Ipsum text will appear here..."
              rows={8}
              className="font-mono text-sm"
            />
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-6">
        <Accordion type="single" collapsible>
            <AccordionItem value="guide" className="border-none">
                <AccordionTrigger className="p-0 hover:no-underline [&>svg]:hidden">
                    <FancyAccordionButton />
                </AccordionTrigger>
                <AccordionContent className="mt-2 p-6 rounded-lg bg-card/50 dark:bg-card/20 prose dark:prose-invert max-w-none text-sm">
                    <p>This tool helps you quickly generate placeholder text for your projects.</p>
                    <ol>
                        <li>Enter the desired number of words in the input field.</li>
                        <li>Click the "Generate Text" button.</li>
                        <li>The generated Lorem Ipsum text will appear in the text area below.</li>
                        <li>Use the copy button to easily copy the text to your clipboard.</li>
                    </ol>
                    <p>It's perfect for web design, mockups, and any layout that needs placeholder content.</p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>

    </div>
  );
}
