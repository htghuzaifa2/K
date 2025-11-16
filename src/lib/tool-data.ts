
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
    id: 'hashtag-generator',
    slug: 'hashtag-generator',
    title: 'Hashtag Generator',
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
    id: 'urdu-translator',
    slug: 'urdu-translator',
    title: 'Urdu / Roman-Urdu Translator',
  },
  {
    id: 'voice-to-text',
    slug: 'voice-to-text',
    title: 'Voice-to-Text (Urdu + English)',
  },
  {
    id: 'local-seo-keyword-generator',
    slug: 'local-seo-keyword-generator',
    title: 'Local SEO Keyword Idea Generator',
  },
  {
    id: 'voice-search-query-predictor',
    slug: 'voice-search-query-predictor',
    title: 'Voice Search Query Predictor',
  },
  {
    id: 'content-summarizer',
    slug: 'content-summarizer',
    title: 'AI Content Summarizer (Urdu + English)',
  },
  {
    id: 'url-qr-code-generator',
    slug: 'url-qr-code-generator',
    title: 'URL QR Code Generator',
  },
  {
    id: 'local-weather',
    slug: 'local-weather',
    title: 'Local Weather',
  },
  {
    id: 'prayer-times',
    slug: 'prayer-times',
    title: 'Prayer Times',
  },
  {
    id: 'pakistan-trend-tracker',
    slug: 'pakistan-trend-tracker',
    title: 'Pakistan Trend Tracker',
  },
  {
    id: 'youtube-seo-generator',
    slug: 'youtube-seo-generator',
    title: 'YouTube SEO Generator',
  },
  {
    id: 'ai-image-creator',
    slug: 'ai-image-creator',
    title: 'AI Image Creator',
  }
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
