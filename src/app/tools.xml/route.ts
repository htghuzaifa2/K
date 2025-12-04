
import { getTools } from '@/lib/tool-data';
import { APP_NAME } from '@/lib/constants';

export const runtime = 'edge';

export async function GET() {
  const baseUrl = `https://www.${APP_NAME}`;
  const tools = getTools();
  const today = new Date().toISOString().split('T')[0];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${tools
    .map(
      (tool) => `
    <url>
      <loc>${baseUrl}/tools/${tool.slug}</loc>
      <lastmod>${today}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.5</priority>
    </url>
  `
    )
    .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
