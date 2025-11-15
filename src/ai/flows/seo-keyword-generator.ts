
'use server';

/**
 * @fileOverview An AI agent for generating local SEO keyword ideas for the Pakistani market.
 *
 * - generateSeoKeywords - A function that generates keyword ideas.
 * - SeoKeywordGeneratorInput - The input type for the function.
 * - SeoKeywordGeneratorOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SeoKeywordGeneratorInputSchema = z.object({
  seedKeyword: z.string().describe('The primary keyword or topic to generate ideas from. Can be in English, Urdu, or Roman-Urdu.'),
  location: z.string().optional().describe('An optional location in Pakistan (e.g., Karachi, Lahore) to make the keywords more specific.'),
});
export type SeoKeywordGeneratorInput = z.infer<typeof SeoKeywordGeneratorInputSchema>;

const SeoKeywordGeneratorOutputSchema = z.object({
    longTailKeywords: z.array(z.string()).describe('Long-tail variations of the seed keyword.'),
    questionKeywords: z.array(z.string()).describe('Common questions related to the keyword that people search for.'),
    romanUrduKeywords: z.array(z.string()).describe('Transliterated Roman-Urdu variations of the keyword.'),
    urduKeywords: z.array(z.string()).describe('Keywords in Urdu script related to the topic.'),
});
export type SeoKeywordGeneratorOutput = z.infer<typeof SeoKeywordGeneratorOutputSchema>;

export async function generateSeoKeywords(input: SeoKeywordGeneratorInput): Promise<SeoKeywordGeneratorOutput> {
  return seoKeywordGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'seoKeywordGeneratorPrompt',
  input: { schema: SeoKeywordGeneratorInputSchema },
  output: { schema: SeoKeywordGeneratorOutputSchema },
  prompt: `You are an SEO expert specializing in the Pakistani market. Your task is to generate keyword ideas based on a seed keyword and an optional location.

  Seed Keyword: {{{seedKeyword}}}
  {{#if location}}
  Location: {{{location}}}
  {{/if}}

  Instructions:
  1.  Generate a diverse list of keyword ideas.
  2.  Create long-tail keywords that are more specific and less competitive.
  3.  Formulate common questions that users might search for.
  4.  Provide Roman-Urdu (Urdu in Latin script) variations that are commonly used in Pakistan.
  5.  Provide variations in Urdu script (Perso-Arabic).
  6.  If a location is provided, incorporate it naturally into some of the keyword suggestions (e.g., "best biryani in Karachi").
  7.  **CRITICAL SAFETY INSTRUCTION:** You MUST NOT generate any keywords related to adult content, hate speech, political propaganda, gambling, illegal activities, or any other NSFW or unethical topics. All suggestions must be brand-safe and appropriate for a general audience.
  `,
  config: {
    temperature: 0.7,
    safetySettings: [
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
    ]
  },
});

const seoKeywordGeneratorFlow = ai.defineFlow(
  {
    name: 'seoKeywordGeneratorFlow',
    inputSchema: SeoKeywordGeneratorInputSchema,
    outputSchema: SeoKeywordGeneratorOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
