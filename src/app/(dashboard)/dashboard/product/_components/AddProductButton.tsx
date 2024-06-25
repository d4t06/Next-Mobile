"use client";
import AddProductForm from "@/components/AddProductForm";
import Modal from "@/components/modal";
import Button from "@/components/ui/Button";
import { useState } from "react";

type Props = {
   categories: Category[];
};

export default function AddProductButton({ categories }: Props) {
   const [openModal, setOpenModal] = useState(false);

   const closeModal = () => setOpenModal(false);
   

   return (
      <>
         <Button border={"clear"} onClick={() => setOpenModal(true)}>
            Add new
         </Button>
         {openModal && (
            <Modal className="z-[100]" closeModal={closeModal}>
               <AddProductForm
                  closeModal={closeModal}
                  type="Add"
                  categories={categories}
               />
            </Modal>
         )}
      </>
   );
}
