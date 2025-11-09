
export interface BlogPost {
  slug: string;
  title: string;
  id: string;
}

const blogPosts: BlogPost[] = [];

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
  <p>Content for "${title}" will be displayed here once it's created.</p>
`;
