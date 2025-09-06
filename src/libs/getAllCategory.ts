export const getAllCategories = async (path: string = "/categories") => {
  // console.log(`>>> api get ${process.env.NEXT_PUBLIC_API_ENDPOINT || 'https://nest-mobile-production.up.railway.app/api'}${path}`);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT || "https://nest-mobile-production.up.railway.app/api"}${path}`,
    {
      next: { tags: ["categories"] },
    },
  );

  if (!res.ok) return undefined;

  return (await res.json()) as Category[];
};
