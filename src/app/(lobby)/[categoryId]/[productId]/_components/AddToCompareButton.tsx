"use client";

import Button from "@/components/ui/Button";
import { useCompare } from "@/stores/CompareContext";
import { PencilSquareIcon, PlusIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

type Props = {
   product: Product;
};
export default function AddToCompareButton({ product }: Props) {
   const { data: session } = useSession();

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
