"use client";

import Button from "@/components/ui/Button";
import { useMemo } from "react";
import SpecItem from "./SpecItem";

type Props = {
   categories: Category[];
   product: Product;
};

export default function Specification({ categories, product }: Props) {
   const productCategory = useMemo(
      () => categories.find((c) => c.id === product.category_id),
      []
   );

   const attributeOrderArray = useMemo(
      () => (productCategory ? productCategory.attribute_order.split("_") : []),
      []
   );

   if (!productCategory)
      return <p className="text-center w-full">Some thing went wrong</p>;

   return (
      <>
         <table className="w-full overflow-hidden rounded-lg ">
            <thead className="bg-[#cd1818] text-white ">
               <tr className="text-left font-bold [&_th]:py-1 [&_th]:px-2 sm:[&_th]:py-2 sm:[&_th]:px-4">
                  <th>Name</th>
                  <th>Value</th>
                  <th></th>
               </tr>
            </thead>
            <tbody>
               {attributeOrderArray.length
                  ? attributeOrderArray.map((id) => (
                       <SpecItem
                          key={id}
                          id={+id}
                          product={product}
                          productCategory={productCategory}
                       />
                    ))
                  : ""}
            </tbody>
         </table>
      </>
   );
}
