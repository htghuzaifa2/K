import { MetadataRoute } from 'next';
import { getProducts } from '@/lib/products';
import { getBlogPosts } from '@/lib/blog-data';
import { getTools } from '@/lib/tool-data';
import { APP_NAME } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = `https://www.${APP_NAME}`;
  const today = new Date().toISOString().split('T')[0];

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: today, changeFrequency: 'yearly', priority: 1 },
    { url: `${baseUrl}/products`, lastModified: today, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/categories`, lastModified: today, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/blogs`, lastModified: today, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/tools`, lastModified: today, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/about`, lastModified: today, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: today, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/faq`, lastModified: today, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/return-policy`, lastModified: today, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/shipping-policy`, lastModified: today, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/cash-on-delivery`, lastModified: today, changeFrequency: 'yearly', priority: 0.5 },
  ];

  const productPages = getProducts().map(product => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: today,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const blogPages = getBlogPosts().map(post => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: today,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const toolPages = getTools().map(tool => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: today,
    changeFrequency: 'yearly',
    priority: 0.5,
  }));

  return [...staticPages, ...productPages, ...blogPages, ...toolPages];
}
