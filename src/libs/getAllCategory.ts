export const getAllCategories = async (path: string = "/categories") => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT || "https://nest-mobile-production.up.railway.app/api"}${path}`,
    {
      next: { tags: ["categories"] },
    },
  );

  if (!res.ok) return undefined;

  const categories = (await res.json()) as Category[];

  return categories;
};
