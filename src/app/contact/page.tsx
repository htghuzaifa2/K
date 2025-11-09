
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Mail, Phone, MessageSquare, User, AtSign, Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { WHATSAPP_PHONE_NUMBER, APP_NAME } from '@/lib/constants';

const formSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});


export default function ContactPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      message: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const contactMessage = `
      *New Message from ${APP_NAME} Website*
      
      *Name:* ${values.fullName}
      *Email:* ${values.email}
      
      *Message:*
      ${values.message}
    `;

    const encodedMessage = encodeURIComponent(contactMessage.trim());
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    toast({
        title: 'Redirecting to WhatsApp',
        description: 'Your message has been prepared. Please press send in WhatsApp.',
    });

    form.reset();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-16 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-extrabold font-headline text-primary tracking-tight">Contact Us</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          At {APP_NAME}, we value our customers and are always here to help. Whether you have a question about our products, need assistance with an order, or simply want to connect, our support team is ready to assist you.
        </p>
      </header>
      
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16 max-w-4xl mx-auto">
        <Card className="shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 text-center animate-fade-in-up" style={{ animationDelay: '150ms', animationFillMode: 'backwards' }}>
          <CardHeader className="items-center">
            <CardTitle className="flex items-center gap-3 text-2xl font-headline">
              <Mail className="h-8 w-8 text-primary" />
              Email Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <a href="mailto:support@kimi.pk" className="text-lg text-primary hover:underline">
              support@kimi.pk
            </a>
            <p className="text-muted-foreground mt-2 text-sm">Our support team responds within 24 hours.</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 text-center animate-fade-in-up" style={{ animationDelay: '300ms', animationFillMode: 'backwards' }}>
          <CardHeader className="items-center">
            <CardTitle className="flex items-center gap-3 text-2xl font-headline">
              <Phone className="h-8 w-8 text-primary" />
              WhatsApp
            </CardTitle>
          </CardHeader>
          <CardContent>
            <a href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}`} target="_blank" rel="noopener noreferrer" className="text-lg text-primary hover:underline">
              +92 332 9105111
            </a>
          </CardContent>
        </Card>
      </div>

      <section className="mb-16 animate-fade-in-up" style={{ animationDelay: '450ms', animationFillMode: 'backwards' }}>
        <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold font-headline text-center">Send Us a Message</h2>
            <p className="text-muted-foreground text-center mb-6">Easily reach us on WhatsApp for quick assistance.</p>
            <Card className="shadow-lg transition-all duration-300 hover:shadow-2xl">
                <CardContent className="p-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField control={form.control} name="fullName" render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-2 font-semibold"><User className="h-4 w-4 text-primary/80"/>Full Name</FormLabel>
                                    <FormControl><Input placeholder="Your full name" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                             <FormField control={form.control} name="email" render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-2 font-semibold"><AtSign className="h-4 w-4 text-primary/80"/>Email Address</FormLabel>
                                    <FormControl><Input placeholder="Your email address" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="message" render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-2 font-semibold"><MessageSquare className="h-4 w-4 text-primary/80"/>Your Message</FormLabel>
                                    <FormControl><Textarea placeholder="Type your message here..." rows={5} {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <Button type="submit" size="lg" className="w-full group">
                                <Send className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"/> Send Message via WhatsApp
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
      </section>

      <section className="text-center max-w-3xl mx-auto bg-secondary/50 dark:bg-secondary/20 rounded-xl p-8 animate-fade-in-up" style={{ animationDelay: '600ms', animationFillMode: 'backwards' }}>
        <h2 className="text-3xl font-bold font-headline">Our Commitment</h2>
        <p className="text-muted-foreground text-lg leading-relaxed mt-4">
           We believe in building trust through clear communication. Every query is important to us, and our goal is to provide you with fast, professional, and reliable support at every step of your journey with {APP_NAME}.
        </p>
      </section>
    </div>
  );
}
