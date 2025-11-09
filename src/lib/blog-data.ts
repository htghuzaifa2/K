
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  content: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    slug: 'understanding-server-components',
    title: 'Understanding Server Components in Next.js 14',
    excerpt: 'A deep dive into how Server Components work and how they improve performance.',
    author: 'Jane Doe',
    date: '2024-05-15',
    content: '<p>Server Components are a new paradigm in React development, introduced with Next.js. They allow you to write UI that is rendered entirely on the server, resulting in zero client-side JavaScript for that component. This article explores the benefits, trade-offs, and best practices for using them effectively in your Next.js 14 applications.</p><p>We will cover topics such as data fetching, state management, and when to choose a Server Component over a Client Component.</p>',
    tags: ['Next.js', 'React', 'Performance'],
  },
  {
    slug: 'css-modules-for-styling',
    title: 'Scoped Styling with CSS Modules',
    excerpt: 'Learn how to use CSS Modules to create locally-scoped styles and avoid naming conflicts.',
    author: 'John Smith',
    date: '2024-05-10',
    content: '<p>CSS Modules provide a way to write CSS that is scoped locally to a specific component. This means you can use simple class names without worrying about them conflicting with styles in other parts of your application. In this post, we will walk through setting up and using CSS Modules in a Next.js project to build maintainable and conflict-free styles.</p>',
    tags: ['CSS', 'Next.js', 'Styling'],
  },
  // Add 18 more dummy posts to have at least 20 for pagination
  {
    slug: 'getting-started-with-typescript',
    title: 'Getting Started with TypeScript in React',
    excerpt: 'A beginner-friendly guide to integrating TypeScript into your React projects.',
    author: 'Alice Johnson',
    date: '2024-05-08',
    content: '<p>TypeScript adds static typing to JavaScript, helping you catch errors early and write more robust code. This guide shows you how to set up a new React project with TypeScript and how to start using its powerful features like interfaces and types.</p>',
    tags: ['TypeScript', 'React', 'Beginner'],
  },
  {
    slug: 'advanced-react-hooks',
    title: 'Advanced React Hooks Explained',
    excerpt: 'Explore powerful hooks like useMemo, useCallback, and useReducer.',
    author: 'Bob Brown',
    date: '2024-05-05',
    content: '<p>Beyond useState and useEffect, React offers a suite of advanced hooks that can optimize performance and manage complex state. This post breaks down useMemo, useCallback, and useReducer with practical examples.</p>',
    tags: ['React', 'Hooks', 'Advanced'],
  },
  {
    slug: 'building-a-rest-api-with-nextjs',
    title: 'Building a REST API with Next.js API Routes',
    excerpt: 'Leverage the power of Next.js to build serverless API endpoints.',
    author: 'Charlie Davis',
    date: '2024-05-01',
    content: '<p>Next.js API Routes make it incredibly simple to create a backend for your frontend application, all within the same project. Learn how to handle different HTTP methods, process requests, and send back JSON responses.</p>',
    tags: ['Next.js', 'API', 'Backend'],
  },
  {
    slug: 'seo-best-practices-for-nextjs',
    title: 'SEO Best Practices for Next.js Apps',
    excerpt: 'Optimize your Next.js application for search engines with these tips.',
    author: 'Diana Evans',
    date: '2024-04-28',
    content: '<p>Learn how to use Next.js features like server-side rendering, static site generation, and metadata API to improve your site\'s SEO ranking.</p>',
    tags: ['SEO', 'Next.js', 'Marketing'],
  },
  {
    slug: 'state-management-with-zustand',
    title: 'Simple State Management with Zustand',
    excerpt: 'A lightweight and unopinionated state management solution for React.',
    author: 'Frank Green',
    date: '2024-04-25',
    content: '<p>Tired of boilerplate? Zustand offers a minimalistic API for managing state in your React applications without the complexity of other libraries.</p>',
    tags: ['React', 'State Management', 'Zustand'],
  },
  {
    slug: 'deploying-nextjs-to-vercel',
    title: 'Deploying Your Next.js App to Vercel',
    excerpt: 'A step-by-step guide to deploying your application on the Vercel platform.',
    author: 'Grace Harris',
    date: '2024-04-22',
    content: '<p>Deploying a Next.js app has never been easier, thanks to Vercel. This guide will walk you through the process from pushing to Git to a live production URL.</p>',
    tags: ['Next.js', 'Deployment', 'Vercel'],
  },
  {
    slug: 'creating-a-design-system-with-storybook',
    title: 'Creating a Design System with Storybook',
    excerpt: 'Build, test, and document your UI components in isolation.',
    author: 'Henry Irving',
    date: '2024-04-19',
    content: '<p>Storybook is an essential tool for developing robust and reusable UI components. Learn how to set it up for your React project.</p>',
    tags: ['React', 'Storybook', 'Design System'],
  },
  {
    slug: 'image-optimization-in-nextjs',
    title: 'Mastering Image Optimization in Next.js',
    excerpt: 'Use the built-in next/image component to automatically optimize your images.',
    author: 'Ivy Jenkins',
    date: '2024-04-15',
    content: '<p>Images can be a major performance bottleneck. The next/image component solves this by providing automatic optimization, resizing, and modern format conversion.</p>',
    tags: ['Next.js', 'Images', 'Performance'],
  },
  {
    slug: 'intro-to-tailwind-css',
    title: 'Introduction to Tailwind CSS',
    excerpt: 'A utility-first CSS framework for rapid UI development.',
    author: 'Jack King',
    date: '2024-04-12',
    content: '<p>Tailwind CSS allows you to build custom designs without ever leaving your HTML. Learn the basics of this popular CSS framework.</p>',
    tags: ['CSS', 'Tailwind', 'Styling'],
  },
  {
    slug: 'authentication-with-nextauth',
    title: 'Authentication in Next.js with NextAuth.js',
    excerpt: 'Add robust authentication to your Next.js app with ease.',
    author: 'Karen Lee',
    date: '2024-04-09',
    content: '<p>NextAuth.js simplifies adding authentication, supporting OAuth providers, email/password, and more. This tutorial covers the setup and basic usage.</p>',
    tags: ['Next.js', 'Authentication', 'Security'],
  },
  {
    slug: 'testing-react-components-with-rtl',
    title: 'Testing React Components with React Testing Library',
    excerpt: 'Write tests that resemble how your users interact with your components.',
    author: 'Leo Martin',
    date: '2024-04-05',
    content: '<p>React Testing Library encourages good testing practices. Learn how to write meaningful tests for your components that give you confidence in your code.</p>',
    tags: ['React', 'Testing', 'RTL'],
  },
  {
    slug: 'understanding-the-react-context-api',
    title: 'Understanding the React Context API',
    excerpt: 'Manage global state without the need for prop drilling.',
    author: 'Mia Nelson',
    date: '2024-04-01',
    content: '<p>The Context API is React\'s built-in solution for state management. This guide explains how to use it to share state across your component tree.</p>',
    tags: ['React', 'Context API', 'State Management'],
  },
  {
    slug: 'dynamic-routes-in-nextjs',
    title: 'Handling Dynamic Routes in Next.js',
    excerpt: 'Create pages with dynamic paths, like blog posts or product pages.',
    author: 'Noah Olsen',
    date: '2024-03-28',
    content: '<p>Learn how to use Next.js file-system based routing to create dynamic routes for content that is generated from a data source.</p>',
    tags: ['Next.js', 'Routing', 'Dynamic'],
  },
  {
    slug: 'animations-with-framer-motion',
    title: 'Creating Smooth Animations with Framer Motion',
    excerpt: 'A powerful and easy-to-use animation library for React.',
    author: 'Olivia Perez',
    date: '2024-03-25',
    content: '<p>Add delightful animations and micro-interactions to your React apps with Framer Motion\'s declarative API.</p>',
    tags: ['React', 'Animation', 'Framer Motion'],
  },
  {
    slug: 'graphql-with-apollo-client',
    title: 'Fetching Data with GraphQL and Apollo Client',
    excerpt: 'A modern approach to data fetching in your React applications.',
    author: 'Peter Quinn',
    date: '2024-03-22',
    content: '<p>GraphQL provides a more efficient and flexible alternative to REST. Learn how to use it in your Next.js app with Apollo Client.</p>',
    tags: ['GraphQL', 'React', 'Data Fetching'],
  },
  {
    slug: 'optimistic-ui-updates',
    title: 'Implementing Optimistic UI Updates',
    excerpt: 'Improve perceived performance by updating the UI before the server responds.',
    author: 'Quincy Roberts',
    date: '2024-03-18',
    content: '<p>Optimistic UI updates can make your application feel much faster. This post covers the pattern and how to implement it in a React application.</p>',
    tags: ['React', 'UX', 'Performance'],
  },
  {
    slug: 'web-vitals-in-nextjs',
    title: 'Monitoring Core Web Vitals in Next.js',
    excerpt: 'Understand and improve your application\'s performance metrics.',
    author: 'Rachel Scott',
    date: '2024-03-14',
    content: '<p>Core Web Vitals are key metrics for measuring user experience. Next.js has built-in support for measuring and reporting these vitals.</p>',
    tags: ['Next.js', 'Performance', 'Web Vitals'],
  },
];

// Sort posts by date in descending order (newest first)
const sortedBlogPosts = blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const getBlogPosts = (): BlogPost[] => {
  return sortedBlogPosts;
};

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return sortedBlogPosts.find((post) => post.slug === slug);
};
