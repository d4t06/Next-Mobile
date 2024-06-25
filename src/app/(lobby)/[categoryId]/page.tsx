import CategoryLabel from "@/components/CategoryLabel";
import NoProduct from "@/components/NoProduct";
import { getAllCategories } from "@/libs/getAllCategory";
import { getAllProducts } from "@/libs/getAllProducts";
import Image from "next/image";
import Link from "next/link";

type Params = {
   params: {
      categoryId: string;
   };
};

export const revalidate = 86400;

export function generateMetadata() {
   return {
      title: "Products",
   };
}

async function getStaticParams() {
   const categories = await getAllCategories();

   if (!categories) return [];

   return categories.map((c) => ({ categoryId: c.id + "" } as Params["params"]));
}

export const generateStaticParams =
   process.env.NODE_ENV === "production" ? getStaticParams : undefined;

export default async function ProductPage({ params: { categoryId } }: Params) {
   const data = await getAllProducts(1, categoryId);
   if (!data) return <p>Some thing went wrong</p>;

   const classes = {
      item: "flex",
      aItem: "text-[#333] font-[500] ml-[10px] hover:text-[#cd1818]",
   };

   return (
      <>
         <CategoryLabel categoryId={categoryId}>
            <span> ({data.count})</span>
         </CategoryLabel>

         {!!data.products.length && (
            <div className="space-y-[10px] mt-[20px]">
               {data.products.map((p, index) => (
                  <div key={index} className={classes.item}>
                     <Image
                        alt=""
                        width={70}
                        height={70}
                        className="rounded-[6px]"
                        src={
                           p.image_url ||
                           "https://d4t06.github.io/HD-Chat/assets/search-empty-ChRLxitn.png"
                        }
                     />
                     <Link
                        className={classes.aItem}
                        key={index}
                        href={`/${categoryId}/${p.id}`}
                     >
                        {p.product_name}
                     </Link>
                  </div>
               ))}
            </div>
         )}
         {!data.products.length && <NoProduct />}
      </>
   );
}
