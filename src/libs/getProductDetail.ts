export const getProductDetail = async (product_ascii: string) => {
   const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/products/${product_ascii}`);
   if (!res.ok) return undefined
   return (await res.json()) as Product;
};
