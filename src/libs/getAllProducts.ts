import { sleep } from "@/utils/appHelper";

export const getAllProducts = async (props?: {
   page?: number | string;
   category_id?: string | number;
   brand_id?: string | number;
}) => {
   const { category_id, page, brand_id } = props || {};

   let params = `?page=${page || 1}`;

   if (category_id) params += `&category_id=${category_id}`;
   if (brand_id) params += `&brand_id=${brand_id}`;

   const res = await fetch(
      `${
         process.env.NEXT_PUBLIC_API_ENDPOINT ||
         "https://nest-mobile-production.up.railway.app/api"
      }/products${params}`,
      {
         next: {
            tags: category_id ? [`products-${category_id}`] : ["products"],
         },
      }
   );

   if (!res.ok) return undefined;

   if (process.env.NODE_ENV === "development") await sleep(500);

   return res.json() as Promise<ProductResponse>;
};
