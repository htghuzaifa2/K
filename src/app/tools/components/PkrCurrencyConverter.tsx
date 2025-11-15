
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FancyAccordionButton } from './FancyAccordionButton';
import { useToast } from '@/hooks/use-toast';
import { ArrowRightLeft, Banknote, Loader2 } from 'lucide-react';

const API_URL = 'https://api.exchangerate.host/latest?base=USD';
const popularCurrencies = ['PKR', 'USD', 'EUR', 'GBP', 'AED', 'SAR', 'CAD', 'AUD', 'JPY', 'CNY'];

type Rates = { [key: string]: number };

export function PkrCurrencyConverter() {
  const [amount, setAmount] = useState<number | ''>(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('PKR');
  const [rates, setRates] = useState<Rates>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchRates = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rates.');
      }
      const data = await response.json();
      if (data.success) {
        setRates(data.rates);
      } else {
        throw new Error('API did not return successful data.');
      }
    } catch (err: any) {
      setError(err.message);
      toast({
        variant: 'destructive',
        title: 'Error Fetching Rates',
        description: 'Could not load live exchange rates. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

  const convertedAmount = useMemo(() => {
    if (amount === '' || !rates[fromCurrency] || !rates[toCurrency]) {
      return '';
    }
    const amountInUsd = amount / rates[fromCurrency];
    const result = amountInUsd * rates[toCurrency];
    return result.toFixed(2);
  }, [amount, fromCurrency, toCurrency, rates]);

  const exchangeRateInfo = useMemo(() => {
    if (!rates[fromCurrency] || !rates[toCurrency]) return '';
    const rate = rates[toCurrency] / rates[fromCurrency];
    return `1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`;
  }, [fromCurrency, toCurrency, rates]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
        setAmount('');
    } else {
        const parsed = parseFloat(value);
        if (!isNaN(parsed)) {
            setAmount(parsed);
        }
    }
  };


  return (
    <div className="w-full">
      <Card className="bg-card/50 dark:bg-card/20 backdrop-blur-sm border-border/50">
        <CardHeader className="items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary mb-4">
            <Banknote className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-3xl font-bold font-headline">PKR Currency Converter</CardTitle>
          <p className="text-muted-foreground">Live exchange rates for Pakistani Rupee and more.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-24">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-4">Fetching live rates...</p>
            </div>
          ) : error ? (
            <div className="text-center text-destructive p-4 bg-destructive/10 rounded-md">
              <p>Could not load exchange rates.</p>
              <Button onClick={fetchRates} variant="link">Try Again</Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input 
                    id="amount" 
                    type="number" 
                    value={amount} 
                    onChange={handleAmountChange} 
                    className="text-lg"
                    placeholder="1.00"
                    />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="from-currency">From</Label>
                  <Select value={fromCurrency} onValueChange={setFromCurrency}>
                    <SelectTrigger id="from-currency">
                      <SelectValue placeholder="From currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {popularCurrencies.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="to-currency">To</Label>
                  <Select value={toCurrency} onValueChange={setToCurrency}>
                    <SelectTrigger id="to-currency">
                      <SelectValue placeholder="To currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {popularCurrencies.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-center">
                <Button variant="ghost" size="icon" onClick={handleSwap}>
                  <ArrowRightLeft className="h-5 w-5" />
                  <span className="sr-only">Swap currencies</span>
                </Button>
              </div>

              <div className="text-center bg-background p-4 rounded-lg border">
                <p className="text-sm text-muted-foreground">Converted Amount</p>
                <p className="text-3xl font-bold font-headline text-primary">{convertedAmount} {toCurrency}</p>
                {exchangeRateInfo && <p className="text-xs text-muted-foreground mt-1">{exchangeRateInfo}</p>}
              </div>

              <p className="text-xs text-muted-foreground text-center">
                Rates are updated periodically and are for informational purposes only.
              </p>
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
              <p>This tool helps you convert between Pakistani Rupee (PKR) and other major world currencies using live exchange rates.</p>
              <ol>
                <li>Enter the amount you wish to convert in the "Amount" field.</li>
                <li>Select your starting currency in the "From" dropdown.</li>
                <li>Select the currency you want to convert to in the "To" dropdown.</li>
                <li>The converted amount will appear instantly in the result box below.</li>
                <li>Use the swap button (⇄) to quickly switch the "From" and "To" currencies.</li>
              </ol>
              <p>It's perfect for freelancers, travelers, and anyone dealing with international payments to or from Pakistan.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

    </div>
  );
}
