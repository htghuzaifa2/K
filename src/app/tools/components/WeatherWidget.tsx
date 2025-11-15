
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FancyAccordionButton } from './FancyAccordionButton';
import { Loader2, LocateFixed, Sun, Moon, Cloud, CloudRain, CloudSnow, Zap, CloudFog } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getLocalWeather } from '@/ai/flows/weather-tool';

interface WeatherData {
    temperature: number;
    weather_code: number;
    is_day: number;
}

const weatherIcons: { [key: number]: React.ElementType } = {
    0: Sun, // Clear sky
    1: Sun, // Mainly clear
    2: Cloud, // Partly cloudy
    3: Cloud, // Overcast
    45: CloudFog, // Fog
    48: CloudFog, // Depositing rime fog
    51: CloudRain, // Drizzle: Light
    53: CloudRain, // Drizzle: Moderate
    55: CloudRain, // Drizzle: Dense
    61: CloudRain, // Rain: Slight
    63: CloudRain, // Rain: Moderate
    65: CloudRain, // Rain: Heavy
    80: CloudRain, // Showers: Slight
    81: CloudRain, // Showers: Moderate
    82: CloudRain, // Showers: Violent
    71: CloudSnow, // Snow fall: Slight
    73: CloudSnow, // Snow fall: Moderate
    75: CloudSnow, // Snow fall: Heavy
    95: Zap, // Thunderstorm
    96: Zap, // Thunderstorm with slight hail
    99: Zap, // Thunderstorm with heavy hail
};

const weatherDescriptions: { [key: number]: string } = {
    0: 'Clear Sky',
    1: 'Mainly Clear',
    2: 'Partly Cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Rime Fog',
    51: 'Light Drizzle',
    53: 'Drizzle',
    55: 'Dense Drizzle',
    61: 'Slight Rain',
    63: 'Rain',
    65: 'Heavy Rain',
    80: 'Slight Showers',
    81: 'Showers',
82: 'Heavy Showers',
    71: 'Light Snow',
    73: 'Snow',
    75: 'Heavy Snow',
    95: 'Thunderstorm',
    96: 'Thunderstorm & Hail',
    99: 'Heavy Thunderstorm',
};


export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchWeather = async (latitude: number, longitude: number) => {
    setIsLoading(true);
    try {
      const weatherData = await getLocalWeather({ latitude, longitude });
      setWeather(weatherData);

      const geoResponse = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
      const geoData = await geoResponse.json();
      setLocation(geoData.address?.city || geoData.address?.town || geoData.address?.state || 'Your Location');

    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Could not fetch weather',
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
          fetchWeather(position.coords.latitude, position.coords.longitude);
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

  const WeatherIcon = weatherIcons[weather?.weather_code ?? 0] || (weather?.is_day ? Sun : Moon);


  return (
    <div className="w-full">
      <Card className="bg-card/50 dark:bg-card/20 backdrop-blur-sm border-border/50">
        <CardHeader className="items-center text-center">
            <CardTitle className="text-3xl font-bold font-headline">Local Weather</CardTitle>
            <p className="text-muted-foreground">{location || 'Fetching location...'}</p>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center text-center space-y-6 min-h-[250px]">
            {isLoading ? (
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            ) : weather ? (
                <>
                    <div className="relative">
                        <WeatherIcon className="h-24 w-24 text-primary drop-shadow-lg" />
                         {weather.weather_code === 0 && !weather.is_day && <Moon className="h-24 w-24 text-primary drop-shadow-lg" />}
                    </div>
                    <p className="text-7xl font-bold font-headline">{weather.temperature}°C</p>
                    <p className="text-lg text-muted-foreground -mt-2">{weatherDescriptions[weather.weather_code] || 'Clear'}</p>
                </>
            ) : (
                <div className="flex flex-col items-center gap-4">
                    <p className="text-muted-foreground">Could not load weather data.</p>
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
                    <p>This tool shows you the current weather for your location.</p>
                    <ol>
                        <li>When you first open this page, your browser will ask for location permission. Please allow it for the widget to work.</li>
                        <li>The widget will automatically fetch and display the current temperature, weather condition (like sunny, cloudy, or rainy), and your city.</li>
                        <li>If it fails, you can click the "Try Again" button to re-fetch your location and the weather data.</li>
                    </ol>
                    <p>It's a simple, handy tool for anyone in Pakistan to get a quick weather update for their daily plans.</p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>

    </div>
  );
}
