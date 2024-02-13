import { getAllProducts } from "@/libs/getAllProducts";
import Link from "next/link";

export default async function ProductManage() {
   const data = await getAllProducts(1, 1);

   return (
      <>
         <Link href={"product-manage/add-product"}>Add</Link>
         <div className="space-y-[10px]">
            {data.products.map((p, index) => (
               <Link key={index} href={`product-manage/${p.product_ascii}`}>
                  {p.product_name}
               </Link>
            ))}
         </div>
      </>
   );
}
