'use server';

/**
 * @fileOverview An AI agent for generating related product recommendations for a product detail page.
 *
 * - getRelatedProducts - A function that generates related product recommendations.
 * - RelatedProductsInput - The input type for the getRelatedProducts function.
 * - RelatedProductsOutput - The return type for the getRelatedProducts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RelatedProductsInputSchema = z.object({
  productDescription: z
    .string()
    .describe('The description of the product for which to generate recommendations.'),
  productName: z.string().describe('The name of the product.'),
  productCategory: z.string().describe('The category of the product.'),
});
export type RelatedProductsInput = z.infer<typeof RelatedProductsInputSchema>;

const RelatedProductsOutputSchema = z.object({
  relatedProducts: z
    .array(z.string())
    .describe('A list of related product names that the user might also like.'),
});
export type RelatedProductsOutput = z.infer<typeof RelatedProductsOutputSchema>;

export async function getRelatedProducts(input: RelatedProductsInput): Promise<RelatedProductsOutput> {
  return relatedProductsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'relatedProductsPrompt',
  input: {schema: RelatedProductsInputSchema},
  output: {schema: RelatedProductsOutputSchema},
  prompt: `You are a helpful shopping assistant that suggests related products to users.

  Suggest products that are frequently bought together with the current product, or are in a similar category.
  Return a list of product names.  Be concise.

  Current product name: {{{productName}}}
  Current product category: {{{productCategory}}}
  Current product description: {{{productDescription}}}`,
});

const relatedProductsFlow = ai.defineFlow(
  {
    name: 'relatedProductsFlow',
    inputSchema: RelatedProductsInputSchema,
    outputSchema: RelatedProductsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
