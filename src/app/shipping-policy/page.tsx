
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ShippingPolicyPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-center font-headline text-4xl tracking-tight">Shipping Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none text-lg text-card-foreground">
          <p>
            We are committed to delivering your order promptly and securely. Please review our shipping policy below for details on shipping times, costs, and methods.
          </p>

          <h3 className="font-headline text-2xl mt-8 mb-4">Processing Time</h3>
          <p>
            All orders are processed within <strong>1-2 business days</strong> (excluding weekends and holidays) after you receive your order confirmation email. You will receive another notification when your order has shipped.
          </p>

          <h3 className="font-headline text-2xl mt-8 mb-4">Domestic Shipping Rates & Estimates</h3>
          <p>
            Shipping charges for your order will be calculated and displayed at checkout.
          </p>
          <ul>
            <li><strong>Standard Shipping:</strong> 5-7 business days</li>
            <li><strong>Express Shipping:</strong> 2-3 business days</li>
          </ul>

          <h3 className="font-headline text-2xl mt-8 mb-4">International Shipping</h3>
          <p>
            We offer international shipping to most countries. Shipping charges and delivery times for international orders will be calculated at checkout and will vary depending on your location. Please be aware that your order may be subject to import duties and taxes, which are incurred once a shipment reaches your destination country. {`kimi.pk`} is not responsible for these charges if they are applied.
          </p>

          <h3 className="font-headline text-2xl mt-8 mb-4">Order Tracking</h3>
          <p>
            When your order has shipped, you will receive an email from us which will include a tracking number you can use to check its status. Please allow 48 hours for the tracking information to become available.
          </p>
          <p>
            If you have any further questions, please don't hesitate to <a href="/contact">contact us</a>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
