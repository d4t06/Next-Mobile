import { sleep } from "@/utils/appHelper";

export default async function getAllComment({
  approved = false,
  page,
  productId,
  size = 6,
}: {
  page?: number;
  productId?: number;
  approved?: boolean;
  size?: number;
}) {
  let params = `?page=${page}`;

  if (productId) params += `&product_id=${productId}`;
  // default is true
  if (typeof approved === "boolean") params += approved ? `&approved=1` : `&approved=0`;
  if (size) params += `&size=${size}`;

  if (process.env.NODE_ENV === "development") await sleep(600);

  // console.log(params);

  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_ENDPOINT || "https://nest-mobile-production.up.railway.app/api"
    }/comments${params}`,
    {
      next: {
        tags: productId ? [`comments-${productId}`] : ["comments"],
        revalidate: 60 * 60,
      },
    },
  );

  return res.json() as Promise<ProductCommentResponse>;
}
