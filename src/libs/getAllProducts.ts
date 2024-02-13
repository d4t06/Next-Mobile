export const getAllProducts = async (page: number, category_id: number) => {
   const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/products?page=${page}&category_id=${category_id}`);
   return await res.json() as {products: Product[]};
};
