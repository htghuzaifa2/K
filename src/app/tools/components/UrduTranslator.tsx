
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FancyAccordionButton } from './FancyAccordionButton';
import { Copy, Loader2, Languages, ArrowRightLeft, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { translateUrduText } from '@/ai/flows/urdu-translator';

type Language = 'English' | 'Urdu' | 'Roman-Urdu';

export function UrduTranslator() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [sourceLang, setSourceLang] = useState<Language>('English');
  const [targetLang, setTargetLang] = useState<Language>('Urdu');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      toast({
        variant: 'destructive',
        title: 'Input text is required',
        description: 'Please enter some text to translate.',
      });
      return;
    }

    if (sourceLang === targetLang) {
        toast({
            variant: 'destructive',
            title: 'Languages are the same',
            description: 'Please select different source and target languages.',
        });
        return;
    }

    setIsLoading(true);
    setOutputText('');
    try {
      const result = await translateUrduText({ text: inputText, sourceLanguage: sourceLang, targetLanguage: targetLang });
      setOutputText(result.translatedText);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to translate. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSwap = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setInputText(outputText);
    setOutputText(inputText);
  };

  const handleCopy = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText);
      toast({ title: 'Copied to clipboard!' });
    }
  };
  
  const handleClear = () => {
    setInputText('');
    setOutputText('');
  }

  return (
    <div className="w-full">
      <Card className="bg-card/50 dark:bg-card/20 backdrop-blur-sm border-border/50">
        <CardHeader className="items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary mb-4">
                <Languages className="h-6 w-6 text-primary-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold font-headline">Urdu/Roman-Urdu Translator</CardTitle>
            <p className="text-muted-foreground">Translate between English, Urdu, and Roman-Urdu.</p>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="w-full sm:w-auto flex-grow space-y-2">
                    <Label htmlFor="source-lang">From</Label>
                    <Select value={sourceLang} onValueChange={(value) => setSourceLang(value as Language)}>
                        <SelectTrigger id="source-lang">
                            <SelectValue placeholder="Select Language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="English">English</SelectItem>
                            <SelectItem value="Urdu">Urdu</SelectItem>
                            <SelectItem value="Roman-Urdu">Roman-Urdu</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Button variant="ghost" size="icon" className="sm:mt-6" onClick={handleSwap}>
                    <ArrowRightLeft className="h-5 w-5" />
                    <span className="sr-only">Swap languages</span>
                </Button>
                
                <div className="w-full sm:w-auto flex-grow space-y-2">
                    <Label htmlFor="target-lang">To</Label>
                    <Select value={targetLang} onValueChange={(value) => setTargetLang(value as Language)}>
                        <SelectTrigger id="target-lang">
                            <SelectValue placeholder="Select Language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="English">English</SelectItem>
                            <SelectItem value="Urdu">Urdu</SelectItem>
                            <SelectItem value="Roman-Urdu">Roman-Urdu</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="input-text">Your Text</Label>
                    <Textarea
                        id="input-text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Enter text here..."
                        rows={8}
                        dir={sourceLang === 'Urdu' ? 'rtl' : 'ltr'}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="output-text">Translated Text</Label>
                    <Textarea
                        id="output-text"
                        value={outputText}
                        readOnly
                        placeholder={isLoading ? "Translating..." : "Result will appear here..."}
                        rows={8}
                        dir={targetLang === 'Urdu' ? 'rtl' : 'ltr'}
                    />
                </div>
            </div>
          
            <div className="flex justify-center gap-2 flex-wrap">
                <Button onClick={handleTranslate} disabled={isLoading} size="lg">
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Languages className="mr-2 h-4 w-4" />}
                    {isLoading ? 'Translating...' : 'Translate'}
                </Button>
                <Button onClick={handleCopy} disabled={!outputText} variant="outline">
                    <Copy className="mr-2 h-4 w-4" /> Copy
                </Button>
                <Button onClick={handleClear} disabled={!inputText} variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4" /> Clear
                </Button>
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
                    <p>This tool allows you to translate and transliterate text between English, Urdu (Perso-Arabic script), and Roman-Urdu (Urdu written in Latin script).</p>
                    <ol>
                        <li>Select the source ("From") and target ("To") languages from the dropdowns.</li>
                        <li>Enter your text in the left text box.</li>
                        <li>Click the "Translate" button.</li>
                        <li>The translated or transliterated text will appear in the right box.</li>
                        <li>Use the swap button (⇄) to quickly switch the languages and text.</li>
                    </ol>
                    <p>It's perfect for content creators, students, and anyone who needs to switch between different forms of Urdu and English for communication in Pakistan.</p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
