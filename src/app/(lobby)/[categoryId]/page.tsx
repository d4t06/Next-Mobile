import CategoryLabel from "@/components/CategoryLabel";
import NoProduct from "@/components/NoProduct";
import Button from "@/components/ui/Button";
import { getAllCategories } from "@/libs/getAllCategory";
import { getAllProducts } from "@/libs/getAllProducts";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "./loading";
import MyImage from "@/components/ui/MyImage";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
// import { ChevronRightIcon } from "@heroicons/react/24/outline";

type Params = {
   params: {
      categoryId: string;
   };
   searchParams: { page: string; brand_id: string };
};

export const revalidate = 86400;

export function generateMetadata() {
   return {
      title: "Products",
   };
}

export async function generateStaticParams() {
   const categories = await getAllCategories();

   if (!categories) return [];

   return categories.map(
      (c) => ({ categoryId: c.id + "" } as Params["params"])
   );
}

async function ProductList({
   categoryId,
   brandId,
   page,
}: {
   categoryId: string;
   brandId: string;
   page: number;
}) {
   const data = await getAllProducts({
      page,
      category_id: categoryId,
      brand_id: brandId,
   });

   if (!data) return <NoProduct />;

   const isRemaining = data.page_size * data.page < data.count;

   const classes = {
      item: "flex mt-[10px] group",
      aItem: "text-[#333] font-[500] ml-[10px] group-hover:text-[#cd1818]",
      button: "",
   };

   return (
      <>
         {!!data.products.length && (
            <div className="mt-[20px]">
               {data.products.map((p, index) => (
                  <Link
                     href={`/${categoryId}/${p.id}`}
                     key={index}
                     className={classes.item}
                  >
                     <div className="h-[70px] w-[70px]">
                        <MyImage
                           alt=""
                           width={70}
                           height={70}
                           className="rounded-[6px] h-full object-contain"
                           src={p.image_url}
                        />
                     </div>

                     <span className={classes.aItem}>{p.product_name}</span>
                  </Link>
               ))}
            </div>
         )}
         {!data.products.length && <NoProduct />}
         {!!data.products.length && (
            <div className="flex mt-[30px] justify-center">
               <Button
                  disabled={page === 1}
                  href={`/${categoryId}${
                     brandId
                        ? `?page=${page - 1}&brand_id=${brandId}`
                        : `?page=${page - 1}`
                  }`}
                  size={"clear"}
                  className="px-[12px] py-[3px]"
                  colors={"second"}
               >
                  <ChevronLeftIcon className="w-6" />
                  Previous
               </Button>
               <Button
                  href={`/${categoryId}${
                     brandId
                        ? `?page=${page + 1}&brand_id=${brandId}`
                        : `?page=${page + 1}`
                  }`}
                  size={"clear"}
                  className="px-[12px] py-[3px] ml-3"
                  colors={"second"}
                  disabled={!isRemaining}
               >
                  Next
                  <ChevronRightIcon className="w-6" />
               </Button>
            </div>
         )}
      </>
   );
}

async function BrandListServerSide({
   brandId,
   categoryId,
}: {
   brandId: string;
   categoryId: string;
}) {
   const categories = await getAllCategories();

   const curCategory = categories?.find((c) => c.id === +categoryId);

   return (
      <div className="flex flex-wrap -ml-2">
         <Button
            href={`/${categoryId}`}
            colors={"second"}
            size={"clear"}
            active={!brandId}
            className="mt-2 ml-2 py-1 px-3"
         >
            All
         </Button>
         {curCategory?.brands.map((b, index) => (
            <Button
               key={index}
               href={`/${categoryId}${`?brand_id=${b.id}`}`}
               colors={"second"}
               size={"clear"}
               active={+brandId === b.id}
               className="mt-2 ml-2 py-1 px-3"
            >
               {b.brand_name}
            </Button>
         ))}
      </div>
   );
}

export default async function ProductPage({
   params: { categoryId },
   searchParams,
}: Params) {
   const page =
      typeof searchParams.page === "string" && +searchParams.page >= 1
         ? +searchParams.page
         : 1;

   return (
      <>
         <CategoryLabel categoryId={categoryId} />

         {/* <BrandList brands={curCategory?.brands || []} /> */}
         <BrandListServerSide
            brandId={searchParams.brand_id}
            categoryId={categoryId}
         />

         {/* <div key={page}> */}
         <Suspense fallback={<Loading />}>
            <ProductList
               categoryId={categoryId}
               brandId={searchParams.brand_id}
               page={page}
            />
         </Suspense>
         {/* </div> */}
      </>
   );
}
