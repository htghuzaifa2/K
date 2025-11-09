
export interface Tool {
  slug: string;
  title: string;
  description: string;
  category: string;
  content: string;
}

const tools: Tool[] = [
  {
    slug: 'json-formatter',
    title: 'JSON Formatter',
    description: 'A simple tool to format and validate JSON data.',
    category: 'Development',
    content: '<p>Paste your JSON data into the text area to format it into a readable, indented structure. The tool will also validate your JSON and highlight any syntax errors.</p>',
  },
  {
    slug: 'color-converter',
    title: 'Color Converter',
    description: 'Convert colors between HEX, RGB, and HSL formats.',
    category: 'Design',
    content: '<p>Easily convert color codes from one format to another. Supports HEX, RGB, and HSL values. A color picker is included for easy color selection.</p>',
  },
  // Add 18 more dummy tools
  {
    slug: 'base64-encoder-decoder',
    title: 'Base64 Encoder/Decoder',
    description: 'Encode text to Base64 or decode a Base64 string back to text.',
    category: 'Development',
    content: '<p>A quick and easy tool for Base64 encoding and decoding. Useful for handling data in web applications.</p>',
  },
  {
    slug: 'url-encoder-decoder',
    title: 'URL Encoder/Decoder',
    description: 'Encode or decode strings for use in URLs.',
    category: 'Development',
    content: '<p>This tool helps you encode special characters in a string to be safely used in a URL, or decode them back to their original form.</p>',
  },
  {
    slug: 'px-to-rem-converter',
    title: 'PX to REM Converter',
    description: 'Convert pixel values to REM units for responsive design.',
    category: 'Design',
    content: '<p>A handy calculator for converting pixels to REM units based on a given base font size. Essential for modern, scalable web design.</p>',
  },
  {
    slug: 'lorem-ipsum-generator',
    title: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text for your designs and mockups.',
    category: 'Design',
    content: '<p>Quickly generate paragraphs, sentences, or words of Lorem Ipsum text to use as placeholders in your projects.</p>',
  },
  {
    slug: 'uuid-generator',
    title: 'UUID Generator',
    description: 'Generate universally unique identifiers (UUIDs).',
    category: 'Development',
    content: '<p>Create version 4 UUIDs with a single click. Useful for generating unique IDs for database records, keys, and more.</p>',
  },
  {
    slug: 'character-counter',
    title: 'Character & Word Counter',
    description: 'Count characters, words, and lines in a piece of text.',
    category: 'Writing',
    content: '<p>A simple utility to get statistics on your text, including character count, word count, and line count.</p>',
  },
  {
    slug: 'box-shadow-generator',
    title: 'Box Shadow Generator',
    description: 'Create custom CSS box shadows with a visual editor.',
    category: 'Design',
    content: '<p>Visually design complex CSS box shadows and get the corresponding CSS code instantly. Control offset, blur, spread, and color.</p>',
  },
  {
    slug: 'gradient-generator',
    title: 'CSS Gradient Generator',
    description: 'Create beautiful linear and radial gradients.',
    category: 'Design',
    content: '<p>A visual tool to build CSS gradients. Choose colors, angle, and type (linear or radial) and copy the generated code.</p>',
  },
  {
    slug: 'image-compressor',
    title: 'Image Compressor',
    description: 'Reduce the file size of your images online.',
    category: 'Media',
    content: '<p>An online tool to compress JPG, PNG, and WebP images to reduce their file size without significant loss in quality.</p>',
  },
  {
    slug: 'markdown-preview',
    title: 'Markdown Preview',
    description: 'Write Markdown and see the rendered HTML in real-time.',
    category: 'Writing',
    content: '<p>A live editor that lets you write Markdown on one side and see the instant preview on the other. Great for drafting docs and posts.</p>',
  },
  {
    slug: 'password-generator',
    title: 'Secure Password Generator',
    description: 'Generate strong, random passwords to improve your security.',
    category: 'Security',
    content: '<p>Create secure, customizable passwords. Choose the length and whether to include numbers, symbols, and uppercase letters.</p>',
  },
  {
    slug: 'case-converter',
    title: 'Case Converter',
    description: 'Convert text to various cases like uppercase, lowercase, etc.',
    category: 'Writing',
    content: '<p>Easily convert blocks of text into different cases: UPPERCASE, lowercase, Title Case, Sentence case, and more.</p>',
  },
  {
    slug: 'qr-code-generator',
    title: 'QR Code Generator',
    description: 'Create QR codes for URLs, text, and more.',
    category: 'Utilities',
    content: '<p>Generate a QR code from any text or URL. You can download the generated QR code as a PNG image.</p>',
  },
  {
    slug: 'svg-optimizer',
    title: 'SVG Optimizer',
    description: 'Optimize SVG files by removing unnecessary data.',
    category: 'Design',
    content: '<p>Reduce the file size of your SVG files by cleaning up the code without affecting the visual output.</p>',
  },
  {
    slug: 'json-to-typescript-converter',
    title: 'JSON to TypeScript Converter',
    description: 'Generate TypeScript interfaces from JSON data.',
    category: 'Development',
    content: '<p>Automatically generate TypeScript interfaces from a JSON object, saving you time and effort in typed projects.</p>',
  },
  {
    slug: 'http-status-codes-cheat-sheet',
    title: 'HTTP Status Codes',
    description: 'A quick reference for HTTP status codes.',
    category: 'Development',
    content: '<p>A searchable list of all HTTP status codes (1xx, 2xx, 3xx, 4xx, 5xx) with their meanings. A handy cheat sheet for developers.</p>',
  },
];

const sortedTools = tools.sort((a, b) => a.title.localeCompare(b.title));

export const getTools = (): Tool[] => {
  return sortedTools;
};

export const getToolBySlug = (slug: string): Tool | undefined => {
  return sortedTools.find((tool) => tool.slug === slug);
};

export const getToolCategories = (): string[] => {
  const categories = new Set(sortedTools.map(tool => tool.category));
  return Array.from(categories).sort();
}
