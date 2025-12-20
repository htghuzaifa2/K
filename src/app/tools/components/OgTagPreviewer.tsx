'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FancyAccordionButton } from './FancyAccordionButton';
import { Clipboard, ImageUp, Link, Code, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import { APP_NAME } from '@/lib/constants';

function GooglePreview({ title, description, url }: { title: string; description: string; url: string }) {
    const displayUrl = url.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];
    return (
        <div className="p-4 bg-background rounded-lg border w-full max-w-2xl mx-auto font-sans">
            <div className="text-sm text-[#202124] dark:text-[#bdc1c6]">{displayUrl}</div>
            <h3 className="text-xl text-[#1a0dab] dark:text-[#8ab4f8] font-medium truncate group-hover:underline">{title || 'Your Title Here'}</h3>
            <p className="text-sm text-[#4d5156] dark:text-[#bdc1c6] mt-1 line-clamp-2">{description || 'Your description will appear here. Keep it concise and engaging to attract clicks.'}</p>
        </div>
    );
}

function FacebookPreview({ title, description, image, url }: { title: string; description: string; image: string; url: string }) {
    const displayUrl = url.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];
    return (
        <div className="border bg-background rounded-lg overflow-hidden w-full max-w-md mx-auto">
            {image ? (
                <div className="relative aspect-video bg-muted">
                    <Image src={image} alt="Preview" fill className="object-cover" />
                </div>
            ) : (
                <div className="relative aspect-video bg-muted flex items-center justify-center text-muted-foreground">No Image Provided</div>
            )}
            <div className="p-3 bg-gray-100 dark:bg-gray-800">
                <div className="text-xs uppercase text-gray-500 dark:text-gray-400">{displayUrl}</div>
                <h3 className="font-bold text-gray-900 dark:text-white mt-1 truncate">{title || 'Your Title Here'}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">{description || 'Your description will appear here.'}</p>
            </div>
        </div>
    );
}

function TwitterPreview({ title, description, image, url }: { title: string; description: string; image: string; url: string }) {
    const displayUrl = url.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];
    return (
        <div className="border bg-background rounded-xl overflow-hidden w-full max-w-md mx-auto">
            {image ? (
                <div className="relative aspect-video border-b">
                    <Image src={image} alt="Preview" fill className="object-cover" />
                </div>
            ) : (
                <div className="relative aspect-video border-b bg-muted flex items-center justify-center text-muted-foreground">No Image Provided</div>
            )}
            <div className="p-3">
                <div className="text-sm text-gray-500 dark:text-gray-400">{displayUrl}</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mt-1 truncate">{title || 'Your Title Here'}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">{description || 'Your description will appear here.'}</p>
            </div>
        </div>
    );
}

function GeneratedTags({ title, description, image, url }: { title: string; description: string; image: string; url: string }) {
    const tags = `<!-- Essential OG Tags -->
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${image}">
<meta property="og:url" content="${url}">
<meta property="og:type" content="website">

<!-- Twitter Card Tags -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="${image}">`;
    
    const { toast } = useToast();

    const handleCopy = () => {
        navigator.clipboard.writeText(tags);
        toast({ title: 'Meta tags copied to clipboard!' });
    };

    return (
        <div className="space-y-4">
             <h3 className="text-xl font-semibold text-center">Generated Meta Tags</h3>
            <div className="relative">
                <pre className="bg-muted text-muted-foreground p-4 rounded-md overflow-x-auto text-sm">
                    <code className="font-mono">{tags}</code>
                </pre>
                <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={handleCopy}>
                    <Clipboard className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}


export function OgTagPreviewer() {
  const [title, setTitle] = useState('My Awesome Website');
  const [description, setDescription] = useState('This is a great description for my website that will entice users to click.');
  const [url, setUrl] = useState(`https://www.${APP_NAME.toLowerCase()}`);
  const [imageUrl, setImageUrl] = useState('https://picsum.photos/seed/og-image/1200/630');
  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null);

  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (tempImageUrl) {
        URL.revokeObjectURL(tempImageUrl);
      }
      const objectUrl = URL.createObjectURL(file);
      setTempImageUrl(objectUrl);
      setImageUrl(objectUrl); 
    }
  };

  const handleClear = () => {
    setTitle('');
    setDescription('');
    setUrl('');
    setImageUrl('');
    if (tempImageUrl) {
      URL.revokeObjectURL(tempImageUrl);
      setTempImageUrl(null);
    }
  };
  
  const displayImage = useMemo(() => {
    return tempImageUrl || imageUrl;
  }, [tempImageUrl, imageUrl]);

  return (
    <div className="w-full">
      <Card className="bg-card/50 dark:bg-card/20 backdrop-blur-sm border-border/50">
        <CardHeader className="items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary mb-4">
            <Code className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-3xl font-bold font-headline">All-in-One Social Preview</CardTitle>
          <p className="text-muted-foreground">See how your link will look on Google, Facebook, and Twitter.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter your page title" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter a brief description" rows={3} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="url">URL</Label>
                    <Input id="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="imageUrl">Image URL</Label>
                    <div className="flex gap-2">
                         <Input id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://example.com/image.jpg" />
                         <Button asChild variant="outline">
                            <label htmlFor="imageUpload" className="cursor-pointer"><ImageUp className="h-4 w-4" /><span className="sr-only">Upload</span></label>
                         </Button>
                         <input id="imageUpload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </div>
                </div>
                <div className="text-center">
                    <Button onClick={handleClear} variant="destructive" size="sm">
                        <RefreshCw className="mr-2 h-4 w-4"/> Clear All Fields
                    </Button>
                </div>
            </div>
            
            <div className="space-y-4">
              <Tabs defaultValue="google" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="google">Google</TabsTrigger>
                  <TabsTrigger value="facebook">Facebook</TabsTrigger>
                  <TabsTrigger value="twitter">Twitter</TabsTrigger>
                </TabsList>
                <TabsContent value="google" className="mt-4 flex justify-center">
                  <GooglePreview title={title} description={description} url={url} />
                </TabsContent>
                <TabsContent value="facebook" className="mt-4 flex justify-center">
                  <FacebookPreview title={title} description={description} image={displayImage} url={url} />
                </TabsContent>
                <TabsContent value="twitter" className="mt-4 flex justify-center">
                  <TwitterPreview title={title} description={description} image={displayImage} url={url} />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div className="pt-6 border-t">
              <GeneratedTags title={title} description={description} image={displayImage} url={url} />
          </div>

        </CardContent>
      </Card>
      
      <div className="mt-6">
        <Accordion type="single" collapsible>
          <AccordionItem value="guide" className="border-none">
            <AccordionTrigger className="p-0 hover:no-underline [&>svg]:hidden">
              <FancyAccordionButton />
            </AccordionTrigger>
            <AccordionContent className="mt-2 p-6 rounded-lg bg-card/50 dark:bg-card/20 prose dark:prose-invert max-w-none text-sm">
              <p>This tool helps you preview how your webpage will look when shared on social media or found on Google.</p>
              <ol>
                <li>Fill in the <strong>Title</strong>, <strong>Description</strong>, and <strong>URL</strong> for your webpage.</li>
                <li>Provide an <strong>Image URL</strong> or upload an image from your computer to see how it will appear in social shares.</li>
                <li>Switch between the <strong>Google</strong>, <strong>Facebook</strong>, and <strong>Twitter</strong> tabs to see a live preview for each platform.</li>
                <li>The tool will automatically generate the necessary <strong>meta tags</strong> for you. Copy and paste them into the `<head>` section of your website’s HTML.</li>
              </ol>
              <p>It’s perfect for digital marketers, SEO specialists, and developers who want to ensure their content looks professional and clickable everywhere it’s shared.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
