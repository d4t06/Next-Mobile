export const getAllCategories = async (path: string = "/categories") => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}${path}`, {
    next: { tags: [path] },
  });

  if (!res.ok) return undefined

  const categories = (await res.json()) as Category[];

  return categories;
};

export const getCategory = async (category_ascii: string) => {
  console.log(">>> get category", category_ascii);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/categories/${category_ascii}`,
    {
      next: { tags: ["category-" + category_ascii] },
    }
  );

  if (!res.ok) return undefined;

  return (await res.json()) as Category;
};
