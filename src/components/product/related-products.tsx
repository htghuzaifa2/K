import { getProductsByCategory, getProducts, type AppProduct } from '@/lib/products';
import { ProductCard } from './product-card';

type RelatedProductsProps = {
  currentProduct: AppProduct;
};

const RECOMMENDATION_COUNT = 4;

export async function RelatedProducts({ currentProduct }: RelatedProductsProps) {
  let relatedProductsList: AppProduct[] = [];

  try {
    // 1. Get products from the same category
    const categoryProducts = await getProductsByCategory(currentProduct.category);
    relatedProductsList = categoryProducts.filter(p => p.id !== currentProduct.id);

    // 2. If not enough, get random products to fill up
    if (relatedProductsList.length < RECOMMENDATION_COUNT) {
      const allProducts = await getProducts();
      const otherProducts = allProducts.filter(p => 
        p.category.toLowerCase() !== currentProduct.category.toLowerCase() && 
        p.id !== currentProduct.id
      );

      // Shuffle other products
      const shuffledOthers = otherProducts.sort(() => 0.5 - Math.random());
      
      const needed = RECOMMENDATION_COUNT - relatedProductsList.length;
      relatedProductsList.push(...shuffledOthers.slice(0, needed));
    }
  } catch (error) {
    console.error('Failed to get related products:', error);
    return null;
  }

  if (relatedProductsList.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="mb-6 text-center text-3xl font-bold tracking-tight font-headline">You May Also Like</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {relatedProductsList.slice(0, RECOMMENDATION_COUNT).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
