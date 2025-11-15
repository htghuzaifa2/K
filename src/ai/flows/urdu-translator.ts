
'use server';

/**
 * @fileOverview An AI agent for translating and transliterating between English, Urdu, and Roman-Urdu.
 *
 * - translateUrduText - A function that handles the translation/transliteration process.
 * - UrduTranslatorInput - The input type for the function.
 * - UrduTranslatorOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const UrduTranslatorInputSchema = z.object({
  text: z.string().describe('The text to be translated or transliterated.'),
  sourceLanguage: z.enum(['English', 'Urdu', 'Roman-Urdu']).describe('The source language of the text.'),
  targetLanguage: z.enum(['English', 'Urdu', 'Roman-Urdu']).describe('The target language for the translation/transliteration.'),
});
export type UrduTranslatorInput = z.infer<typeof UrduTranslatorInputSchema>;

const UrduTranslatorOutputSchema = z.object({
  translatedText: z.string().describe('The resulting translated or transliterated text.'),
});
export type UrduTranslatorOutput = z.infer<typeof UrduTranslatorOutputSchema>;

export async function translateUrduText(input: UrduTranslatorInput): Promise<UrduTranslatorOutput> {
  return urduTranslatorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'urduTranslatorPrompt',
  input: { schema: UrduTranslatorInputSchema },
  output: { schema: UrduTranslatorOutputSchema },
  prompt: `You are an expert linguist specializing in translations and transliterations between English, Urdu (in Perso-Arabic script), and Roman-Urdu (Urdu written in the Latin alphabet).

  Your task is to convert the following text based on the user's request.

  Source Text: {{{text}}}
  Source Language: {{{sourceLanguage}}}
  Target Language: {{{targetLanguage}}}

  Instructions:
  1.  If the source and target languages are different (e.g., English to Urdu), perform a high-quality translation.
  2.  If the languages are variations of Urdu (e.g., Urdu to Roman-Urdu or Roman-Urdu to Urdu), perform a transliteration, converting the script while preserving the pronunciation and meaning.
  3.  If the source and target languages are the same, just return the original text.
  4.  Ensure the output is natural and contextually appropriate for a Pakistani audience. Do not add any extra text, greetings, or explanations. Only provide the final text.`,
  config: {
    temperature: 0.2,
  },
});

const urduTranslatorFlow = ai.defineFlow(
  {
    name: 'urduTranslatorFlow',
    inputSchema: UrduTranslatorInputSchema,
    outputSchema: UrduTranslatorOutputSchema,
  },
  async input => {
    if (input.sourceLanguage === input.targetLanguage) {
        return { translatedText: input.text };
    }
    const { output } = await prompt(input);
    return output!;
  }
);
