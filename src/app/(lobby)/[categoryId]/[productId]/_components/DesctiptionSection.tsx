"use client";

import Modal from "@/components/modal";
import HTMLReactParser from "html-react-parser/lib/index";
import { HTMLAttributes, useEffect, useRef, useState } from "react";

type Props = {
   product: Product;
};

export default function DescriptionSection({ product }: Props) {
   const [isOpenModal, setIsOpenModal] = useState("");

   const closeModal = () => setIsOpenModal("");

   const handleImageClick = (e: Event) => {
      const imageEle = e.target as HTMLImageElement;

      setIsOpenModal(imageEle.src);
   };

   useEffect(() => {
      const images = document.querySelectorAll(".content>img");

      images.forEach((image) => image.addEventListener("click", handleImageClick));
   }, []);

   return (
      <>
         <div className="content space-y-[14px] [&>p]:text-[#495057] [&>h5]:font-[500] [&>h5]:text-xl [&>img]:rounded-[8px] [&>img]:max-h-[350px] [&>img]:mx-auto">
            {HTMLReactParser(product.description.content || "")}
         </div>

         {!!isOpenModal && (
            <Modal className="z-[199]" childClassName="p-0 " closeModal={closeModal}>
               <img
                  className="max-w-[95vw] h-auto sm:max-h-[80vh] sm:max-w-[80vw]"
                  src={isOpenModal}
                  alt=""
               />
            </Modal>
         )}
      </>
   );
}
