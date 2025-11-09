
import { getBlogPosts, type BlogPost, type BlogPostWithContent } from './blog-data';

// Import raw content as strings
import ptaGuideContent from './blog-content/pta-guide-2025.ts';
import freelancingSetupContent from './blog-content/freelancing-setup-pakistan-2026.ts';
import seoContent from './blog-content/seo-for-pakistani-developers-2026.ts';
import securityContent from './blog-content/web-security-for-pakistani-businesses-2026.ts';
import cloudContent from './blog-content/cloud-rising-over-pakistan.ts';
import mobileFirstContent from './blog-content/mobile-first-era-pakistan.ts';

// Manually map post IDs to their imported content
const contentMap: Record<string, string> = {
  'pta-guide-2025': ptaGuideContent,
  'freelancing-setup-pakistan-2026': freelancingSetupContent,
  'seo-for-pakistani-developers-2026': seoContent,
  'web-security-for-pakistani-businesses-2026': securityContent,
  'cloud-rising-over-pakistan': cloudContent,
  'mobile-first-era-pakistan': mobileFirstContent,
};

// This function is safe to use on the client.
// It uses the imported blog posts index and combines it with the statically imported content.
export function getBlogPostBySlug(slug: string): BlogPostWithContent | undefined {
  const posts = getBlogPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return undefined;
  }

  const content = contentMap[post.id];

  if (!content) {
    // This would happen if a post is in blog-data.ts but its content file isn't imported here.
    return {
      ...post,
      content: '<p>Error: Blog content not found.</p>',
    };
  }

  return {
    ...post,
    content,
  };
}
// Alias for clarity in components
export const getFullPost = getBlogPostBySlug;
