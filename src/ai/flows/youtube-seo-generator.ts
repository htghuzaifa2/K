
'use server';

/**
 * @fileOverview An AI agent for generating YouTube video SEO content.
 *
 * - generateYouTubeSeo - A function that suggests titles, descriptions, and tags for a video topic.
 * - YouTubeSeoInput - The input type for the generateYouTubeSeo function.
 * - YouTubeSeoOutput - The return type for the generateYouTubeSeo function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const YouTubeSeoInputSchema = z.object({
  topic: z.string().describe('The topic or a brief description of the YouTube video.'),
  language: z.string().optional().describe('The primary language of the video audience (e.g., English, Urdu, Roman-Urdu).'),
});
export type YouTubeSeoInput = z.infer<typeof YouTubeSeoInputSchema>;

const YouTubeSeoOutputSchema = z.object({
  titles: z.array(z.string()).describe('A list of 5-7 catchy, SEO-friendly title suggestions.'),
  description: z.string().describe('A well-structured, SEO-optimized video description, including placeholders for links and a summary.'),
  tags: z.array(z.string()).describe('A list of 15-20 relevant tags (keywords) for the video.'),
});
export type YouTubeSeoOutput = z.infer<typeof YouTubeSeoOutputSchema>;

export async function generateYouTubeSeo(input: YouTubeSeoInput): Promise<YouTubeSeoOutput> {
  return youTubeSeoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'youTubeSeoPrompt',
  input: { schema: YouTubeSeoInputSchema },
  output: { schema: YouTubeSeoOutputSchema },
  prompt: `You are a YouTube SEO expert specializing in the Pakistani and South Asian markets. Your task is to generate optimized metadata for a video based on a given topic.

  Video Topic: {{{topic}}}
  {{#if language}}
  Audience Language: {{{language}}}
  {{/if}}

  Instructions:
  1.  **Titles:** Generate 5-7 engaging and keyword-rich titles. Use a mix of title styles (e.g., question-based, listicle, direct benefit).
  2.  **Description:** Write a comprehensive, SEO-optimized description. It should include:
      - A strong opening paragraph (2-3 sentences) summarizing the video.
      - A "What you'll learn" section with bullet points.
      - Placeholder sections for social media links (e.g., "[Your Instagram Link Here]").
      - A concluding paragraph.
      - 3-5 relevant hashtags at the end (e.g., #VideoEditing #Pakistan).
  3.  **Tags:** Generate a list of 15-20 relevant tags. Include a mix of broad, specific, long-tail, and local keywords (including Roman-Urdu if applicable).
  4.  **Tone:** Keep the tone professional but approachable. All generated content must be brand-safe and SFW.
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

const youTubeSeoFlow = ai.defineFlow(
  {
    name: 'youTubeSeoFlow',
    inputSchema: YouTubeSeoInputSchema,
    outputSchema: YouTubeSeoOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
