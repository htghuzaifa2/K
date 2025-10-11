
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ReturnPolicyPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-center font-headline text-4xl tracking-tight">Return Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none text-lg text-card-foreground">
          <p>
            We want you to be completely satisfied with your purchase. If you are not happy with your order for any reason, you can return it to us within <strong>30 days</strong> of the delivery date for a full refund or exchange.
          </p>

          <h3 className="font-headline text-2xl mt-8 mb-4">Conditions for Return</h3>
          <ul>
            <li>Items must be in their original, unused, and unworn condition.</li>
            <li>All original tags, packaging, and accessories must be included.</li>
            <li>Proof of purchase, such as your order number or receipt, is required.</li>
            <li>Customized or final sale items are not eligible for return.</li>
          </ul>

          <h3 className="font-headline text-2xl mt-8 mb-4">How to Initiate a Return</h3>
          <ol>
            <li><strong>Contact Us:</strong> Please email our support team at <a href="mailto:support@kimi.pk">support@kimi.pk</a> with your order number and the reason for the return.</li>
            <li><strong>Receive Instructions:</strong> We will provide you with a return authorization and shipping instructions.</li>
            <li><strong>Ship the Item:</strong> Pack the item securely and ship it back to the address provided. Customers are responsible for return shipping costs unless the item was received damaged or incorrect.</li>
          </ol>

          <h3 className="font-headline text-2xl mt-8 mb-4">Refunds</h3>
          <p>
            Once we receive and inspect your return, we will process your refund. The refund will be credited to your original method of payment within 5-7 business days. We will notify you by email once the refund has been completed.
          </p>
          <p>
            If you have any questions about our return policy, please <a href="/contact">contact us</a>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
