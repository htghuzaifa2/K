
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, XCircle, ShieldQuestion, Mail } from 'lucide-react';
import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';

const eligibleConditions = [
  "The product was damaged during delivery.",
  "The product has a manufacturing defect.",
  "The product received is incorrect and does not match your order.",
  "The product is not functioning as described.",
];

const ineligibleConditions = [
  "If you have changed your mind after purchase.",
  "If the product was used, altered, or mishandled after delivery.",
  "If the return request is made after the allowed timeframe.",
];

export default function ReturnPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in-up">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold font-headline text-primary tracking-tight">Return & Refund Policy</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          At {APP_NAME}, customer satisfaction is our top priority. We strive to provide high-quality tech products and an excellent shopping experience. Please review our policy carefully to understand when and how returns can be made.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-green-500/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl font-headline text-green-600 dark:text-green-500">
              <CheckCircle2 className="h-8 w-8" />
              Conditions Eligible for Return
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-muted-foreground">
              {eligibleConditions.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 mt-0.5 text-green-600 dark:text-green-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-destructive/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl font-headline text-destructive">
              <XCircle className="h-8 w-8" />
              Conditions Not Eligible for Return
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-muted-foreground">
              {ineligibleConditions.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <XCircle className="h-5 w-5 mt-0.5 text-destructive flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-8 mb-12">
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">⏳ Return Timeframe</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Customers must notify us of a return request within <span className="font-bold text-primary">3 days</span> of receiving their order. Requests made after 3 days will not be eligible for return or refund.</p>
            </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">📦 How to Initiate a Return</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-2">
                <p>To initiate a return for a damaged, defective, or incorrect product:</p>
                <ol className="list-decimal list-inside space-y-2 pl-2">
                    <li>Contact our customer support team with your order number.</li>
                    <li>Provide clear photos or a short video showing the issue.</li>
                    <li>Our team will verify the claim and guide you through the return process.</li>
                </ol>
            </CardContent>
        </Card>
        
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">💳 Refund Process</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-2">
                 <ul className="list-disc list-inside space-y-2 pl-2">
                    <li>Once your return is approved and the item is received by us, it will undergo an inspection.</li>
                    <li>After approval, your refund will be processed via the original payment method or another mutually agreed method.</li>
                    <li>Refund timelines may vary depending on your bank or payment provider.</li>
                </ul>
            </CardContent>
        </Card>
      </div>

      <section className="text-center max-w-3xl mx-auto bg-secondary/50 dark:bg-secondary/20 rounded-xl p-8">
        <ShieldQuestion className="h-12 w-12 mx-auto text-primary mb-4" />
        <h2 className="text-3xl font-bold font-headline">Need Help?</h2>
        <p className="text-muted-foreground text-lg leading-relaxed mt-4">
           If you have any questions about our Return & Refund Policy, please contact us.
        </p>
        <Link href="mailto:contact@kimi.pk" className="inline-flex items-center gap-2 mt-4 font-semibold text-primary hover:underline">
            <Mail className="h-5 w-5" /> contact@kimi.pk
        </Link>
      </section>
    </div>
  );
}
