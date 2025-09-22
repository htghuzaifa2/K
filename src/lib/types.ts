export type Product = {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: number;
  category: string[];
  image: string;
  additionalImages: string[];
  stock: number;
};

export type CartItem = {
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];
    slug: string;
  };
  quantity: number;
};
