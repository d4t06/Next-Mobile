import { sleep } from "@/utils/appHelper";

export const searchProduct = async (keyword: string, controller?: AbortController) => {
  if (keyword.length < 2) return;

  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_ENDPOINT ||
      "https://nest-mobile-production.up.railway.app/api"
    }/products/search?q=${keyword}`,
    {
      next: {
        tags: [`search-${keyword}`],
      },
      signal: controller?.signal,
    },
  );

  if (process.env.NODE_ENV === "development") await sleep(300);

  if (!res.ok) return;

  return res.json() as Promise<Product[]>;
};
