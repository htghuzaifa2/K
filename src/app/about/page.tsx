
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Package, ShieldCheck, Star, Truck, Users, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import { APP_NAME } from '@/lib/constants';

const features = [
  {
    icon: <Package className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />,
    title: 'Extensive Product Range',
    description: 'A diverse collection of devices and accessories to meet every need.',
  },
  {
    icon: <Award className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />,
    title: 'Competitive Pricing',
    description: 'Affordable rates without compromising on quality or authenticity.',
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />,
    title: 'Genuine Products',
    description: '100% original and verified items from trusted suppliers.',
  },
  {
    icon: <Truck className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />,
    title: 'Nationwide Delivery',
    description: 'Fast and reliable shipping across Pakistan.',
  },
   {
    icon: <Star className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />,
    title: 'Customer-Centered Service',
    description: 'Dedicated support to ensure a seamless shopping experience.',
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in-up">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold font-headline text-primary tracking-tight">About Us</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Welcome to {APP_NAME}, Pakistan’s reliable destination for premium technology and gadgets. We are an e-commerce platform dedicated to providing authentic products, competitive prices, and exceptional service to customers across the country.
        </p>
      </header>

      <section className="mb-16">
        <Card className="shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-3xl font-headline">
              <Users className="h-8 w-8 text-primary" />
              Who We Are
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-base leading-relaxed">
              {APP_NAME} was founded with the vision of making technology accessible, affordable, and trustworthy. From the latest smartphones and laptops to essential accessories and smart devices, we strive to bring a wide range of high-quality tech products under one platform.
            </p>
          </CardContent>
        </Card>
      </section>
      
      <section className="mb-16">
        <h2 className="text-3xl font-bold font-headline text-center mb-10">Why Choose {APP_NAME}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <Card 
              key={feature.title} 
              className={cn(
                "group text-center p-6 flex flex-col items-center shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-fade-in-up",
                "bg-card/50 dark:bg-card/20 backdrop-blur-sm"
              )}
              style={{ animationDelay: `${i * 100}ms` }}
            >
                {feature.icon}
                <h3 className="text-xl font-bold mt-4 mb-2 font-headline">{feature.title}</h3>
                <p className="text-muted-foreground flex-grow">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

       <section className="mb-16 grid md:grid-cols-2 gap-8">
         <Card className="shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-3xl font-headline">
              <Target className="h-8 w-8 text-primary" />
               Our Vision
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-base leading-relaxed">
               To become Pakistan’s most trusted and customer-focused tech marketplace, offering innovation and reliability with every purchase.
            </p>
          </CardContent>
        </Card>
         <Card className="shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-3xl font-headline">
                <ShieldCheck className="h-8 w-8 text-primary" />
                Our Commitment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-base leading-relaxed">
              At {APP_NAME}, we are committed to building long-term trust with our customers by delivering quality, value, and reliability. Every product we offer is carefully sourced and delivered with the assurance of authenticity and transparency.
            </p>
          </CardContent>
        </Card>
       </section>

      <footer className="text-center mt-12">
        <p className="text-xl font-bold font-headline">
            <span className="animate-text-gradient bg-gradient-to-r from-teal-400 via-pink-500 to-yellow-500 bg-[200%_auto] bg-clip-text text-transparent">
                {APP_NAME} – Your Trusted Technology Store in Pakistan.
            </span>
        </p>
      </footer>
    </div>
  );
}
