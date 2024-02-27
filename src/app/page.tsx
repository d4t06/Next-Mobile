import Frame from "@/components/ui/Frame";
import { getAllCategories } from "@/libs/getAllCategory";
import Link from "next/link";

export default async function Home() {
   const categories = (await getAllCategories("/categories?withProducts")) as
      | (Category & { products: Product[] })[]
      | undefined;

   if (!categories) return <p>Some thing went wrong</p>;

   const classes = {
      linkItem: "list-disc text-[16px]",
      aItem: "text-[#333] font-[500] hover:text-[#cd1818]",
   };

   return (
      <div className="py-[30px] space-y-[20px]">
         {categories.map((cat, index) => (
            <Frame key={index}>
               <h5 className="text-[18px] text-[#333] font-[500]">
                  Recent {cat.category_name}
                  {!!cat.products.length && (
                     <ul className="mt-[10px] ml-[16px]">
                        {cat.products.map((p, index) => (
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
