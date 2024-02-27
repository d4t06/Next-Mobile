export const getAllCategories = async (path: string = "/categories") => {

   console.log(`>>> api get ${process.env.NEXT_PUBLIC_API_ENDPOINT}${path}`);
   
   const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}${path}`, {
      next: { tags: [path] },
   });

   if (!res.ok) return undefined;

   return (await res.json()) as Category[];
};

export const getCategory = async (category_ascii: string) => {
   console.log(">>> get category", category_ascii);

   const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/categories/${category_ascii}`, {
      next: { tags: ["category-" + category_ascii] },
   });

   if (!res.ok) return undefined;

   return (await res.json()) as Category;
};
