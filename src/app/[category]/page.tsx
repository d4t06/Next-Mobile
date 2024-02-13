// import ProductItem from "@/components/ProductItem";
// import Skeleton from "@/components/Skeleton";
import ProductItem from "@/components/ProductItem";
import { Metadata } from "next";
import Link from "next/link";
import { useParams } from "next/navigation";

export const metadata: Metadata = {
   title: "Product page",
};

type Params = {
   params: {
      category: string;
   };
};

const getData = async () => {
   const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/products?category_id=1&page=1`);
   if (!res.ok) return undefined;
   return res.json() as Promise<{ products: Product[] }>;
};

export default async function ProductPage({ params: { category } }: Params) {
   const data = await getData();
   if (!data) return <p>Some thing went wrong</p>;

   return (
      <div className="mt-[20px]">
         <div className="space-y-[20px]">
            {data.products.length &&
               data.products.map((item, index) => (
                  <Link key={index} href={category + "/" + item.product_ascii}>
                     {item.product_name}
                  </Link>
               ))}
         </div>
      </div>
   );
}
