
'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FancyAccordionButton } from './FancyAccordionButton';
import { Download, ImageUp, Trash2, Code, Loader2, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import JSZip from 'jszip';
import { CodeBlock } from '@/components/code-block';

const SIZES = [
  { size: 16, name: 'favicon-16x16.png', type: 'image/png', rel: 'icon' },
  { size: 32, name: 'favicon-32x32.png', type: 'image/png', rel: 'icon' },
  { size: 180, name: 'apple-touch-icon.png', type: 'image/png', rel: 'apple-touch-icon' },
  { size: 192, name: 'android-chrome-192x192.png', type: 'image/png', rel: 'icon' },
  { size: 512, name: 'android-chrome-512x512.png', type: 'image/png', rel: 'icon' },
];

interface GeneratedFavicon {
  size: number;
  name: string;
  blob: Blob;
  src: string;
}

const generateHtmlSnippet = (favicons: GeneratedFavicon[]) => {
  return favicons.map(f => {
    const sizeAttr = `sizes="${f.size}x${f.size}"`;
    return `<link rel="${f.name.includes('apple') ? 'apple-touch-icon' : 'icon'}" type="image/png" ${sizeAttr} href="/${f.name}">`;
  }).join('\n') + `\n<link rel="manifest" href="/site.webmanifest">`;
};


export function FaviconGenerator() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [generatedFavicons, setGeneratedFavicons] = useState<GeneratedFavicon[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = (file: File | null) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        toast({ variant: 'destructive', title: 'Invalid File Type', description: 'Please upload a PNG or JPG image.' });
        return;
    }

    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const src = e.target.result as string;
        setOriginalImage(src);
        generateFavicons(src);
      }
    };
    reader.readAsDataURL(file);
  };

  const generateFavicons = async (src: string) => {
    const image = new window.Image();
    image.src = src;
    image.onload = async () => {
      const favicons = await Promise.all(SIZES.map(s => {
        return new Promise<GeneratedFavicon>(resolve => {
            const canvas = document.createElement('canvas');
            canvas.width = s.size;
            canvas.height = s.size;
            const ctx = canvas.getContext('2d');
            if(ctx) {
                ctx.drawImage(image, 0, 0, s.size, s.size);
                canvas.toBlob(blob => {
                    if(blob) {
                        resolve({
                            size: s.size,
                            name: s.name,
                            blob,
                            src: URL.createObjectURL(blob),
                        });
                    }
                }, 'image/png');
            }
        });
      }));
      setGeneratedFavicons(favicons);
      setIsProcessing(false);
      toast({ title: 'Favicons generated successfully!' });
    };
    image.onerror = () => {
        setIsProcessing(false);
        toast({ variant: 'destructive', title: 'Image Load Error', description: 'Could not load the uploaded image.' });
    }
  };
  
  const handleDownloadAllZip = async () => {
    if (generatedFavicons.length === 0) return;

    const zip = new JSZip();
    
    generatedFavicons.forEach(favicon => {
        zip.file(favicon.name, favicon.blob);
    });
    
    // Add manifest.json
    const manifest = {
        name: "My Awesome App",
        short_name: "MyApp",
        icons: SIZES.filter(s => s.name.includes('android')).map(s => ({
            src: `/${s.name}`,
            sizes: `${s.size}x${s.size}`,
            type: "image/png"
        })),
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone"
    };
    zip.file("site.webmanifest", JSON.stringify(manifest, null, 2));

    try {
      const content = await zip.generateAsync({ type: "blob" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(content);
      link.download = "favicons.zip";
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (e) {
      toast({ variant: 'destructive', title: 'Failed to create ZIP file.' });
    }
  };

  const handleClear = () => {
    setOriginalImage(null);
    setGeneratedFavicons([]);
  };

  const htmlSnippet = useMemo(() => {
    if (generatedFavicons.length === 0) return '';
    return generateHtmlSnippet(generatedFavicons);
  }, [generatedFavicons]);


  return (
    <div className="w-full">
      <Card className="bg-card/50 dark:bg-card/20 backdrop-blur-sm border-border/50">
        <CardHeader className="items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary mb-4">
                <Star className="h-6 w-6 text-primary-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold font-headline">Image to Favicon Generator</CardTitle>
            <p className="text-muted-foreground">Create all required favicon sizes from a single image.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {!originalImage ? (
            <div 
                className="flex items-center justify-center w-full"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => { e.preventDefault(); handleImageUpload(e.dataTransfer.files?.[0] ?? null); }}
            >
                <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-background/50 hover:bg-background">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <ImageUp className="w-10 h-10 mb-3 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-muted-foreground">Upload a square PNG or JPG</p>
                    </div>
                    <input id="file-upload" type="file" className="hidden" accept="image/png, image/jpeg" onChange={(e) => handleImageUpload(e.target.files?.[0] ?? null)} />
                </label>
            </div>
          ) : (
            <div className="space-y-6">
                <div className="flex justify-center items-center">
                    {isProcessing && <Loader2 className="h-8 w-8 animate-spin" />}
                </div>

                {generatedFavicons.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-center">Generated Favicons</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                            {generatedFavicons.map(f => (
                                <div key={f.name} className="flex flex-col items-center gap-2">
                                    <Image src={f.src} alt={f.name} width={f.size} height={f.size} className="border rounded-md" />
                                    <p className="text-xs text-muted-foreground">{f.size}x{f.size}</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center gap-4 pt-4">
                             <Button onClick={handleDownloadAllZip}>
                                <Download className="mr-2 h-4 w-4" /> Download All (.zip)
                            </Button>
                            <Button onClick={handleClear} variant="destructive">
                                <Trash2 className="mr-2 h-4 w-4" /> Clear
                            </Button>
                        </div>
                         <div className="space-y-2 pt-4">
                            <h3 className="font-semibold text-center">HTML Code</h3>
                            <CodeBlock code={htmlSnippet} language="html" />
                        </div>
                    </div>
                )}
            </div>
          )}
        </CardContent>
      </Card>
      
       <div className="mt-6">
        <Accordion type="single" collapsible>
            <AccordionItem value="guide" className="border-none">
                <AccordionTrigger className="p-0 hover:no-underline [&>svg]:hidden">
                    <FancyAccordionButton />
                </AccordionTrigger>
                <AccordionContent className="mt-2 p-6 rounded-lg bg-card/50 dark:bg-card/20 prose dark:prose-invert max-w-none text-sm">
                    <p>This tool helps you quickly generate all the necessary favicon files for a modern website from a single source image.</p>
                    <ol>
                        <li>Upload a square image (PNG or JPG). This will be your source logo or icon.</li>
                        <li>The tool automatically generates multiple favicon sizes (16x16, 32x32, 192x192, etc.) and an `apple-touch-icon`.</li>
                        <li>You will see a preview of all the generated icons.</li>
                        <li>Click "Download All (.zip)" to get a zip file containing all the PNG icons and a `site.webmanifest` file for Android devices.</li>
                        <li>Copy the provided HTML code and paste it into the `<head>` section of your website.</li>
                    </ol>
                    <p>It's the perfect utility for web developers and designers who need a fast, browser-based way to create a complete set of favicons.</p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
