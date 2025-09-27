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
import LikeBtn from "./LikeBtn";

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
      <div className="flex flex-wrap gap-2 right-[10px] top-[10px] left-[10px]">
        <Button
          onClick={() => {
            addProduct(product);
            !isAdded && compareRef.current?.setIsOpen(true);
          }}
          size={"clear"}
          colors={"second"}
          className={`add-to-compare-btn p-1.5`}
        >
          {isAdded ? <XMarkIcon className="w-6" /> : <PlusIcon className="w-5" />}
          <span className="ml-1">{isAdded ? "Remove" : "Add to compare"}</span>
        </Button>

        <LikeBtn user={session} product_id={product.id} />

        <Button
          onClick={() => setIsOpen(!isOpen)}
          size={"clear"}
          colors={"second"}
          className={`mag-btn w-[36px] hidden md:block`}
        >
          <MagnifyingGlassIcon
            className={`w-5 ${isOpen ? "text-[#cd1818]" : "opacity-[.4]"}`}
          />
        </Button>

        {session && session.user.role === "ADMIN" && (
          <Button
            blank
            href={`/dashboard/product/${product.id}`}
            size={"clear"}
            className="p-1.5"
          >
            <Cog6ToothIcon className="w-5" />
            <span>Edit</span>
          </Button>
        )}
      </div>
    </>
  );
}
