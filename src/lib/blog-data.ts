
export interface BlogPost {
  slug: string;
  title: string;
  id: string;
  description: string;
}

export interface BlogPostWithContent extends BlogPost {
  content: string;
}

// The content for these descriptions will be pulled from the client-side loader
const blogPosts: BlogPost[] = [
  {
    id: 'pta-guide-2025',
    slug: 'the-ultimate-guide-to-pta-phone-registration-2025',
    title: 'The Ultimate Guide to PTA Phone Registration (2025)',
    description: 'Confused by PTA approval? Our step-by-step guide explains how to register your imported phone, calculate taxes, and avoid getting blocked.',
  },
  {
    id: 'freelancing-setup-pakistan-2026',
    slug: 'how-to-build-a-freelancing-web-developer-setup-in-pakistan-2026-edition',
    title: 'How to Build a Freelancing Web Developer Setup in Pakistan (2026 Edition)',
    description: 'A step-by-step guide for Pakistani web developers setting up a productive home office — from affordable gear to reliable internet, ergonomic comfort, and smart software tools for freelancing success.',
  },
  {
    id: 'seo-for-pakistani-developers-2026',
    slug: 'seo-for-pakistani-web-developers-local-strategies-that-work-in-2026',
    title: 'SEO for Pakistani Web Developers: Local Strategies that Work in 2026',
    description: 'Learn how web developers in Pakistan can optimize websites and portfolios for local search engines — with the right Urdu/English mix, regional keywords, and mobile-first strategies that attract real Pakistani users in 2026.',
  },
  {
    id: 'web-security-for-pakistani-businesses-2026',
    slug: 'web-security-essentials-for-small-pakistani-businesses-a-developers-guide',
    title: 'Web Security Essentials for Small Pakistani Businesses: A Developer’s Guide',
    description: 'A step-by-step guide for Pakistani businesses to secure their websites — from SSL setup and backups to WordPress/WooCommerce safety, mobile browser security, and local best practices for 2026.',
  },
  {
    id: 'cloud-rising-over-pakistan',
    slug: 'a-cloud-rising-over-pakistans-tech-horizon',
    title: 'A Cloud Rising Over Pakistan’s Tech Horizon',
    description: 'Exploring how cloud and edge computing are empowering Pakistani startups to scale, innovate, and compete globally in 2026.',
  },
  {
    id: 'mobile-first-era-pakistan',
    slug: 'welcome-to-pakistans-mobile-first-era',
    title: 'Welcome to Pakistan’s Mobile-First Era',
    description: 'Why mobile-first web design is non-negotiable in Pakistan and how developers can build faster, more accessible sites for a mobile-driven audience.',
  },
];

// Sort posts alphabetically by title
const sortedBlogPosts = blogPosts.sort((a, b) => a.title.localeCompare(b.title));

export const getBlogPosts = (): BlogPost[] => {
  // This function is now completely safe for the client as it doesn't use 'fs'
  return sortedBlogPosts;
};
