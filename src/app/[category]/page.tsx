import { getAllCategories } from "@/libs/getAllCategory";
import { getAllProducts } from "@/libs/getAllProducts";
import { Metadata } from "next";
import Link from "next/link";

export const revalidate = 0;

export async function generateMetadata({
  params: { category },
}: Params): Promise<Metadata> {
  return {
    title: category,
  };
}

type Params = {
  params: {
    category: string;
  };
};

export default async function ProductPage({ params: { category } }: Params) {
  const categories = await getAllCategories();

  const targetCategory = categories.find((cat) => cat.category_ascii === category);
  if (!targetCategory) return <p>Some thing went wrong</p>;

  const data = await getAllProducts(1, targetCategory.id);
  if (!data) return <p>Some thing went wrong</p>;

  const classes = {
    linkItem: "list-disc",
    aItem: "text-[#333] font-[500] hover:text-[#cd1818]",
  };

  return (
    <>
      {!!data.products.length && (
        <ul className="space-y-[4px]">
          {data.products.map((p, index) => (
            <li key={index} className={classes.linkItem}>
              <Link
                className={classes.aItem}
                key={index}
                href={`${category}/${p.product_ascii}`}
              >
                {p.product_name}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {!data.products.length && <p>No products jet...</p>}
    </>
  );
}
