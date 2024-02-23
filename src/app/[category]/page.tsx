import { getAllCategories } from "@/libs/getAllCategory";
import { getAllProducts } from "@/libs/getAllProducts";
import { Metadata } from "next";
import Link from "next/link";
import {notFound} from 'next/navigation'


export const revalidate = 86400


const findCurCategory = (categories: Category[], curCategoryAscii: string) => {
   const curCategory = categories.find((cat) => cat.category_ascii === curCategoryAscii);
   return curCategory;
};

export async function generateMetadata({ params: { category } }: Params): Promise<Metadata> {
   const categories = await getAllCategories();
   const curCategory = findCurCategory(categories, category);

   if (!curCategory)
      return {
         title: "Not found",
      };
   return {
      title: curCategory?.category_name,
   };
}

type Params = {
   params: {
      category: string;
   };
};

export default async function ProductPage({ params: { category } }: Params) {
   const categories = await getAllCategories();

   const curCategory = findCurCategory(categories, category);
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
