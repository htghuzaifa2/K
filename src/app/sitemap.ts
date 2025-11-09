
import { MetadataRoute } from 'next';
import { getProducts } from '@/lib/products';
import { getBlogPosts } from '@/lib/blog-data';
import { getTools } from '@/lib/tool-data';
import { APP_NAME } from '@/lib/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = `https://www.${APP_NAME}`;

  // Main static pages
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'yearly', priority: 1 },
    { url: `${baseUrl}/products`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/categories`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/blogs`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/tools`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/return-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/shipping-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
  ];

  // Dynamic product pages
  const products = await getProducts();
  const productPages = products.map(product => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(), // Or a date from your product data
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  // Dynamic blog pages
  const blogPosts = getBlogPosts();
  const blogPages = blogPosts.map(post => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Dynamic tool pages
  const tools = getTools();
  const toolPages = tools.map(tool => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.5,
  }));

  return [...staticPages, ...productPages, ...blogPages, ...toolPages] as MetadataRoute.Sitemap;
}
