
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FancyAccordionButton } from './FancyAccordionButton';
import { Download, ImageUp, Trash2, Loader2, Link as LinkIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import JSZip from 'jszip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CodeBlock } from '@/components/code-block';

const FAVICON_SIZES = [16, 32, 48, 96, 144, 192, 512];

interface GeneratedFavicon {
  size: number;
  dataUrl: string;
  blob: Blob;
}

const generateFavicons = (imageSrc: string): Promise<GeneratedFavicon[]> => {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.src = imageSrc;
    img.onload = () => {
      const promises = FAVICON_SIZES.map(size => {
        return new Promise<GeneratedFavicon | null>((resolveCanvas) => {
          const canvas = document.createElement('canvas');
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, size, size);
            canvas.toBlob(blob => {
              if (blob) {
                const dataUrl = canvas.toDataURL('image/png');
                resolveCanvas({ size, dataUrl, blob });
              } else {
                 resolveCanvas(null);
              }
            }, 'image/png');
          } else {
            resolveCanvas(null);
          }
        });
      });
      Promise.all(promises).then((results) => {
          const validFavicons = results.filter(r => r !== null) as GeneratedFavicon[];
          resolve(validFavicons);
      });
    };
    img.onerror = () => reject(new Error('Image could not be loaded.'));
  });
};

const generateHtmlSnippet = () => {
  return `
<!-- Basic Favicon -->
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">

<!-- Apple Touch Icon -->
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">

<!-- Android Chrome Icons -->
<link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png">
<link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png">

<!-- Web App Manifest -->
<link rel="manifest" href="/site.webmanifest">
  `.trim();
};


export function FaviconGenerator() {
  const [originalImage, setOriginalImage] = useState<{ src: string; name: string } | null>(null);
  const [favicons, setFavicons] = useState<GeneratedFavicon[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = async (file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
        toast({ variant: 'destructive', title: 'Invalid file type', description: 'Please upload a valid image file (PNG, JPG, etc.).'});
        return;
    }

    setIsProcessing(true);
    setOriginalImage(null);
    setFavicons([]);
    
    const reader = new FileReader();
    reader.onload = async (e) => {
      if (e.target?.result) {
        setOriginalImage({ src: e.target.result as string, name: file.name });
        try {
          const generated = await generateFavicons(e.target.result as string);
          setFavicons(generated);
          toast({ title: "Favicons generated successfully!" });
        } catch (error) {
          toast({ variant: 'destructive', title: "Failed to process image.", description: (error as Error).message });
        } finally {
          setIsProcessing(false);
        }
      }
    };
    reader.readAsDataURL(file);
  };
  
  const handleDownloadAllZip = async () => {
    if (favicons.length === 0) {
      toast({ variant: 'destructive', title: 'No favicons to download. Please generate them first.' });
      return;
    }

    const zip = new JSZip();
    favicons.forEach((favicon) => {
        const fileName = `favicon-${favicon.size}x${favicon.size}.png`;
        zip.file(fileName, favicon.blob);
    });

    try {
      const content = await zip.generateAsync({ type: "blob" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(content);
      link.download = `favicons.zip`;
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (e) {
      console.error(e);
      toast({ variant: 'destructive', title: 'Failed to create ZIP file.' });
    }
  };

  const handleClear = () => {
    setOriginalImage(null);
    setFavicons([]);
  };

  return (
    <div className="w-full">
      <Card className="bg-card/50 dark:bg-card/20 backdrop-blur-sm border-border/50">
        <CardHeader className="items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary mb-4">
                <LinkIcon className="h-6 w-6 text-primary-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold font-headline">Image to Favicon Converter</CardTitle>
            <p className="text-muted-foreground">Create favicons for your website from any image.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div 
              className="flex items-center justify-center w-full"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      handleImageUpload(e.dataTransfer.files[0]);
                  }
              }}
          >
              <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-background/50 hover:bg-background">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <ImageUp className="w-10 h-10 mb-3 text-muted-foreground" />
                      <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-muted-foreground">Upload a PNG, JPG, or other image file</p>
                  </div>
                  <input id="file-upload" type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e.target.files ? e.target.files[0] : null)} />
              </label>
          </div>

          {isProcessing && (
            <div className="flex justify-center items-center py-4">
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
              <span>Generating favicons...</span>
            </div>
          )}

          {favicons.length > 0 && !isProcessing && (
            <div className="space-y-6">
                <div className="flex justify-center gap-4">
                    <Button onClick={handleDownloadAllZip}>
                        <Download className="mr-2 h-4 w-4" /> Download All (.zip)
                    </Button>
                    <Button onClick={handleClear} variant="destructive">
                        <Trash2 className="mr-2 h-4 w-4" /> Clear
                    </Button>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-center mb-4">Generated Favicons</h3>
                  <ScrollArea className="h-48 w-full">
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 p-4 border rounded-md">
                    {favicons.map((favicon) => (
                        <div key={favicon.size} className="flex flex-col items-center gap-2">
                           <div className="p-2 border rounded-md bg-background/50">
                            <Image src={favicon.dataUrl} alt={`Favicon ${favicon.size}x${favicon.size}`} width={favicon.size} height={favicon.size} className="max-w-full max-h-12"/>
                           </div>
                           <p className="text-xs font-mono">{favicon.size}x{favicon.size}</p>
                        </div>
                    ))}
                    </div>
                  </ScrollArea>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-center mb-4">How to Use</h3>
                  <p className="text-sm text-muted-foreground text-center mb-2">Copy this code into the `<head>` section of your HTML.</p>
                  <CodeBlock code={generateHtmlSnippet()} language="html" />
                </div>
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
                    <p>This tool makes it easy to generate all the necessary favicon files for a modern website from a single image.</p>
                    <ol>
                        <li>Upload your logo or any square image by clicking the upload area or by dragging and dropping a file.</li>
                        <li>The tool will automatically generate favicons in multiple standard sizes (16x16, 32x32, 192x192, etc.).</li>
                        <li>Click "Download All (.zip)" to get a zip file containing all the generated PNG icons.</li>
                        <li>Copy the provided HTML code and paste it into the `&lt;head&gt;` section of your website's HTML files.</li>
                        <li>Upload the downloaded favicon files to the root directory of your website.</li>
                    </ol>
                    <p>It's an essential utility for web developers and site owners who want to ensure their website looks professional on all browsers and devices.</p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
