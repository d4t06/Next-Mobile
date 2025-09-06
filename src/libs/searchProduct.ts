import { sleep } from "@/utils/appHelper";

export const searchProduct = async (keyword: string) => {

   if (keyword.length < 3) return;

   const res = await fetch(
      `${
         process.env.NEXT_PUBLIC_API_ENDPOINT ||
         "https://nest-mobile-production.up.railway.app/api"
      }/products/search?q=${keyword}`,
      {
         next: {
            tags:  [`search-${keyword}`],
         },
      }
   );

   if (!res.ok) return;

   if (process.env.NODE_ENV === "development") await sleep(500);

   return res.json() as Promise<Product[]>;
};
