import { getAllProducts } from "@/libs/getAllProducts";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
   title: "Product page",
};

export const revalidate = 0;

type Params = {
   params: {
      category: string;
   };
};

const getData = async () => {
   const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/products?category_id=1&page=1`
   );
   if (!res.ok) return undefined;
   return res.json() as Promise<{ products: Product[] }>;
};

export default async function ProductPage({ params: { category } }: Params) {
   const data = await getAllProducts(1, 1);
   if (!data) return <p>Some thing went wrong</p>;

   const classes = {
      linkItem: "list-disc",
      aItem: "text-[#333] font-[500] hover:text-[#cd1818]",
   };

   return (
      <div className="mt-[20px]">
         <h1 className="text-[22px]">All products</h1>

         {!!data.products.length && (
            <ul className="space-y-[4px] mt-[10px] mx-[10px]">
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
      </div>
   );
}
