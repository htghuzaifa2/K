export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  createdAt: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};
