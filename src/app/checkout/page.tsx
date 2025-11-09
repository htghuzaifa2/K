'use client';

import { useCart } from '@/hooks/use-cart';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Link from 'next/link';
import { CreditCard, ShoppingCart } from 'lucide-react';
import { WHATSAPP_PHONE_NUMBER, WHATSAPP_MESSAGE_HEADER, BLUR_DATA_URL } from '@/lib/constants';
import { toast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { pakistanProvinces, citiesByProvince } from '@/lib/pakistan-locations';
import { useState } from 'react';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Invalid email address.').optional().or(z.literal('')),
  phone: z.string().min(1, 'Phone number is required.'),
  province: z.string().min(1, 'Province is required.'),
  city: z.string().optional(),
  address: z.string().min(1, 'Address is required.'),
});

export default function CheckoutPage() {
  const { cartItems, subtotal, shippingCost, total } = useCart();
  const [selectedProvince, setSelectedProvince] = useState<keyof typeof citiesByProvince | ''>('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      province: '',
      city: '',
      address: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (cartItems.length === 0) {
      toast({
        variant: 'destructive',
        title: 'Your cart is empty',
        description: 'Please add items to your cart before checking out.',
      });
      return;
    }

    const itemsText = cartItems
      .map(item => `- ${item.product.name} (x${item.quantity}) - PKR ${item.product.price * item.quantity}`)
      .join('\n');
      
    const breakdownText = `\nSubtotal: PKR ${subtotal}\nShipping: PKR ${shippingCost}\n*Total: PKR ${total}*`;
    
    const customerDetails = `
*Customer Details:*
Name: ${values.name}
Phone: ${values.phone}${values.email ? `\nEmail: ${values.email}` : ''}
Address: ${values.address}
Province: ${values.province}${values.city ? `\nCity: ${values.city}` : ''}
    `;

    const codNote = `\n\n(Note: An additional Rs. 50 fee applies for Cash on Delivery orders, which will be added by our team upon confirmation.)`;
    
    const message = `${WHATSAPP_MESSAGE_HEADER}\n\n${itemsText}\n${breakdownText}\n\n${customerDetails}${codNote}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  if (cartItems.length === 0) {
    return (
        <div className="container mx-auto px-4 py-12 text-center">
             <div className="flex flex-grow flex-col items-center justify-center gap-4 text-center px-6">
                <div className="rounded-full bg-primary/10 p-4 text-primary">
                    <ShoppingCart className="h-12 w-12" />
                </div>
                <h1 className="text-3xl font-bold font-headline mt-4">Your Cart is Empty</h1>
                <p className="text-muted-foreground max-w-md">Looks like you haven't added anything to your cart yet. Browse our products to find something you like!</p>
                <Button asChild className="mt-4">
                    <Link href="/products">Continue Shopping</Link>
                </Button>
            </div>
        </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold font-headline text-primary tracking-tight">Checkout</h1>
        <p className="mt-3 text-lg text-muted-foreground">Please fill in your details to complete the order</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address <span className="text-muted-foreground">(Optional)</span></FormLabel>
                          <FormControl>
                            <Input placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+923001234567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                   <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="province"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Province</FormLabel>
                             <Select onValueChange={(value) => {
                                field.onChange(value);
                                setSelectedProvince(value as keyof typeof citiesByProvince);
                                form.setValue('city', '');
                             }} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your province" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {pakistanProvinces.map(province => (
                                    <SelectItem key={province} value={province}>{province}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                             <Select onValueChange={field.onChange} value={field.value} disabled={!selectedProvince}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your city" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {selectedProvince && citiesByProvince[selectedProvince]?.map(city => (
                                    <SelectItem key={city} value={city}>{city}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                   </div>
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Shipping Address</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Your complete shipping address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" size="lg" className="w-full">
                    <CreditCard className="mr-2 h-5 w-5"/> Confirm Order via WhatsApp
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
            <Card className="sticky top-20">
                <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {cartItems.map(item => (
                            <div key={item.product.id} className="flex items-center gap-4">
                                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                                    <Image
                                        src={item.product.images[0].url}
                                        alt={item.product.images[0].altText}
                                        fill
                                        className="object-contain"
                                        sizes="64px"
                                        placeholder="blur"
                                        blurDataURL={BLUR_DATA_URL}
                                    />
                                </div>
                                <div className="flex-grow">
                                    <Link href={`/products/${item.product.slug}`} className="font-semibold text-sm hover:underline">
                                        {item.product.name}
                                    </Link>
                                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                </div>
                                <p className="text-sm font-medium">PKR {item.product.price * item.quantity}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="flex-col items-stretch space-y-4">
                     <Separator />
                     <div className="space-y-2 text-base">
                        <div className="flex justify-between">
                            <p className="text-muted-foreground">Subtotal</p>
                            <p className="font-medium">PKR {subtotal}</p>
                        </div>
                         <div className="flex justify-between">
                            <p className="text-muted-foreground">Shipping</p>
                            <p className="font-medium">PKR {shippingCost}</p>
                        </div>
                    </div>
                    <Separator />
                     <div className="flex justify-between text-xl font-bold">
                        <p>Total</p>
                        <p>PKR {total}</p>
                    </div>
                    <p className="text-xs text-muted-foreground pt-2">
                        Note: An additional Rs. 50 fee for Cash on Delivery will be confirmed by our team via WhatsApp.
                    </p>
                </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  );
}
