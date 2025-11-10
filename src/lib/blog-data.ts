
import ptaGuideContent from './blog-content/pta-guide-2025';
import freelancingSetupContent from './blog-content/freelancing-setup-pakistan-2026';
import seoContent from './blog-content/seo-for-pakistani-developers-2026';
import securityContent from './blog-content/web-security-for-pakistani-businesses-2026';
import cloudContent from './blog-content/cloud-rising-over-pakistan';
import mobileFirstContent from './blog-content/mobile-first-era-pakistan';
import pwaGuideContent from './blog-content/pwa-guide-pakistan-2026';
import cryptoTrendsContent from './blog-content/pakistan-crypto-trends-2026';
import iotProjectsContent from './blog-content/iot-projects-pakistan-budget';
import fiveGContent from './blog-content/5g-and-beyond-pakistan';
import accessibilityContent from './blog-content/accessibility-inclusive-design-pakistan';
import freelanceMarketplacesContent from './blog-content/freelance-marketplaces-pakistan-2026';
import websiteSpeedContent from './blog-content/website-speed-optimization-pakistan';
import renewableEnergyContent from './blog-content/renewable-energy-data-centres-pakistan';
import monetiseBlogContent from './blog-content/monetise-tech-blog-pakistan';
import localisingProductsContent from './blog-content/localising-digital-products-pakistan';
import lowCodeNoCodeContent from './blog-content/low-code-no-code-pakistan';
import smartphonesGuideContent from './blog-content/best-smartphones-under-150k-pakistan';
import mechanicalKeyboardsContent from './blog-content/mechanical-keyboards-pakistan-2025';
import smartphoneVsLaptopContent from './blog-content/smartphone-vs-laptop-pakistan-students';
import wirelessCombosContent from './blog-content/best-wireless-keyboard-mouse-combos-pakistan';
import twoInOneLaptopsContent from './blog-content/top-2-in-1-laptops-pakistan-2026';
import emergingAccessoriesContent from './blog-content/emerging-tech-accessories-pakistan-2026';


export interface BlogPost {
  slug: string;
  title: string;
  id: string;
}

export interface BlogPostWithContent extends BlogPost {
  content: string;
  description: string;
}

const contentMap: Record<string, { content: string, description: string }> = {
  'pta-guide-2025': { 
      content: ptaGuideContent,
      description: 'Confused by PTA approval? Our step-by-step guide explains how to register your imported phone, calculate taxes, and avoid getting blocked.' 
  },
  'freelancing-setup-pakistan-2026': { 
      content: freelancingSetupContent,
      description: 'A step-by-step guide for Pakistani web developers setting up a productive home office — from affordable gear to reliable internet, ergonomic comfort, and smart software tools for freelancing success.'
  },
  'seo-for-pakistani-developers-2026': { 
      content: seoContent,
      description: 'Learn how web developers in Pakistan can optimize websites and portfolios for local search engines — with the right Urdu/English mix, regional keywords, and mobile-first strategies that attract real Pakistani users in 2026.'
  },
  'web-security-for-pakistani-businesses-2026': {
      content: securityContent,
      description: 'A step-by-step guide for Pakistani businesses to secure their websites — from SSL setup and backups to WordPress/WooCommerce safety, mobile browser security, and local best practices for 2026.'
  },
  'cloud-rising-over-pakistan': {
      content: cloudContent,
      description: 'Exploring how cloud and edge computing are empowering Pakistani startups to scale, innovate, and compete globally in 2026.'
  },
  'mobile-first-era-pakistan': {
      content: mobileFirstContent,
      description: 'Why mobile-first web design is non-negotiable in Pakistan and how developers can build faster, more accessible sites for a mobile-driven audience.'
  },
  'pwa-guide-pakistan-2026': {
    content: pwaGuideContent,
    description: 'A guide to Progressive Web Apps (PWAs) in Pakistan for 2026, explaining what they are, why they matter for the local market, and how developers can build them.'
  },
  'pakistan-crypto-trends-2026': {
    content: cryptoTrendsContent,
    description: 'An overview of the crypto landscape in Pakistan for web developers in 2026, covering regulatory bodies like PVARA, opportunities in dApps, and risks involved.'
  },
  'iot-projects-pakistan-budget': {
    content: iotProjectsContent,
    description: 'Practical, low-cost IoT project ideas for Pakistan — agriculture sensors, home automation, smart-city mini-projects — with local hardware cost hints and simple coding steps.'
  },
  '5g-and-beyond-pakistan': {
    content: fiveGContent,
    description: 'With faster mobile networks coming to Pakistan, web developers must gear up for bigger changes. Here’s what to watch and how to prepare for the 2026-27 era.'
  },
  'accessibility-inclusive-design-pakistan': {
    content: accessibilityContent,
    description: 'Learn how Pakistani web developers can make the internet friendlier for everyone — from users with disabilities to low-bandwidth mobile visitors.'
  },
  'freelance-marketplaces-pakistan-2026': {
    content: freelanceMarketplacesContent,
    description: 'In 2026, freelancing in Pakistan is a full-fledged career. Discover the top platforms and strategies for web developers to secure clients both locally and internationally.'
  },
  'website-speed-optimization-pakistan': {
    content: websiteSpeedContent,
    description: 'A guide on how to make your website lightning-fast for Pakistani mobile users, focusing on local hosting, optimization tools, caching, and CDNs.'
  },
  'renewable-energy-data-centres-pakistan': {
    content: renewableEnergyContent,
    description: 'Explore how Pakistan’s solar surge and renewable push are transforming hosting and data-centre infrastructure — what it means for web developers, green computing, and future-ready architectures.'
  },
  'monetise-tech-blog-pakistan': {
    content: monetiseBlogContent,
    description: 'Learn how Pakistani tech bloggers and creators can earn real income from their websites — through AdSense, affiliate programs, SEO, and smart content strategies tailored for the local market.'
  },
  'localising-digital-products-pakistan': {
    content: localisingProductsContent,
    description: 'A guide for developers on localizing digital products for the Pakistani market, covering UI, language, cultural context, and payment gateways.'
  },
  'low-code-no-code-pakistan': {
    content: lowCodeNoCodeContent,
    description: 'How Pakistani SMEs can leverage low-code and no-code tools to build a web presence quickly and affordably, and the new opportunities this creates for developers.'
  },
  'best-smartphones-under-150k-pakistan': {
    content: smartphonesGuideContent,
    description: 'A Pakistan-focused guide to the best smartphones under PKR 150,000 in 2025, with a look ahead to what to expect in 2026.'
  },
  'mechanical-keyboards-pakistan-2025': {
    content: mechanicalKeyboardsContent,
    description: 'A friendly, practical roundup for web devs and remote workers in Pakistan — comparing switches, build quality, backlighting, and which keyboards give the best value across budget and premium tiers.'
  },
  'smartphone-vs-laptop-pakistan-students': {
    content: smartphoneVsLaptopContent,
    description: 'A detailed comparison to help Pakistani students decide between a smartphone and a laptop, considering budget, use-cases like online classes and coding, and long-term value.'
  },
  'best-wireless-keyboard-mouse-combos-pakistan': {
    content: wirelessCombosContent,
    description: 'A guide to the best wireless keyboard and mouse combos in Pakistan for home office setups in 2025, focusing on productivity, ergonomics, and value.'
  },
  'top-2-in-1-laptops-pakistan-2026': {
    content: twoInOneLaptopsContent,
    description: 'A review of the top 5 convertible 2-in-1 laptops for Pakistani developers and designers, with a forecast for 2026 trends.'
  },
  'emerging-tech-accessories-pakistan-2026': {
    content: emergingAccessoriesContent,
    description: 'A guide to emerging tech accessories in Pakistan for 2026, including USB-C hubs, portable monitors, and high-end mechanical keyboards.'
  },
};


const blogPosts: BlogPost[] = [
  {
    id: 'pta-guide-2025',
    slug: 'the-ultimate-guide-to-pta-phone-registration-2025',
    title: 'The Ultimate Guide to PTA Phone Registration (2025)',
  },
  {
    id: 'freelancing-setup-pakistan-2026',
    slug: 'how-to-build-a-freelancing-web-developer-setup-in-pakistan-2026-edition',
    title: 'How to Build a Freelancing Web Developer Setup in Pakistan (2026 Edition)',
  },
  {
    id: 'seo-for-pakistani-developers-2026',
    slug: 'seo-for-pakistani-web-developers-local-strategies-that-work-in-2026',
    title: 'SEO for Pakistani Web Developers: Local Strategies that Work in 2026',
  },
  {
    id: 'web-security-for-pakistani-businesses-2026',
    slug: 'web-security-essentials-for-small-pakistani-businesses-a-developers-guide',
    title: 'Web Security Essentials for Small Pakistani Businesses: A Developer’s Guide',
  },
  {
    id: 'cloud-rising-over-pakistan',
    slug: 'a-cloud-rising-over-pakistans-tech-horizon',
    title: 'A Cloud Rising Over Pakistan’s Tech Horizon',
  },
  {
    id: 'mobile-first-era-pakistan',
    slug: 'welcome-to-pakistans-mobile-first-era',
    title: 'Welcome to Pakistan’s Mobile-First Era',
  },
  {
    id: 'pwa-guide-pakistan-2026',
    slug: 'the-web-that-feels-like-an-app-a-guide-to-pwas-in-pakistan',
    title: 'The Web That Feels Like an App: A Guide to PWAs in Pakistan',
  },
  {
    id: 'pakistan-crypto-trends-2026',
    slug: 'pakistan-crypto-trends-2026-for-web-developers',
    title: 'Pakistan Crypto Trends 2026: A Guide for Web Developers',
  },
  {
    id: 'iot-projects-pakistan-budget',
    slug: 'iot-projects-you-can-build-in-pakistan-on-a-budget',
    title: 'IoT Projects You Can Build in Pakistan on a Budget',
  },
  {
    id: '5g-and-beyond-pakistan',
    slug: '5g-and-beyond-what-it-means-for-pakistani-web-developers',
    title: '5G & Beyond: What It Means for Pakistani Web Developers',
  },
  {
    id: 'accessibility-inclusive-design-pakistan',
    slug: 'accessibility-and-inclusive-web-design-for-pakistani-users',
    title: 'Accessibility & Inclusive Web Design for Pakistani Users',
  },
  {
    id: 'freelance-marketplaces-pakistan-2026',
    slug: 'freelance-marketplaces-for-pakistani-web-developers-2026',
    title: 'Freelance Marketplaces for Pakistani Web Developers in 2026',
  },
  {
    id: 'website-speed-optimization-pakistan',
    slug: 'how-to-optimize-website-speed-for-pakistani-mobile-users',
    title: 'How to Optimize Website Speed for Pakistani Mobile Users',
  },
  {
    id: 'renewable-energy-data-centres-pakistan',
    slug: 'renewable-energy-and-solar-tech-for-data-centres-in-pakistan',
    title: 'The Growing Role of Renewable Energy & Solar Tech for Data Centres in Pakistan',
  },
  {
    id: 'monetise-tech-blog-pakistan',
    slug: 'how-to-monetise-your-tech-blog-in-pakistan',
    title: 'How to Monetise Your Tech Blog in Pakistan: From Ads to Affiliate Marketing',
  },
  {
    id: 'localising-digital-products-pakistan',
    slug: 'localising-digital-products-for-pakistan-ui-to-payment-gateways',
    title: 'Localising Digital Products for Pakistan: From UI to Payment Gateways',
  },
  {
    id: 'low-code-no-code-pakistan',
    slug: 'how-pakistani-smes-can-use-low-code-and-no-code-tools',
    title: 'How Pakistani SMEs Can Use Low-Code & No-Code Tools for Web Presence',
  },
  {
    id: 'best-smartphones-under-150k-pakistan',
    slug: 'best-smartphones-under-pkr-150000-in-pakistan-2025-vs-2026',
    title: 'Best Smartphones Under PKR 150,000 in Pakistan — 2025 vs 2026',
  },
  {
    id: 'mechanical-keyboards-pakistan-2025',
    slug: 'top-mechanical-keyboards-for-pakistani-tech-enthusiasts-2025',
    title: 'Top Mechanical Keyboards for Pakistani Tech Enthusiasts (2025 Review)',
  },
  {
    id: 'smartphone-vs-laptop-pakistan-students',
    slug: 'smartphone-vs-laptop-for-pakistani-students-2026-guide',
    title: 'Smartphone vs. Laptop for Pakistani Students (2026 Guide)',
  },
  {
    id: 'best-wireless-keyboard-mouse-combos-pakistan',
    slug: 'best-wireless-keyboard-mouse-combos-for-home-office-pakistan-2025',
    title: 'Best Wireless Keyboard + Mouse Combos for Home Office in Pakistan (2025)',
  },
  {
    id: 'top-2-in-1-laptops-pakistan-2026',
    slug: 'top-5-2-in-1-laptops-for-pakistani-developers-and-designers-2026',
    title: 'Top 5 2-in-1 Laptops for Pakistani Developers & Designers (2026 Forecast)',
  },
  {
    id: 'emerging-tech-accessories-pakistan-2026',
    slug: 'emerging-tech-accessories-in-pakistan-2026-trends',
    title: 'Emerging Tech Accessories in Pakistan (2026 Trends)',
  },
];

const sortedBlogPosts = blogPosts.sort((a, b) => a.title.localeCompare(b.title));

export const getBlogPosts = (): BlogPost[] => {
  return sortedBlogPosts;
};

export function getBlogPostBySlug(slug: string): BlogPostWithContent | undefined {
  const post = sortedBlogPosts.find((p) => p.slug === slug);

  if (!post) {
    return undefined;
  }

  const data = contentMap[post.id];

  if (!data) {
    return {
      ...post,
      content: '<p>Error: Blog content not found.</p>',
      description: 'Error: Description not found.',
    };
  }

  return {
    ...post,
    content: data.content,
    description: data.description,
  };
}
    
