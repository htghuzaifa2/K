'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FancyAccordionButton } from './FancyAccordionButton';
import { Loader2, LocateFixed } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getPrayerTimes } from '@/ai/flows/prayer-times-tool';

interface PrayerTimesData {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

const prayerOrder: (keyof PrayerTimesData)[] = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];
const prayerLabels: Record<keyof PrayerTimesData, string> = {
    fajr: 'Fajr',
    sunrise: 'Sunrise',
    dhuhr: 'Dhuhr',
    asr: 'Asr',
    maghrib: 'Maghrib',
    isha: 'Isha',
}

export function PrayerTimesTool() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimesData | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [currentDate] = useState(new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));

  const fetchTimes = async (latitude: number, longitude: number) => {
    setIsLoading(true);
    try {
      const date = new Date().toISOString().split('T')[0];
      const times = await getPrayerTimes({ latitude, longitude, date });
      setPrayerTimes(times);

      const geoResponse = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
      const geoData = await geoResponse.json();
      setLocation(geoData.address?.city || geoData.address?.town || geoData.address?.state || 'Your Location');

    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Could not fetch prayer times',
        description: 'Please check your connection and try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchTimes(position.coords.latitude, position.coords.longitude);
        },
        () => {
          setIsLoading(false);
          toast({
            variant: 'destructive',
            title: 'Location access denied',
            description: 'Please enable location services in your browser to use this feature.',
          });
        }
      );
    } else {
        setIsLoading(false);
        toast({ variant: 'destructive', title: 'Geolocation not supported' });
    }
  };

  useEffect(() => {
    handleFetchLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full">
      <Card className="bg-card/50 dark:bg-card/20 backdrop-blur-sm border-border/50">
        <CardHeader className="items-center text-center">
            <CardTitle className="text-3xl font-bold font-headline">Prayer Times</CardTitle>
            <p className="text-muted-foreground">{location || 'Fetching location...'}</p>
            <p className="text-sm text-muted-foreground pt-1">{currentDate}</p>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center text-center space-y-4 min-h-[250px]">
            {isLoading ? (
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            ) : prayerTimes ? (
                <div className="w-full space-y-2">
                    {prayerOrder.map((prayer) => (
                        <div key={prayer} className="flex justify-between items-center p-3 rounded-md bg-background/50 border">
                            <span className="font-semibold text-base">{prayerLabels[prayer]}</span>
                            <span className="font-mono text-base font-bold text-primary">{prayerTimes[prayer]}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center gap-4">
                    <p className="text-muted-foreground">Could not load prayer times.</p>
                    <Button onClick={handleFetchLocation} variant="outline">
                        <LocateFixed className="mr-2 h-4 w-4" /> Try Again
                    </Button>
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
                    <p>This tool shows you the daily Islamic prayer (Namaz) times for your current location.</p>
                    <ol>
                        <li>When you first open this page, your browser will ask for location permission. Please allow it for the tool to work.</li>
                        <li>The tool will automatically fetch and display today's prayer times for Fajr, Dhuhr, Asr, Maghrib, and Isha.</li>
                        <li>If it fails, you can click the "Try Again" button to re-fetch your location and the prayer times.</li>
                    </ol>
                    <p>It's a convenient tool for residents and travelers in Pakistan to stay updated with their daily prayer schedule. The times are calculated based on the Islamic Society of North America (ISNA) method.</p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>

    </div>
  );
}
