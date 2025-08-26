"use client";

import { useRef } from "react";
import AddProductForm from "@/components/AddProductForm";
import Button from "@/components/ui/Button";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { Modal, ModalRef } from "@/components/modal";

type Props = {
  product: Product;
  categories: Category[];
};

export default function ProductInfo({ product, categories }: Props) {
  const modalRef = useRef<ModalRef>(null);

  if (!product) return;
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-[500]">{product.product_name}</h1>
        <Button
          onClick={() => modalRef.current?.open()}
          size={"clear"}
          className="ml-[10px] p-1"
        >
          <Cog6ToothIcon className="w-6" />
        </Button>
      </div>

      <Modal ref={modalRef}>
        <AddProductForm
          closeModal={() => modalRef.current?.close()}
          categories={categories}
          product={product}
          type="Edit"
        />
      </Modal>
    </>
  );
}
