
'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FancyAccordionButton } from './FancyAccordionButton';
import { Download, ImageUp, Sparkles, Trash2, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import Image from 'next/image';

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export function ImageOptimizer() {
  const [originalImage, setOriginalImage] = useState<{ src: string; name: string; size: number } | null>(null);
  const [optimizedImage, setOptimizedImage] = useState<{ src: string; size: number } | null>(null);
  const [quality, setQuality] = useState(80);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({ variant: 'destructive', title: 'Invalid file type', description: 'Please upload an image.' });
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setOriginalImage({ src: e.target.result as string, name: file.name, size: file.size });
        optimizeImage(e.target.result as string, quality / 100);
      }
    };
    reader.readAsDataURL(file);
  };

  const optimizeImage = useCallback((imageSrc: string, qualityValue: number) => {
    setIsLoading(true);
    const img = new window.Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg', qualityValue);
        const base64Data = dataUrl.split(',')[1];
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/jpeg' });
        
        setOptimizedImage({ src: dataUrl, size: blob.size });
      }
      setIsLoading(false);
    };
    img.onerror = () => {
        setIsLoading(false);
        toast({variant: 'destructive', title: 'Error loading image'});
    }
  }, [toast]);
  
  const handleQualityChange = (value: number[]) => {
      setQuality(value[0]);
      if(originalImage) {
          optimizeImage(originalImage.src, value[0] / 100);
      }
  }

  const handleDownload = () => {
    if (optimizedImage) {
      const link = document.createElement('a');
      link.href = optimizedImage.src;
      const originalName = originalImage?.name.split('.').slice(0, -1).join('.') || 'optimized-image';
      link.download = `${originalName}.jpg`;
      link.click();
    }
  };

  const handleClear = () => {
      setOriginalImage(null);
      setOptimizedImage(null);
  }

  return (
    <div className="w-full">
      <Card className="bg-card/50 dark:bg-card/20 backdrop-blur-sm border-border/50">
        <CardHeader className="items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary mb-4">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold font-headline">Image Optimizer</CardTitle>
            <p className="text-muted-foreground">Compress and convert images to JPG without losing quality.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {!originalImage ? (
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
                <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-background/50 hover:bg-background">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <ImageUp className="w-10 h-10 mb-3 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-muted-foreground">PNG, JPG, GIF, WEBP, etc.</p>
                    </div>
                    <input id="file-upload" type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files && handleImageUpload(e.target.files[0])} />
                </label>
            </div> 
          ) : (
            <div className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 text-center">
                        <h3 className="font-semibold">Original</h3>
                        <Image src={originalImage.src} alt="Original" width={300} height={300} className="rounded-md object-contain mx-auto border bg-white" />
                        <p className="text-sm font-mono text-muted-foreground">{formatBytes(originalImage.size)}</p>
                    </div>
                    <div className="space-y-2 text-center">
                        <h3 className="font-semibold">Optimized (JPG)</h3>
                         {isLoading ? (
                            <div className="w-[300px] h-[300px] flex items-center justify-center"><Sparkles className="w-10 h-10 animate-pulse text-primary" /></div>
                         ) : optimizedImage && (
                            <>
                                <Image src={optimizedImage.src} alt="Optimized" width={300} height={300} className="rounded-md object-contain mx-auto border bg-white" />
                                <p className="text-sm font-mono text-muted-foreground">{formatBytes(optimizedImage.size)}</p>
                            </>
                         )}
                    </div>
                 </div>

                 <div className="space-y-4">
                    <Label htmlFor="quality-slider">Quality: {quality}%</Label>
                    <Slider id="quality-slider" min={1} max={100} step={1} value={[quality]} onValueChange={handleQualityChange} />
                 </div>

                 <div className="flex flex-wrap justify-center gap-4">
                     <Button onClick={handleDownload} disabled={!optimizedImage || isLoading}>
                        <Download className="mr-2 h-4 w-4" /> Download Optimized Image
                    </Button>
                    <Button onClick={handleClear} variant="destructive">
                        <Trash2 className="mr-2 h-4 w-4" /> Clear
                    </Button>
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
                    <p>This tool helps you compress and convert your images to JPG format directly in your browser, making them smaller for web use without a significant loss in quality.</p>
                    <ol>
                        <li>Upload an image by clicking the upload area or by dragging and dropping a file onto it.</li>
                        <li>Once uploaded, you will see the original image and a preview of the optimized JPG version.</li>
                        <li>Use the "Quality" slider to adjust the compression level. A lower quality percentage results in a smaller file size.</li>
                        <li>The preview and file size will update in real-time as you adjust the quality.</li>
                        <li>When you are satisfied with the result, click the "Download Optimized Image" button.</li>
                    </ol>
                    <p>It's perfect for web developers, bloggers, and content creators who need to quickly optimize images for faster website loading times.</p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>

    </div>
  );
}

