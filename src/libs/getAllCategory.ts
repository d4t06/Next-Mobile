export const getAllCategories = async () => {
   const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/categories`);

   const categories = (await res.json()) as Category[];

   return categories;
};
