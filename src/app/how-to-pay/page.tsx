
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const paymentMethods = [
    "Credit/Debit Cards (Visa, MasterCard, American Express)",
    "PayPal",
    "Apple Pay",
    "Google Pay",
    "Bank Transfer (details provided at checkout)",
];

export default function HowToPayPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-center font-headline text-4xl tracking-tight">How to Pay</CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none text-lg text-card-foreground">
          <p>
            We offer a variety of secure and convenient payment methods to complete your purchase. Choose the one that works best for you.
          </p>

          <h3 className="font-headline text-2xl mt-8 mb-4">Accepted Payment Methods</h3>
          <ul className="space-y-2">
            {paymentMethods.map((method, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                <span>{method}</span>
              </li>
            ))}
          </ul>

          <h3 className="font-headline text-2xl mt-8 mb-4">Payment Security</h3>
          <p>
            Your security is our top priority. All transactions are encrypted using industry-standard SSL technology. We never store your credit card information on our servers. You can shop with confidence knowing that your personal and financial details are safe.
          </p>

           <h3 className="font-headline text-2xl mt-8 mb-4">Questions?</h3>
          <p>
            If you have any questions about payment methods or encounter any issues during checkout, please do not hesitate to <a href="/contact">contact our support team</a>. We're here to help!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
