"use client";

import Modal from "@/components/modal";
import ImageModal from "@/components/modal/ImageModal";
import HTMLReactParser from "html-react-parser/lib/index";
import { useEffect, useState } from "react";

type Props = {
   products: Product[];
};

export default function DescriptionSection({ products }: Props) {
   const [isOpenModal, setIsOpenModal] = useState("");

   const closeModal = () => {
      const body = document.querySelector("body");

      if (body) {
         body.style.overflow = "auto";
      }
      setIsOpenModal("");
   };

   const handleImageClick = (e: Event) => {
      const imageEle = e.target as HTMLImageElement;
      const body = document.querySelector("body");

      if (body) {
         body.style.overflow = "hidden";
      }

      setIsOpenModal(imageEle.src);
   };

   useEffect(() => {
      const images = document.querySelectorAll(".content>img");

      images.forEach((image) => image.addEventListener("click", handleImageClick));
   }, []);

   const classes = {
      descContainer:
         "content space-y-[14px] [&>p]:text-[#495057] [&>h5]:font-[500] [&>h5]:text-xl [&>img]:rounded-[8px] [&>img]:max-h-[350px] [&>img]:mx-auto",
   };

   return (
      <>
         <div className="flex mt-[30px] ">
            {products.map((p, index) => (
               <div key={index} className="flex-1 mr-[10px] sm:mr-[14px]">
                  <div className={classes.descContainer}>
                     {HTMLReactParser(p.description.content || "")}
                  </div>
               </div>
            ))}
         </div>
         {!!isOpenModal && <ImageModal closeModal={closeModal} src={isOpenModal} />}
      </>
   );
}
