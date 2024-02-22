import Frame from "@/components/ui/Frame";
import { getAllCategories } from "@/libs/getAllCategory";
import { getAllProducts } from "@/libs/getAllProducts";
import Link from "next/link";

export default async function Home() {
  const categories = await getAllCategories();

  const productMaps: Record<string, Product[]> = {};

  if (categories.length) {
    for await (let cat of categories) {
      const data = await getAllProducts(1, cat.id);
      productMaps[cat.category_ascii] = data.products;
    }
  }

  const classes = {
    linkItem: "list-disc text-[16px]",
    aItem: "text-[#333] font-[500] hover:text-[#cd1818]",
  };

  return (
    <div className="pt-[30px] space-y-[20px]">
      {categories.map((cat, index) => (
        <Frame key={index}>
          <h5 className="text-[18px] text-[#333] font-[500]">
            Recent {cat.category_name}
            {!!productMaps[cat.category_ascii].length && (
              <ul className="mt-[10px] ml-[16px]">
                {productMaps[cat.category_ascii].map((p, index) => (
                  <li key={index} className={classes.linkItem}>
                    <Link
                      className={classes.aItem}
                      key={index}
                      href={`${cat.category_ascii}/${p.product_ascii}`}
                    >
                      {p.product_name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </h5>
        </Frame>
      ))}
    </div>
  );
}
