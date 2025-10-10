import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { APP_NAME } from '@/lib/constants';

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-center font-headline text-4xl tracking-tight">About {APP_NAME}</CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none text-lg text-card-foreground">
          <p>
            Welcome to {APP_NAME}, your premier destination for the latest trends in Pakistani fashion. We are dedicated to bringing you a curated collection of high-quality apparel that blends traditional craftsmanship with contemporary style.
          </p>
          <p>
            Our mission is to redefine the online shopping experience by offering a seamless and enjoyable journey from browsing to checkout. We believe in the power of fashion to express individuality and celebrate cultural heritage. That's why we meticulously select each item in our collection to ensure it meets our high standards of quality, design, and authenticity.
          </p>
          <p>
            From elegant lawn suits for everyday wear to exquisite bridal dresses for your special day, {APP_NAME} offers something for every occasion. We are passionate about helping you find the perfect outfit that makes you feel confident and beautiful.
          </p>
          <p>
            Thank you for choosing {APP_NAME}. We are excited to be a part of your style story.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
