export const getProduct = async (product_ascii: string) => {
   const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/products/${product_ascii}`);
   return (await res.json()) as Product;
};
