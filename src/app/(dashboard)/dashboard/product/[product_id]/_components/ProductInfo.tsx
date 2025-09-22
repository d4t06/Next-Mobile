"use client";

import { useRef } from "react";
import Button from "@/components/ui/Button";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { Modal, ModalRef } from "@/components/modal";
import AddProductModal from "@/modules/add-product-modal";
import { useCurrentProductContext } from "../CurrentProductContext";

export default function ProductInfo() {
  const { categories, product } = useCurrentProductContext();
  const modalRef = useRef<ModalRef>(null);

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
        <AddProductModal categories={categories} product={product} type="Edit" />
      </Modal>
    </>
  );
}
