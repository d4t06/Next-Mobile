"use client";

import { useState } from "react";
import Modal from "@/components/modal";
import AddProductForm from "@/components/AddProductForm";
import Button from "@/components/ui/Button";

type Props = {
   product: Product;
   categories: Category[];
};

export default function ProductInfo({ product, categories }: Props) {
   const [openModal, setOpenModal] = useState(false);
   const closeModal = () => setOpenModal(false);

   if (!product) return;
   return (
      <>
         <div className="flex justify-between items-center">
            <h1 className="text-xl sm:text-2xl font-[500]">{product.product_name}</h1>
            <Button onClick={() => setOpenModal(true)} className="ml-[10px]">Edit</Button>
         </div>

         {openModal && (
            <Modal closeModal={closeModal}>
               <AddProductForm
                  closeModal={closeModal}
                  categories={categories}
                  product={product}
                  type="Edit"
               />
            </Modal>
         )}
      </>
   );
}
