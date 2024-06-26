"use client";

import Button from "@/components/ui/Button";
import { Cog6ToothIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";
import AddProductForm from "@/components/AddProductForm";
import Modal from "@/components/modal";

type Props = {
   product: Product;
   categories: Category[];
};

export default function ProductItem({ product, categories }: Props) {
   const [openModal, setOpenModal] = useState(false);

   const closeModal = () => setOpenModal(false);

   const classes = {
      container: "flex justify-between items-center",
   };

   return (
      <>
         <div className={classes.container}>
            <div className="flex items-start">
               <Image
                  alt=""
                  className="rounded-[6px]"
                  width={70}
                  height={70}
                  src={
                     product.image_url ||
                     "https://d4t06.github.io/HD-Chat/assets/search-empty-ChRLxitn.png"
                  }
               />
               <p className="font-[500] ml-[10px] line-clamp-2">{product.product_name}</p>
            </div>

            <div className="ml-auto pl-[10px] space-x-[6px] flex-shrink-0">
               <Button
                  size={"clear"}
                  className="py-[4px] px-[12px]"
                  onClick={() => setOpenModal(true)}
                  colors={"second"}
               >
                  <PencilSquareIcon className="w-[22px]" />
               </Button>

               <Button
                  size={"clear"}
                  className="py-[4px] px-[12px]"
                  colors={"second"}
                  href={`/dashboard/product/${product.id}`}
               >
                  <Cog6ToothIcon className="w-[22px]" />
               </Button>
            </div>
         </div>

         {openModal && (
            <Modal className="z-[199]" closeModal={closeModal}>
               <AddProductForm
                  type="Edit"
                  categories={categories}
                  closeModal={closeModal}
                  product={product}
               />
            </Modal>
         )}
      </>
   );
}
