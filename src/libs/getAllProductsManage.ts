export const getAllProducts = async (page: number, category_id: number) => {
   const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT || 'https://nest-mobile.vercel.app/api'}/products?page=${page}&category_id=${category_id}`,
      { next: { tags: ["products"] } }
   );
   return (await res.json()) as { products: Product[] };
};
