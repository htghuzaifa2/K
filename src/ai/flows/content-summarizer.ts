
'use server';

/**
 * @fileOverview An AI agent for summarizing long text content.
 *
 * - summarizeContent - A function that generates a summary for a given text.
 * - ContentSummarizerInput - The input type for the summarizeContent function.
 * - ContentSummarizerOutput - The return type for the summarizeContent function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ContentSummarizerInputSchema = z.object({
  text: z.string().describe('The long text or article to be summarized.'),
  language: z.string().optional().describe('The language of the text (e.g., English, Urdu).'),
});
export type ContentSummarizerInput = z.infer<typeof ContentSummarizerInputSchema>;

const ContentSummarizerOutputSchema = z.object({
  summary: z.string().describe('A concise, easy-to-read summary of the provided text.'),
});
export type ContentSummarizerOutput = z.infer<typeof ContentSummarizerOutputSchema>;

export async function summarizeContent(input: ContentSummarizerInput): Promise<ContentSummarizerOutput> {
  return contentSummarizerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'contentSummarizerPrompt',
  input: { schema: ContentSummarizerInputSchema },
  output: { schema: ContentSummarizerOutputSchema },
  prompt: `You are an expert academic and professional summarizer. Your task is to read the following text and create a concise, accurate, and easy-to-understand summary.

  The language of the text is {{{language}}}. The summary should also be in {{{language}}}.

  Text to summarize:
  ---
  {{{text}}}
  ---
  
  Instructions:
  1.  Identify the main ideas, key arguments, and important conclusions.
  2.  Condense the information into a few clear and coherent paragraphs.
  3.  Do not add any personal opinions or information not present in the original text.
  4.  Ensure the summary is brand-safe and does not contain any hateful, explicit, or harmful content.
  `,
  config: {
    temperature: 0.3,
    safetySettings: [
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
    ]
  },
});

const contentSummarizerFlow = ai.defineFlow(
  {
    name: 'contentSummarizerFlow',
    inputSchema: ContentSummarizerInputSchema,
    outputSchema: ContentSummarizerOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
