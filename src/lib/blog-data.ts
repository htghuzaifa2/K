
export interface BlogPost {
  slug: string;
  title: string;
  id: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'understanding-server-components',
    title: 'Understanding Server Components in Next.js 14',
  },
  {
    id: '2',
    slug: 'css-modules-for-styling',
    title: 'Scoped Styling with CSS Modules',
  },
  {
    id: '3',
    slug: 'getting-started-with-typescript',
    title: 'Getting Started with TypeScript in React',
  },
  {
    id: '4',
    slug: 'advanced-react-hooks',
    title: 'Advanced React Hooks Explained',
  },
  {
    id: '5',
    slug: 'building-a-rest-api-with-nextjs',
    title: 'Building a REST API with Next.js API Routes',
  },
  {
    id: '6',
    slug: 'seo-best-practices-for-nextjs',
    title: 'SEO Best Practices for Next.js Apps',
  },
  {
    id: '7',
    slug: 'state-management-with-zustand',
    title: 'Simple State Management with Zustand',
  },
  {
    id: '8',
    slug: 'deploying-nextjs-to-vercel',
    title: 'Deploying Your Next.js App to Vercel',
  },
  {
    id: '9',
    slug: 'creating-a-design-system-with-storybook',
    title: 'Creating a Design System with Storybook',
  },
  {
    id: '10',
    slug: 'image-optimization-in-nextjs',
    title: 'Mastering Image Optimization in Next.js',
  },
  {
    id: '11',
    slug: 'intro-to-tailwind-css',
    title: 'Introduction to Tailwind CSS',
  },
  {
    id: '12',
    slug: 'authentication-with-nextauth',
    title: 'Authentication in Next.js with NextAuth.js',
  },
  {
    id: '13',
    slug: 'testing-react-components-with-rtl',
    title: 'Testing React Components with React Testing Library',
  },
  {
    id: '14',
    slug: 'understanding-the-react-context-api',
    title: 'Understanding the React Context API',
  },
  {
    id: '15',
    slug: 'dynamic-routes-in-nextjs',
    title: 'Handling Dynamic Routes in Next.js',
  },
  {
    id: '16',
    slug: 'animations-with-framer-motion',
    title: 'Creating Smooth Animations with Framer Motion',
  },
  {
    id: '17',
    slug: 'graphql-with-apollo-client',
    title: 'Fetching Data with GraphQL and Apollo Client',
  },
  {
    id: '18',
    slug: 'optimistic-ui-updates',
    title: 'Implementing Optimistic UI Updates',
  },
  {
    id: '19',
    slug: 'web-vitals-in-nextjs',
    title: 'Monitoring Core Web Vitals in Next.js',
  },
  {
    id: '20',
    slug: 'a-guide-to-react-server-actions',
    title: 'A Guide to React Server Actions',
  },
  {
    id: '21',
    slug: 'nextjs-14-new-features',
    title: 'Exploring the New Features in Next.js 14',
  },
];

// Sort posts alphabetically by title
const sortedBlogPosts = blogPosts.sort((a, b) => a.title.localeCompare(b.title));

export const getBlogPosts = (): BlogPost[] => {
  return sortedBlogPosts;
};

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return sortedBlogPosts.find((post) => post.slug === slug);
};

// Dummy content for the single blog post page since it's not in the data model
export const getDummyPostContent = (title: string) => `
  <h2>Introduction to ${title}</h2>
  <p>This is a placeholder for the full content of the blog post titled "${title}". In a real application, this content would be fetched from a CMS or a database based on the post's slug.</p>
  <p>For now, we are demonstrating the routing and layout structure of the blogs section. Each blog post page like this one is dynamically generated based on the slug in the URL.</p>
  <h2>Key Concepts</h2>
  <p>The implementation uses Next.js App Router with route groups, ensuring that the blogs section is completely isolated from the main e-commerce application. This improves performance and code organization.</p>
`;
