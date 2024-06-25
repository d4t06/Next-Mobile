export const getAllProducts = async (page: number | string, category_id: string | number) => {
   const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT || 'https://nest-mobile.vercel.app/api'}/products?page=${page}&category_id=${category_id}`,
      { next: { tags: [`products-${category_id}`] } }
   );
   return res.json() as Promise<ProductResponse>
};
