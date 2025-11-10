
export interface Tool {
  slug: string;
  title: string;
  id: string;
}

const tools: Tool[] = [
  {
    id: 'lorem-ipsum-generator',
    slug: 'lorem-ipsum-generator',
    title: 'Lorem Ipsum Generator',
  },
  {
    id: 'text-difference-checker',
    slug: 'text-difference-checker',
    title: 'Text Difference Checker',
  },
];

// Sort tools by reversing the array, so latest added is first.
const sortedTools = [...tools].reverse();

export const getTools = (): Tool[] => {
  return sortedTools;
};

export const getToolBySlug = (slug: string): Tool | undefined => {
  return tools.find((tool) => tool.slug === slug);
};

export const getDummyToolContent = (title: string): string => `
  <p>The online tool "${title}" is not yet implemented.</p>
  <p>Please check back later or explore our other available tools.</p>
`;
