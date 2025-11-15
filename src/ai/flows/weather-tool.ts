
'use server';

/**
 * @fileOverview An AI agent for fetching local weather information.
 *
 * - getLocalWeather - A function that fetches weather for given coordinates.
 * - WeatherInput - The input type for the getLocalWeather function.
 * - WeatherOutput - The return type for the getLocalWeather function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const WeatherInputSchema = z.object({
  latitude: z.number().describe('The latitude of the location.'),
  longitude: z.number().describe('The longitude of the location.'),
});
export type WeatherInput = z.infer<typeof WeatherInputSchema>;

const WeatherOutputSchema = z.object({
  temperature: z.number().describe('The current temperature in Celsius.'),
  weather_code: z.number().describe('The WMO code for the current weather condition.'),
  is_day: z.number().describe('Whether it is day (1) or night (0).'),
});
export type WeatherOutput = z.infer<typeof WeatherOutputSchema>;


const fetchWeatherTool = ai.defineTool(
    {
        name: 'fetchWeatherTool',
        description: 'Fetches current weather from the Open-Meteo API.',
        inputSchema: WeatherInputSchema,
        outputSchema: WeatherOutputSchema,
    },
    async (input) => {
        const { latitude, longitude } = input;
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day,weather_code&temperature_unit=celsius`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`API call failed with status: ${response.status}`);
            }
            const data = await response.json();
            return {
                temperature: Math.round(data.current.temperature_2m),
                weather_code: data.current.weather_code,
                is_day: data.current.is_day,
            };
        } catch (error) {
            console.error('Error fetching weather:', error);
            throw new Error('Could not fetch weather data.');
        }
    }
);

export const getLocalWeatherFlow = ai.defineFlow(
  {
    name: 'getLocalWeatherFlow',
    inputSchema: WeatherInputSchema,
    outputSchema: WeatherOutputSchema,
  },
  async (input) => {
    return await fetchWeatherTool(input);
  }
);

export async function getLocalWeather(input: WeatherInput): Promise<WeatherOutput> {
    return getLocalWeatherFlow(input);
}
