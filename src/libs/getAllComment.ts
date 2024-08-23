import { sleep } from "@/utils/appHelper";

export default async function getAllComment({
   approved,
   page,
   productId,
   size,
}: {
   page?: number;
   productId?: number;
   approved?: boolean;
   size?: number;
}) {
   let params = `?page=${page || 1}`;

   if (productId) params += `&product_id=${productId}`;
   // default is true
   if (!approved) params += `&approved=0`;
   if (size) params += `&size=${size}`;

   if (process.env.NODE_ENV === "development") await sleep(600);

   const res = await fetch(
      `${
         process.env.NEXT_PUBLIC_API_ENDPOINT || "https://nest-mobile.vercel.app/api"
      }/comments${params}`,
      {
         next: {
            tags: productId ? [`comments-${productId}`] : undefined,
         },
      }
   );

   return res.json() as Promise<ProductCommentResponse>;
}
