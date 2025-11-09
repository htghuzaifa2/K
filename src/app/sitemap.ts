
import { MetadataRoute } from 'next';
import { getProducts } from '@/lib/products';
import { getBlogPosts } from '@/lib/blog-data';
import { getTools } from '@/lib/tool-data';
import { APP_NAME } from '@/lib/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = `https://${APP_NAME}`;

  // Main static pages
  const staticPages = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/products`, lastModified: new Date() },
    { url: `${baseUrl}/categories`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
    { url: `${baseUrl}/faq`, lastModified: new Date() },
    { url: `${baseUrl}/return-policy`, lastModified: new Date() },
    { url: `${baseUrl}/shipping-policy`, lastModified: new Date() },
    { url: `${baseUrl}/blogs`, lastModified: new Date() },
    { url: `${baseUrl}/tools`, lastModified: new Date() },
  ];

  // Dynamic product pages
  const products = await getProducts();
  const productPages = products.map(product => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(), // Or a date from your product data
  }));

  // Dynamic blog pages
  const blogPosts = getBlogPosts();
  const blogPages = blogPosts.map(post => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  // Dynamic tool pages
  const tools = getTools();
  const toolPages = tools.map(tool => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(),
  }));

  return [...staticPages, ...productPages, ...blogPages, ...toolPages];
}
