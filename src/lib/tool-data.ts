
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
];

const sortedTools = tools.sort((a, b) => a.title.localeCompare(b.title));

export const getTools = (): Tool[] => {
  return sortedTools;
};

export const getToolBySlug = (slug: string): Tool | undefined => {
  return sortedTools.find((tool) => tool.slug === slug);
};

export const getDummyToolContent = (title: string) => `
  <p>The implementation for the "${title}" tool will be displayed here.</p>
`;
