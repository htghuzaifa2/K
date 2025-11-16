
'use server';

/**
 * @fileOverview An AI agent for generating images from text prompts.
 *
 * - generateImage - A function that creates an image based on a user's description.
 * - ImageGeneratorInput - The input type for the generateImage function.
 * - ImageGeneratorOutput - The return type for the generateImage function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ImageGeneratorInputSchema = z.object({
  prompt: z.string().describe('A creative, detailed description of the image to generate.'),
});
export type ImageGeneratorInput = z.infer<typeof ImageGeneratorInputSchema>;

const ImageGeneratorOutputSchema = z.object({
  imageUrl: z.string().describe("The generated image, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:image/png;base64,<encoded_data>'."),
});
export type ImageGeneratorOutput = z.infer<typeof ImageGeneratorOutputSchema>;

export async function generateImage(input: ImageGeneratorInput): Promise<ImageGeneratorOutput> {
  return imageGeneratorFlow(input);
}

const imageGeneratorFlow = ai.defineFlow(
  {
    name: 'imageGeneratorFlow',
    inputSchema: ImageGeneratorInputSchema,
    outputSchema: ImageGeneratorOutputSchema,
  },
  async ({ prompt }) => {
    const { media } = await ai.generate({
        model: 'googleai/gemini-2.5-flash-image-preview',
        prompt: `Generate a high-quality, brand-safe image based on the following creative prompt: ${prompt}`,
        config: {
            responseModalities: ['IMAGE'],
            safetySettings: [
                { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
                { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
                { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
                { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_LOW_AND_ABOVE' },
            ],
        },
    });
    
    if (!media?.url) {
      throw new Error('Image generation failed to return a URL.');
    }

    return {
        imageUrl: media.url,
    };
  }
);
