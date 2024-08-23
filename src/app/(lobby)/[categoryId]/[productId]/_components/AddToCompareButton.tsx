"use client";

import Button from "@/components/ui/Button";
import { useCompare } from "@/stores/CompareContext";
import {
  PlusIcon,
  XMarkIcon,
  PencilSquareIcon,
  Cog6ToothIcon,
} from "@heroicons/react/16/solid";
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
    <div className="flex right-[10px] top-[10px] left-[10px] space-x-2">
      <Button
        onClick={() => toggleProduct(product)}
        size={"clear"}
        className={`p-1 lg:px-2 space-x-1`}
      >
        {isAdded ? <XMarkIcon className="w-[24px]" /> : <PlusIcon className="w-[24px]" />}
        <span className="hidden lg:block">
          {isAdded ? "Remove" : "Add to compare"}
        </span>
      </Button>

      {session && session.user.role === "ADMIN" && (
        <Button
          blank
          href={`/dashboard/product/${product.id}`}
          size={"clear"}
          className={`p-[4px] px-[6px] lg:px-2 space-x-[6px]`}
        >
          <Cog6ToothIcon className="w-[20px]" />
          <span className="hidden lg:block">Edit</span>
        </Button>
      )}
    </div>
  );
}
