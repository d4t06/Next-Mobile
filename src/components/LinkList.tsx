"use client";

import { usePathname } from "next/navigation";
import LinkItem from "./LinkItem";

type Props = {
   categories: Category[];
};
export default function LinkList({ categories }: Props) {
   const pathName = usePathname();

   if (pathName.includes("/dashboard"))
      return (
         <>
            <LinkItem
               className="text-[15px]"
               activeClass="font-[500]"
               href={"/dashboard/product-manage"}
            >
               Products
            </LinkItem>
            <LinkItem
               className="text-[15px]"
               activeClass="font-[500]"
               href={"/dashboard/category-manage"}
            >
               Category
            </LinkItem>

            <p className="ml-auto">Bello! <span className="font-[500]">Dat</span></p>
         </>
      );
   return (
      <>
         {categories.map((item, index) => (
            <LinkItem
               className="text-[15px]"
               activeClass="font-[500]"
               key={index}
               href={"/" + item.category_ascii}
            >
               {item.category_name}
            </LinkItem>
         ))}
      </>
   );
}
