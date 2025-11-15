
'use server';

/**
 * @fileOverview An AI agent for predicting voice search queries.
 *
 * - predictVoiceQueries - A function that predicts natural language voice search queries.
 * - VoiceQueryPredictorInput - The input type for the function.
 * - VoiceQueryPredictorOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const VoiceQueryPredictorInputSchema = z.object({
  keyword: z.string().describe('The core keyword or topic.'),
  language: z.enum(['English', 'Urdu/Roman-Urdu']).describe('The desired language for the voice queries.'),
});
export type VoiceQueryPredictorInput = z.infer<typeof VoiceQueryPredictorInputSchema>;

const VoiceQueryPredictorOutputSchema = z.object({
  queries: z.array(z.string()).describe('A list of predicted voice search queries.'),
});
export type VoiceQueryPredictorOutput = z.infer<typeof VoiceQueryPredictorOutputSchema>;

export async function predictVoiceQueries(input: VoiceQueryPredictorInput): Promise<VoiceQueryPredictorOutput> {
  return voiceQueryPredictorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'voiceQueryPredictorPrompt',
  input: { schema: VoiceQueryPredictorInputSchema },
  output: { schema: VoiceQueryPredictorOutputSchema },
  prompt: `You are an SEO expert specializing in voice search optimization for the Pakistani market. Your task is to generate natural language questions that people would ask their voice assistant (like Google Assistant or Siri) based on a given keyword.

  Keyword: {{{keyword}}}
  Language: {{{language}}}

  Instructions:
  1. Generate a list of 10-15 conversational questions.
  2. The questions should start with words like "What," "How," "Where," "Can I," "Best," etc.
  3. If the language is "Urdu/Roman-Urdu," generate a mix of questions in both Urdu script and Roman-Urdu (e.g., "سب سے سستا موبائل کونسا ہے؟" and "sab se sasta mobile konsa hai?").
  4. Ensure the queries sound natural, as if someone is speaking to their phone.
  5. CRITICAL: Do not generate any queries related to adult content, gambling, hate speech, or any unethical topics. Keep it brand-safe and appropriate for all audiences.
  `,
  config: {
    temperature: 0.8,
    safetySettings: [
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
    ]
  },
});

const voiceQueryPredictorFlow = ai.defineFlow(
  {
    name: 'voiceQueryPredictorFlow',
    inputSchema: VoiceQueryPredictorInputSchema,
    outputSchema: VoiceQueryPredictorOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
