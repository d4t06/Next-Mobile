export const getProductDetail = async (productId: string) => {
   const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT || 'https://nest-mobile-production.up.railway.app/api'}/products/${productId}`,
      { next: { tags: ["product-" + productId] } }
   );

   if (!res.ok) return undefined;

   return res.json() as Promise<Product>;
};
