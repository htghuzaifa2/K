import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { WHATSAPP_PHONE_NUMBER } from '@/lib/constants';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-center font-headline text-4xl tracking-tight">Contact Us</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8 text-lg">
          <p className="text-center text-muted-foreground">
            We'd love to hear from you! Whether you have a question about our products, an order, or anything else, our team is ready to answer all your questions.
          </p>
          
          <Separator />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <Mail className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <a href="mailto:support@kimi.pk" className="text-primary hover:underline">
                support@kimi.pk
              </a>
            </div>
            <div className="flex flex-col items-center text-center">
              <Phone className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Call or WhatsApp</h3>
              <a href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                +{WHATSAPP_PHONE_NUMBER}
              </a>
            </div>
            <div className="flex flex-col items-center text-center">
              <MapPin className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
              <p className="text-muted-foreground">
                123 Fashion Street<br />
                Karachi, Pakistan
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
