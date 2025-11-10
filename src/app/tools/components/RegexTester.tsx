
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FancyAccordionButton } from './FancyAccordionButton';
import { Regex } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export function RegexTester() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('');
  const [error, setError] = useState<string | null>(null);

  const highlightedString = useMemo(() => {
    if (!pattern) return testString;
    
    try {
      const regex = new RegExp(pattern, flags);
      setError(null);

      if (!testString) return [];
      
      const parts = [];
      let lastIndex = 0;
      let match;

      // Handle global flag for multiple matches
      if (flags.includes('g')) {
        while ((match = regex.exec(testString)) !== null) {
          // Add the text before the match
          if (match.index > lastIndex) {
            parts.push(testString.substring(lastIndex, match.index));
          }
          // Add the highlighted match
          parts.push(
            <mark key={match.index} className="bg-primary/30 text-foreground rounded px-1">
              {match[0]}
            </mark>
          );
          lastIndex = regex.lastIndex;

          // Avoid infinite loops with zero-width matches
          if (match.index === regex.lastIndex) {
              regex.lastIndex++;
          }
        }
      } else {
        match = testString.match(regex);
        if (match) {
            const matchIndex = match.index ?? 0;
            // Add the text before the match
            if (matchIndex > 0) {
                parts.push(testString.substring(0, matchIndex));
            }
            // Add the highlighted match
             parts.push(
                <mark key={matchIndex} className="bg-primary/30 text-foreground rounded px-1">
                    {match[0]}
                </mark>
            );
            lastIndex = matchIndex + match[0].length;
        }
      }


      // Add the remaining text after the last match
      if (lastIndex < testString.length) {
        parts.push(testString.substring(lastIndex));
      }
      
      return parts;

    } catch (e: any) {
      setError(e.message);
      return testString;
    }
  }, [pattern, flags, testString]);

  return (
    <div className="w-full">
      <Card className="bg-card/50 dark:bg-card/20 backdrop-blur-sm border-border/50">
        <CardHeader className="items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary mb-4">
                <Regex className="h-6 w-6 text-primary-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold font-headline">Regex Tester</CardTitle>
            <p className="text-muted-foreground">Test and debug regular expressions in real-time.</p>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-3 space-y-2">
                    <Label htmlFor="regex-pattern">Regular Expression</Label>
                    <Input
                        id="regex-pattern"
                        value={pattern}
                        onChange={(e) => setPattern(e.target.value)}
                        placeholder="e.g., [a-zA-Z]+"
                        className={`font-mono ${error ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="regex-flags">Flags</Label>
                    <Input
                        id="regex-flags"
                        value={flags}
                        onChange={(e) => setFlags(e.target.value)}
                        placeholder="e.g., gi"
                        className="font-mono"
                    />
                </div>
            </div>
            {error && <p className="text-sm text-destructive -mt-2">{error}</p>}
            
            <div className="space-y-2">
                <Label htmlFor="test-string">Test String</Label>
                <ScrollArea className="h-48 w-full rounded-md border">
                    <div className="relative">
                        <Textarea
                            id="test-string"
                            value={testString}
                            onChange={(e) => setTestString(e.target.value)}
                            placeholder="Paste your test string here..."
                            rows={8}
                            className="font-mono bg-transparent text-transparent caret-foreground selection:bg-primary/20"
                            spellCheck="false"
                        />
                        <div className="absolute top-0 left-0 p-3 w-full h-full pointer-events-none whitespace-pre-wrap font-mono text-sm leading-[21px] md:leading-[18.2px]">
                            {highlightedString}
                        </div>
                    </div>
                </ScrollArea>
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
                    <p>This tool helps you test and visualize regular expression matches live.</p>
                    <ol>
                        <li>Enter your regular expression pattern in the main input field.</li>
                        <li>Add any flags (like `g` for global search, `i` for case-insensitive) in the "Flags" field.</li>
                        <li>Type or paste the text you want to test into the "Test String" area.</li>
                        <li>As you type, any parts of the string that match your expression will be highlighted in real-time.</li>
                        <li>If your regex pattern is invalid, an error message will appear below the input field.</li>
                    </ol>
                    <p>It’s perfect for developers, data analysts, and students learning regex to quickly debug and perfect their patterns.</p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>

    </div>
  );
}
