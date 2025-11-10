'use server';

/**
 * @fileOverview An AI agent for generating social media hashtags.
 *
 * - generateHashtags - A function that generates hashtags for a given topic.
 * - HashtagGeneratorInput - The input type for the generateHashtags function.
 * - HashtagGeneratorOutput - The return type for the generateHashtags function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const HashtagGeneratorInputSchema = z.object({
  topic: z.string().describe('The topic or keywords to generate hashtags for.'),
  language: z.string().optional().describe('The desired language for the hashtags (e.g., English, Urdu, Punjabi).'),
});
export type HashtagGeneratorInput = z.infer<typeof HashtagGeneratorInputSchema>;

const HashtagGeneratorOutputSchema = z.object({
  hashtags: z.array(z.string()).describe('A list of suggested hashtags, without the # symbol.'),
});
export type HashtagGeneratorOutput = z.infer<typeof HashtagGeneratorOutputSchema>;

export async function generateHashtags(input: HashtagGeneratorInput): Promise<HashtagGeneratorOutput> {
  return hashtagGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'hashtagGeneratorPrompt',
  input: { schema: HashtagGeneratorInputSchema },
  output: { schema: HashtagGeneratorOutputSchema },
  prompt: `You are a social media expert specializing in creating viral and engaging hashtags. 
  
  Generate a list of 15-20 relevant hashtags for the following topic: {{{topic}}}.

  The language for the hashtags should be: {{{language}}}. If no language is specified, use a mix of English and language commonly associated with the topic.
  
  Please provide a mix of popular, niche, and creative hashtags. Do not include the '#' symbol in your output.`,
});

const hashtagGeneratorFlow = ai.defineFlow(
  {
    name: 'hashtagGeneratorFlow',
    inputSchema: HashtagGeneratorInputSchema,
    outputSchema: HashtagGeneratorOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
