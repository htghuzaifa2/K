export type ProductImage = {
  url: string;
  altText: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  category: string[];
  images: ProductImage[];
  inStock: boolean;
  longDescription?: string;
  specifications?: Record<string, string>;
};

export type CartItem = {
  product: {
    id: string;
    name: string;
    price: number;
    images: ProductImage[];
    slug: string;
  };
  quantity: number;
};
