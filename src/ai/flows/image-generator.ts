
'use server';

/**
 * @fileOverview An AI agent for generating SVG images from text prompts.
 *
 * - generateImage - A function that creates an SVG image based on a user's description.
 * - ImageGeneratorInput - The input type for the generateImage function.
 * - ImageGeneratorOutput - The return type for the generateImage function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ImageGeneratorInputSchema = z.object({
  prompt: z.string().describe('A creative, detailed description of the SVG image to generate.'),
});
export type ImageGeneratorInput = z.infer<typeof ImageGeneratorInputSchema>;

const ImageGeneratorOutputSchema = z.object({
  svgCode: z.string().describe("The generated SVG image as a string of SVG code. It should be a complete, valid SVG that is reasonably simple and styled with fills, not CSS classes."),
});
export type ImageGeneratorOutput = z.infer<typeof ImageGeneratorOutputSchema>;

export async function generateImage(input: ImageGeneratorInput): Promise<ImageGeneratorOutput> {
  return imageGeneratorFlow(input);
}

const prompt = ai.definePrompt({
    name: 'svgGeneratorPrompt',
    input: { schema: ImageGeneratorInputSchema },
    output: { schema: ImageGeneratorOutputSchema },
    prompt: `You are an expert SVG designer. Your task is to generate a complete, valid, and visually appealing SVG based on the user's prompt.

    Prompt: {{{prompt}}}
    
    Instructions:
    1.  Create a single, self-contained SVG.
    2.  Use inline fills for colors. Do not use CSS classes or external stylesheets.
    3.  Keep the design relatively simple and clean.
    4.  Ensure the SVG code is well-formed and ready to be rendered directly.
    5.  The SVG should have a viewBox="0 0 100 100".
    6.  Ensure the generated SVG is brand-safe and does not contain any hateful, explicit, or harmful content.
    `,
});

const imageGeneratorFlow = ai.defineFlow(
  {
    name: 'imageGeneratorFlow',
    inputSchema: ImageGeneratorInputSchema,
    outputSchema: ImageGeneratorOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
