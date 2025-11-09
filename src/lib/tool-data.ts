
export interface Tool {
  slug: string;
  title: string;
  id: string;
}

const tools: Tool[] = [
  { id: '1', slug: 'json-formatter', title: 'JSON Formatter' },
  { id: '2', slug: 'color-converter', title: 'Color Converter' },
  { id: '3', slug: 'base64-encoder-decoder', title: 'Base64 Encoder/Decoder' },
  { id: '4', slug: 'url-encoder-decoder', title: 'URL Encoder/Decoder' },
  { id: '5', slug: 'px-to-rem-converter', title: 'PX to REM Converter' },
  { id: '6', slug: 'lorem-ipsum-generator', title: 'Lorem Ipsum Generator' },
  { id: '7', slug: 'uuid-generator', title: 'UUID Generator' },
  { id: '8', slug: 'character-counter', title: 'Character & Word Counter' },
  { id: '9', slug: 'box-shadow-generator', title: 'Box Shadow Generator' },
  { id: '10', slug: 'gradient-generator', title: 'CSS Gradient Generator' },
  { id: '11', slug: 'image-compressor', title: 'Image Compressor' },
  { id: '12', slug: 'markdown-preview', title: 'Markdown Preview' },
  { id: '13', slug: 'password-generator', title: 'Secure Password Generator' },
  { id: '14', slug: 'case-converter', title: 'Case Converter' },
  { id: '15', slug: 'qr-code-generator', title: 'QR Code Generator' },
  { id: '16', slug: 'svg-optimizer', title: 'SVG Optimizer' },
  { id: '17', slug: 'json-to-typescript-converter', title: 'JSON to TypeScript Converter' },
  { id: '18', slug: 'http-status-codes-cheat-sheet', title: 'HTTP Status Codes Cheat Sheet' },
  { id: '19', slug: 'jwt-debugger', title: 'JWT Debugger' },
  { id: '20', slug: 'cron-job-generator', title: 'Cron Job Generator' },
  { id: '21', slug: 'css-minifier', title: 'CSS Minifier' },
];

const sortedTools = tools.sort((a, b) => a.title.localeCompare(b.title));

export const getTools = (): Tool[] => {
  return sortedTools;
};

export const getToolBySlug = (slug: string): Tool | undefined => {
  return sortedTools.find((tool) => tool.slug === slug);
};

export const getDummyToolContent = (title: string) => `
  <h2>About the ${title} Tool</h2>
  <p>This is a placeholder page for the ${title} tool. In a real application, the actual tool's user interface and logic would be implemented here.</p>
  <p>The purpose of this page is to demonstrate the isolated routing and layout structure for the "Tools" section of the website.</p>
`;
