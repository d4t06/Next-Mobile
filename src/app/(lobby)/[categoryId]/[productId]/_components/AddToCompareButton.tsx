"use client";

import Button from "@/components/ui/Button";
import { useCompare } from "@/stores/CompareContext";
import { PlusIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useMemo } from "react";

type Props = {
   product: Product;
};

export default function AddToCompareButton({ product }: Props) {
   const { toggleProduct, products } = useCompare();

   const isAdded = useMemo(() => products.find((p) => p.id === product.id), [products]);

   return (
      <Button
         colors={"third"}
         onClick={() => toggleProduct(product)}
         size={"clear"}
         className={`!absolute p-[4px]  right-[10px] top-[10px]`}
      >
         {isAdded ? <XMarkIcon className="w-[24px]" /> : <PlusIcon className="w-[24px]" />}
      </Button>
   );
}
