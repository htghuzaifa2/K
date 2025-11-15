
'use server';

/**
 * @fileOverview An AI agent for tracking trending topics in Pakistan.
 *
 * - getTrendingTopics - A function that fetches trending topics.
 * - TrendTrackerInput - The input type for the function.
 * - TrendTrackerOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const TrendTrackerInputSchema = z.object({
  location: z.string().optional().describe('An optional location in Pakistan (e.g., Karachi, Lahore) to get localized trends.'),
});
export type TrendTrackerInput = z.infer<typeof TrendTrackerInputSchema>;

const TrendSchema = z.object({
    topic: z.string().describe('The main trending topic or keyword.'),
    description: z.string().describe('A brief, one-sentence explanation of why this is trending.'),
});

const TrendTrackerOutputSchema = z.object({
    news: z.array(TrendSchema).describe('Top 5 trending topics related to news and current affairs.'),
    tech: z.array(TrendSchema).describe('Top 5 trending topics in technology, gadgets, and digital services.'),
    entertainment: z.array(TrendSchema).describe('Top 5 trending topics in entertainment, including movies, dramas, and celebrities.'),
    sports: z.array(TrendSchema).describe('Top 5 trending topics in sports, with a focus on cricket.'),
});
export type TrendTrackerOutput = z.infer<typeof TrendTrackerOutputSchema>;

export async function getTrendingTopics(input: TrendTrackerInput): Promise<TrendTrackerOutput> {
  return trendTrackerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'trendTrackerPrompt',
  input: { schema: TrendTrackerInputSchema },
  output: { schema: TrendTrackerOutputSchema },
  prompt: `You are a Pakistan-based trend analyst for the current date: ${new Date().toDateString()}. Your task is to identify the top 5 trending topics across different categories for a Pakistani audience.

  {{#if location}}
  Focus on trends that are particularly relevant to {{{location}}}.
  {{else}}
  Focus on nationwide trends in Pakistan.
  {{/if}}

  For each topic, provide a brief, neutral, one-sentence description explaining its relevance.

  Categories to cover:
  1.  News & Current Affairs
  2.  Technology & Gadgets
  3.  Entertainment (Dramas, Movies, Music)
  4.  Sports (especially Cricket)

  **CRITICAL SAFETY INSTRUCTION:** You MUST NOT generate any trends related to political controversy, hate speech, violence, adult content, or any other sensitive or unsafe topics. All suggestions must be brand-safe and appropriate for a general audience. Focus on positive, neutral, or constructive trends.
  `,
  config: {
    temperature: 0.5,
    safetySettings: [
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
    ]
  },
});

const trendTrackerFlow = ai.defineFlow(
  {
    name: 'trendTrackerFlow',
    inputSchema: TrendTrackerInputSchema,
    outputSchema: TrendTrackerOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
