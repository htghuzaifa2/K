import { getProducts } from '@/lib/products';
import { APP_NAME } from '@/lib/constants';

export const runtime = 'edge';

export async function GET() {
  const products = getProducts();
  const siteUrl = `https://www.${APP_NAME}`;
  const today = new Date().toISOString().split('T')[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${products
  .map(
    (p) => `
  <url>
    <loc>${siteUrl}/products/${p.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`
  )
  .join('')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
