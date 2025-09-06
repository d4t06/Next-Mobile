"use client";

import Button from "@/components/ui/Button";
import { useCompareContext } from "@/stores/CompareContext";
import { useMagnifierContext } from "@/stores/MagnifierContext";
import {
  PlusIcon,
  XMarkIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/16/solid";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

type Props = {
  product: Product;
};
export default function AddToCompareButton({ product }: Props) {
  const { data: session } = useSession();

  const { addProduct, products, compareRef } = useCompareContext();
  const { isOpen, setIsOpen } = useMagnifierContext();

  const isAdded = useMemo(() => products.find((p) => p.id === product.id), [products]);

  return (
    <>
      <div className="flex flex-wrap right-[10px] top-[10px] left-[10px]">
        <Button
          onClick={() => {
            addProduct(product);
            !isAdded && compareRef.current?.setIsOpen(true);
          }}
          size={"clear"}
          colors={"second"}
          className={`add-to-compare-btn p-1 lg:px-2`}
        >
          {isAdded ? <XMarkIcon className="w-5" /> : <PlusIcon className="w-5" />}
          <span className="ml-1">{isAdded ? "Remove" : "Add to compare"}</span>
        </Button>

        <Button
          onClick={() => setIsOpen(!isOpen)}
          size={"clear"}
          colors={"second"}
          className={`mag-btn p-1 lg:px-2 ml-2 hidden md:block`}
        >
          <MagnifyingGlassIcon
            className={`w-5 ${isOpen ? "text-[#cd1818]" : "opacity-[.4]"}`}
          />
        </Button>
      </div>

      {session && session.user.role === "ADMIN" && (
        <Button
          blank
          href={`/dashboard/product/${product.id}`}
          size={"clear"}
          className={`p-[4px] mt-2 px-[6px] lg:px-2`}
        >
          <Cog6ToothIcon className="w-5" />
          <span className="ml-1">Edit</span>
        </Button>
      )}
    </>
  );
}
