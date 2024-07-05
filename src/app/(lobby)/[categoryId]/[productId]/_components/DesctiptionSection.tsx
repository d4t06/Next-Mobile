"use client";

import ImageModal from "@/components/modal/ImageModal";
import HTMLReactParser from "html-react-parser/lib/index";
import { useEffect, useState } from "react";

type Props = {
   product: Product;
};

export default function DescriptionSection({ product }: Props) {
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

   return (
      <>
         <div className="content space-y-[14px] [&>p]:text-[#495057] [&>h5]:font-[500] [&>h5]:text-xl [&>img]:rounded-[8px] [&>img]:max-h-[350px] [&>img]:mx-auto">
            {HTMLReactParser(product.description.content || "")}
         </div>

         {!!isOpenModal && <ImageModal src={isOpenModal} closeModal={closeModal} />}
      </>
   );
}
