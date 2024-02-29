import { getAllCategories } from "@/libs/getAllCategory";
import { getAllProducts } from "@/libs/getAllProducts";
import { findCurCategory } from "@/utils/appHelper";
import Link from "next/link";
import { notFound } from "next/navigation";

type Params = {
  params: {
    category_ascii: string;
  };
};

export async function generateMetadata() {
  return {
    title: "Products",
  };
}

export default async function ProductPage({
  params: { category_ascii },
}: Params) {
  const categories = await getAllCategories();

  if (!categories) return <p>Some thing went wrong</p>;

  const curCategory = findCurCategory(categories, category_ascii);
  if (!curCategory) return notFound();

  const data = await getAllProducts(1, curCategory.id);
  if (!data) return <p>Some thing went wrong</p>;

  const classes = {
    linkItem: "list-disc",
    aItem: "text-[#333] font-[500] hover:text-[#cd1818]",
  };

  return (
    <>
      {!!data.products.length && (
        <ul className="space-y-[4px] ml-[16px]">
          {data.products.map((p, index) => (
            <li key={index} className={classes.linkItem}>
              <Link
                className={classes.aItem}
                key={index}
                href={`${category_ascii}/${p.product_ascii}`}
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
