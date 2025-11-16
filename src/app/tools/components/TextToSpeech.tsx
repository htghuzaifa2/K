
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FancyAccordionButton } from './FancyAccordionButton';
import { Download, Loader2, Volume2, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { textToSpeech } from '@/ai/flows/tts-flow';

export function TextToSpeech() {
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!text.trim()) {
      toast({
        variant: 'destructive',
        title: 'Text is required',
        description: 'Please enter some text to convert to speech.',
      });
      return;
    }
    setIsLoading(true);
    setAudioUrl('');
    try {
      const result = await textToSpeech({ text });
      setAudioUrl(result.audioUrl);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to generate audio. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!audioUrl) return;
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = 'kimi-pk-generated-audio.wav';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full">
      <Card className="bg-card/50 dark:bg-card/20 backdrop-blur-sm border-border/50">
        <CardHeader className="items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary mb-4">
                <Volume2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold font-headline">AI Text-to-Speech</CardTitle>
            <p className="text-muted-foreground">Convert text into high-quality audio voiceovers.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="tts-input">Enter your script</Label>
            <Textarea
              id="tts-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g., 'Hello from Kimi.pk! Create amazing audio for your projects.'"
              rows={5}
            />
          </div>

          <Button onClick={handleGenerate} disabled={isLoading} className="w-full" size="lg">
            {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Wand2 className="mr-2 h-5 w-5" />}
            {isLoading ? 'Generating Audio...' : 'Generate Audio'}
          </Button>

          {(audioUrl || isLoading) && (
            <div className="space-y-4 pt-4 border-t flex flex-col items-center justify-center">
              <h3 className="text-lg font-semibold">Generated Audio</h3>
              {isLoading ? (
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </div>
              ) : (
                audioUrl && (
                    <div className="w-full">
                        <audio controls src={audioUrl} className="w-full">
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                )
              )}
              {!isLoading && audioUrl && (
                 <Button onClick={handleDownload} variant="outline">
                    <Download className="mr-2 h-4 w-4" /> Download Audio (WAV)
                </Button>
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
                    <p>This tool uses AI to convert your written text into a natural-sounding voiceover.</p>
                    <ol>
                        <li>Type or paste your script into the text box.</li>
                        <li>Click the "Generate Audio" button. Please be patient, as this can take a few seconds.</li>
                        <li>Your generated audio will appear with a player. You can listen to it directly.</li>
                        <li>Use the "Download Audio" button to save the voiceover as a WAV file on your device.</li>
                    </ol>
                    <p>It's perfect for creating voiceovers for YouTube videos, audio versions of blog posts, or any other project where you need a clean voice recording without a microphone.</p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>

    </div>
  );
}
