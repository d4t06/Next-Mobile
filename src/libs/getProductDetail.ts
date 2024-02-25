import { getCategory } from "./getAllCategory";

export const getProductDetail = async (product_ascii: string) => {
  console.log(`>>> get product detail ${product_ascii}`);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/products/${product_ascii}`,
    { next: { tags: [product_ascii] } }
  );

  if (!res.ok) return undefined;
  return (await res.json()) as Product;
};

export const getProductDetailWithCategory = async (
  product_ascii: string,
  category_ascii: string
) => {
  console.log(`>>> get product with category detail ${product_ascii}`);

  const productDetailFetch = fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/products/${product_ascii}`,
    { next: { tags: [product_ascii] } }
  );
  const categoryFetch = getCategory(category_ascii);

  const [category, productDetailRes] = await Promise.all([
    categoryFetch,
    productDetailFetch,
  ]);

  if (!productDetailRes.ok || !category) return undefined;
  const productDetail = (await productDetailRes.json()) as Product;
  return { category, productDetail };
};
