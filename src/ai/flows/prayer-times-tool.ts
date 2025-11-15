
'use server';

/**
 * @fileOverview An AI agent for fetching Islamic prayer times.
 *
 * - getPrayerTimes - A function that fetches prayer times for a given location and date.
 * - PrayerTimesInput - The input type for the getPrayerTimes function.
 * - PrayerTimesOutput - The return type for the getPrayerTimes function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const PrayerTimesInputSchema = z.object({
  latitude: z.number().describe('The latitude of the location.'),
  longitude: z.number().describe('The longitude of the location.'),
  date: z.string().describe('The date for which to fetch prayer times (YYYY-MM-DD).'),
  method: z.number().optional().describe('The calculation method for prayer times. Defaults to 2 (Islamic Society of North America).'),
});
export type PrayerTimesInput = z.infer<typeof PrayerTimesInputSchema>;

const PrayerTimesOutputSchema = z.object({
  fajr: z.string().describe('The time for Fajr prayer.'),
  sunrise: z.string().describe('The time for Sunrise.'),
  dhuhr: z.string().describe('The time for Dhuhr prayer.'),
  asr: z.string().describe('The time for Asr prayer.'),
  maghrib: z.string().describe('The time for Maghrib prayer.'),
  isha: z.string().describe('The time for Isha prayer.'),
});
export type PrayerTimesOutput = z.infer<typeof PrayerTimesOutputSchema>;

const fetchPrayerTimes = ai.defineTool(
    {
        name: 'fetchPrayerTimes',
        description: 'Fetches prayer times from the AlAdhan API.',
        inputSchema: PrayerTimesInputSchema,
        outputSchema: PrayerTimesOutputSchema,
    },
    async (input) => {
        const { latitude, longitude, date, method = 2 } = input;
        const url = `https://api.aladhan.com/v1/timings/${date}?latitude=${latitude}&longitude=${longitude}&method=${method}`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`API call failed with status: ${response.status}`);
            }
            const data = await response.json();
            const timings = data.data.timings;
            
            // Format times to hh:mm AM/PM
            const formatTime = (time: string) => {
                const [hour, minute] = time.split(':');
                const h = parseInt(hour, 10);
                const ampm = h >= 12 ? 'PM' : 'AM';
                const formattedHour = h % 12 === 0 ? 12 : h % 12;
                return `${formattedHour}:${minute} ${ampm}`;
            };

            return {
                fajr: formatTime(timings.Fajr),
                sunrise: formatTime(timings.Sunrise),
                dhuhr: formatTime(timings.Dhuhr),
                asr: formatTime(timings.Asr),
                maghrib: formatTime(timings.Maghrib),
                isha: formatTime(timings.Isha),
            };
        } catch (error) {
            console.error('Error fetching prayer times:', error);
            throw new Error('Could not fetch prayer times.');
        }
    }
);


export const getPrayerTimesFlow = ai.defineFlow(
    {
        name: 'getPrayerTimesFlow',
        inputSchema: PrayerTimesInputSchema,
        outputSchema: PrayerTimesOutputSchema,
    },
    async (input) => {
        return await fetchPrayerTimes(input);
    }
);

export async function getPrayerTimes(input: PrayerTimesInput): Promise<PrayerTimesOutput> {
    return getPrayerTimesFlow(input);
}
