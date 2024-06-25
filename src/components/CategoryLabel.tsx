import { getAllCategories } from "@/libs/getAllCategory";
import { ReactNode } from "react";

type Props = {
   categoryId: string;
   children?: ReactNode;
};

export default async function CategoryLabel({ categoryId, children }: Props) {
   const categories = await getAllCategories();
   const currentCategory = categories?.find((c) => c.id === +categoryId);

   if (!currentCategory) return <></>;

   return (
      <h2 className="text-[20px] font-[500]">
         {currentCategory.category_name}
         {children}
      </h2>
   );
}
