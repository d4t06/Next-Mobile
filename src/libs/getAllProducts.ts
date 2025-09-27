import { sleep } from "@/utils/appHelper";

export type GetAllProduct = {
  page?: string;
  category_id?: string;
  brand_id?: string[];
  tag_id?: string[];
};

export const getAllProducts = async (props?: GetAllProduct) => {
  const { category_id, page = "1", brand_id, tag_id } = props || {};

  const serializedQuery: Record<string, string> = {
    page: page,
  };

  if (category_id) serializedQuery["category_id"] = category_id;
  if (brand_id) {
    serializedQuery["brand_id"] =
      typeof brand_id === "string"
        ? [brand_id].join(",")
        : brand_id.length
          ? brand_id.join(",")
          : "";
  }

  if (tag_id)
    serializedQuery["tag_id"] =
      typeof tag_id === "string"
        ? [tag_id].join(",")
        : tag_id.length
          ? tag_id.join(",")
          : "";

  const params = new URLSearchParams(serializedQuery);

  console.log("get all products ", params.toString());

  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_ENDPOINT ||
      "https://nest-mobile-production.up.railway.app/api"
    }/products?${params.toString()}`,
    {
      next: {
        tags: [`products-${params.toString()}`],
      },
    },
  );

  if (!res.ok) return undefined;

  if (process.env.NODE_ENV === "development") await sleep(300);

  return res.json() as Promise<ProductResponse>;
};
