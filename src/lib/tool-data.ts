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
  {
    id: 'random-string-generator',
    slug: 'random-string-generator',
    title: 'Random String Generator',
  },
  {
    id: 'text-statistics-tool',
    slug: 'text-statistics-tool',
    title: 'Text Statistics Tool',
  },
  {
    id: 'number-to-words-converter',
    slug: 'number-to-words-converter',
    title: 'Number to Words Converter',
  },
  {
    id: 'regex-tester',
    slug: 'regex-tester',
    title: 'Regex Tester',
  },
  {
    id: 'text-scrambler',
    slug: 'text-scrambler',
    title: 'Text Scrambler',
  },
  {
    id: 'base-converter',
    slug: 'base-converter',
    title: 'Base Converter',
  },
  {
    id: 'json-prettify-compress-toggle',
    slug: 'json-prettify-compress-toggle',
    title: 'JSON Prettify & Compress Toggle',
  },
  {
    id: 'url-qr-code-generator',
    slug: 'url-qr-code-generator',
    title: 'URL to QR Code Generator',
  },
  {
    id: 'image-optimizer',
    slug: 'image-optimizer',
    title: 'Image Optimizer',
  },
  {
    id: 'webp-converter',
    slug: 'webp-converter',
    title: 'WEBP Converter',
  },
  {
    id: 'image-converter',
    slug: 'image-converter',
    title: 'Image Converter',
  },
  {
    id: 'image-quality-compressor',
    slug: 'image-quality-compressor',
    title: 'Image Compressor & Quality Preview',
  },
  {
    id: 'svg-converter',
    slug: 'svg-converter',
    title: 'Image to SVG Converter',
  },
  {
    id: 'roman-urdu-typing-test',
    slug: 'roman-urdu-typing-test',
    title: 'Roman-Urdu Typing Test',
  },
  {
    id: 'urdu-typing-test',
    slug: 'urdu-typing-test',
    title: 'Urdu Script Typing Test',
  },
  {
    id: 'slang-typing-test',
    slug: 'slang-typing-test',
    title: 'Pakistani Slang Typing Challenge',
  },
  {
    id: 'english-typing-test',
    slug: 'english-typing-test',
    title: 'English Typing Speed Test',
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
