'use server';

/**
 * @fileOverview An AI agent for converting raster images to SVG vector graphics.
 *
 * - convertToSvg - A function that handles the image-to-SVG conversion.
 * - SvgConverterInput - The input type for the function.
 * - SvgConverterOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SvgConverterInputSchema = z.object({
  imageUrl: z.string().describe("A data URI of the raster image (e.g., PNG, JPG) to be converted to SVG. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});
export type SvgConverterInput = z.infer<typeof SvgConverterInputSchema>;

const SvgConverterOutputSchema = z.object({
  svgCode: z.string().describe('The full, complete SVG code as a string, representing the vectorized version of the input image. It should start with <svg> and end with </svg>.'),
});
export type SvgConverterOutput = z.infer<typeof SvgConverterOutputSchema>;

export async function convertToSvg(input: SvgConverterInput): Promise<SvgConverterOutput> {
  return svgConverterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'svgConverterPrompt',
  input: { schema: SvgConverterInputSchema },
  output: { schema: SvgConverterOutputSchema },
  prompt: `You are an expert vector artist specializing in converting raster images into clean, scalable SVG code.

Analyze the following image and convert it into a high-quality SVG.

Image to convert: {{media url=imageUrl}}

Instructions:
1.  Trace the shapes, lines, and colors of the image accurately.
2.  Simplify the paths where possible without losing significant detail.
3.  Do not include any raster data (like base64 images) within the SVG.
4.  The output must be only the raw SVG code, starting with \`<svg ...>\` and ending with \`</svg>\`. Do not wrap it in markdown or any other text.`,
});

const svgConverterFlow = ai.defineFlow(
  {
    name: 'svgConverterFlow',
    inputSchema: SvgConverterInputSchema,
    outputSchema: SvgConverterOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
