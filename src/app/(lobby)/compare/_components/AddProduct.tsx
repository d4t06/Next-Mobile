"use client";

import Modal from "@/components/modal";
import Box from "@/components/ui/Box";
import { useRef, useState } from "react";
import SearchBox from "./SearchBox";
import MyImage from "@/components/ui/MyImage";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { ArrowPathIcon } from "@heroicons/react/16/solid";

type ChildProps = {
   product: Product;
   cb: () => void;
};

function BoxItem({ cb, product }: ChildProps) {
   return (
      <Box>
         <div className="">
            <MyImage
               className="w-[60px] mx-auto"
               src={product.image_url}
               width={60}
               height={60}
               alt=""
            />
            <h5 className="text-center font-[500]">{product.product_name}</h5>
         </div>
         <Button
            colors={"third"}
            onClick={cb}
            size={"clear"}
            className={`!absolute p-[4px]  right-[10px] top-[10px]`}
         >
            <ArrowPathIcon className="w-[22px]" />
         </Button>
      </Box>
   );
}

export default function AddProduct() {
   const [isOpenModal, setOpenModal] = useState(false);
   const [products, setProducts] = useState<Product[]>([]);
   const currentIndex = useRef<number>();

   // hooks
   const router = useRouter();

   const closeModal = () => {
      setOpenModal(false);
      currentIndex.current = undefined;
   };

   const openModal = (index: number) => {
      setOpenModal(true);
      currentIndex.current = index;
   };

   const handleSetProduct = (p: Product) => {
      if (currentIndex.current === undefined) return;

      const newProducts = [...products];
      newProducts[currentIndex.current] = p;

      setProducts(newProducts);
      closeModal();
   };
   const handleNavigate = () => {
      router.push(`/compare?q=${products[0].id},${products[1].id}`);
   };

   const classes = {
      container: "flex flex-col items-center justify-center sm:flex-row",
   };

   return (
      <>
         <div className={classes.container}>
            <div className="w-1/2 sm:w-1/4 p-[10px]">
               {!!products[0] ? (
                  <BoxItem cb={() => openModal(0)} product={products[0]} />
               ) : (
                  <Box onClick={() => openModal(0)} />
               )}
            </div>
            <h1 className="text-2xl">VS</h1>
            <div className="w-1/2 sm:w-1/4 p-[10px]">
               {!!products[1] ? (
                  <BoxItem cb={() => openModal(1)} product={products[1]} />
               ) : (
                  <Box onClick={() => openModal(1)} />
               )}
            </div>
         </div>
         <div className="text-center mt-[30px]">
            <Button disabled={products.length < 2} onClick={handleNavigate}>
               Compare
            </Button>
         </div>

         {isOpenModal && (
            <Modal className="z-[199]" closeModal={closeModal}>
               <SearchBox submit={(p) => handleSetProduct(p)} closeModal={closeModal} />
            </Modal>
         )}
      </>
   );
}
