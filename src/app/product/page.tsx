import ProductItem from "@/components/ProductItem";
import Skeleton from "@/components/Skeleton";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Product page",
};

const getData = async () => {
   const res = await fetch(
      `${process.env.API_ENDPOINT}/products?category_id=2`
   );
   if (!res.ok) throw new Error("Fail to fetch data");
   return res.json();
};

export default async function ProductPage() {
   const data = (await getData()) as { products: Product[] };

   return (
      <div className="mt-[20px]">
         <div className="flex mx-[-4px] mt-[-8px] flex-wrap">
            {data.products.length &&
               data.products.map((item, index) => (
                  <div key={index} className="w-1/2 sm:w-1/5 mt-[8px] px-[4px]">
                     <ProductItem data={item} />
                  </div>
               ))}
         </div>
      </div>
   );
}
