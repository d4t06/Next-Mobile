import { getAllCategories } from "@/libs/getAllCategory";
import CategoryList from "@/components/CategoryList";
import CategoryAttributeGroup from "@/components/CategoryAttributeList";
import { unstable_noStore } from "next/cache";
// import { Suspense } from "react";
// import Loading from "./loading";

async function Group() {
   unstable_noStore();
   const categories = await getAllCategories();

   return (
      <>
         <h1 className="text-[22px] mb-[10px]">All categories</h1>
         <CategoryList categories={categories} />
         {!!categories.length && (
            <div className="mt-[20px]">
               <CategoryAttributeGroup categories={categories} />
            </div>
         )}
      </>
   );
}

// export const revalidate = 0;

export default async function CategoryManagePage() {
   // unstable_noStore();
   // const categories = await getAllCategories();

   return (
      <>
         {/* <h1 className="text-[22px] mb-[10px]">All categories</h1>
         <CategoryList categories={categories} />
         {!!categories.length && (
            <div className="mt-[20px]">
               <CategoryAttributeGroup categories={categories} />
            </div>
         )} */}

         {/* Group's behavior is alway show loading state in every hard refresh */}
         <Group />
      </>
   );
}
