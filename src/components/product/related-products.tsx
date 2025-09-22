import { getRelatedProducts } from '@/ai/flows/related-product-recommendations';
import { getProductsByNames, type AppProduct } from '@/lib/products';
import { ProductCard } from './product-card';

type RelatedProductsProps = {
  currentProduct: AppProduct;
};

export async function RelatedProducts({ currentProduct }: RelatedProductsProps) {
  let relatedProductsList: AppProduct[] = [];
  try {
    const recommendations = await getRelatedProducts({
      productName: currentProduct.name,
      productCategory: currentProduct.category,
      productDescription: currentProduct.description,
    });
    
    relatedProductsList = await getProductsByNames(recommendations.relatedProducts);
    // Filter out the current product from recommendations
    relatedProductsList = relatedProductsList.filter(p => p.id !== currentProduct.id);

  } catch (error) {
    console.error('Failed to get related products:', error);
    // In case of an error, we can return an empty component or a message
    return null;
  }
  
  if (relatedProductsList.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="mb-6 text-center text-3xl font-bold tracking-tight font-headline">You May Also Like</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {relatedProductsList.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
