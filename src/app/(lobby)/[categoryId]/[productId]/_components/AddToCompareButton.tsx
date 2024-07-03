"use client";

import Button from "@/components/ui/Button";
import { useCompare } from "@/stores/CompareContext";
import { PencilSquareIcon, PlusIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { Session } from "next-auth";
import { useMemo } from "react";

type Props = {
   product: Product;
   session: Session | null;
};
export default function AddToCompareButton({ product, session }: Props) {
   const { toggleProduct, products } = useCompare();

   const isAdded = useMemo(() => products.find((p) => p.id === product.id), [products]);

   return (
      <div className="flex flex-col absolute right-[10px] top-[10px]">
         <Button
            onClick={() => toggleProduct(product)}
            size={"clear"}
            className={`p-[4px]  `}
         >
            {isAdded ? (
               <XMarkIcon className="w-[20px]" />
            ) : (
               <PlusIcon className="w-[20px]" />
            )}
         </Button>

         {session && session.user.role === "ADMIN" && (
            <Button
               blank
               href={`/dashboard/product/${product.id}`}
               size={"clear"}
               className={`p-[4px] mt-[6px]`}
            >
               <PencilSquareIcon className="w-[20px]" />
            </Button>
         )}
      </div>
   );
}
