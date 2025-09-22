import { ProductGrid } from '@/components/product/product-grid';
import { Pagination } from '@/components/product/pagination';
import { getProducts } from '@/lib/products';
import { Suspense } from 'react';

const PRODUCTS_PER_PAGE = 25;

type AllProductsPageProps = {
  searchParams?: {
    page?: string;
  };
};

export default async function AllProductsPage({ searchParams }: AllProductsPageProps) {
  const allProducts = await getProducts();
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = Math.ceil(allProducts.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = allProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-center text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">
        All Products
      </h1>
      <Suspense fallback={<p>Loading products...</p>}>
        <ProductGrid products={paginatedProducts} />
      </Suspense>
      <div className="mt-8">
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  );
}
