"use client";

import ImageModal from "@/components/modal/ImageModal";
import useMagnifier from "@/hooks/useMagnifier";
import HTMLReactParser from "html-react-parser/lib/index";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
   products: Product[];
};

export default function DescriptionSection({ products }: Props) {
   const [isMounted, setIsMounted] = useState(false);
   const [isOpenModal, setIsOpenModal] = useState("");
   const magnifierRef = useRef<HTMLDivElement>(null);

   // hooks
   const { handleMouseEnter, handleMouseLeave, handleMouseMove } = useMagnifier({
      magnifierRef: magnifierRef,
   });

   const closeModal = () => {
      const body = typeof document !== "undefined" && document.querySelector("body");

      if (body) {
         body.style.overflow = "auto";
      }
      setIsOpenModal("");
   };

   const handleImageClick = (e: Event) => {
      const imageEle = e.target as HTMLImageElement;
      const body = typeof document !== "undefined" && document.querySelector("body");

      if (body) {
         body.style.overflow = "hidden";
      }

      setIsOpenModal(imageEle.src);
   };

   useEffect(() => {
      if (!isMounted) {
         setIsMounted(true);
         return;
      }

      const images =
         typeof document !== "undefined"
            ? document.querySelectorAll<HTMLImageElement>(".content>img")
            : [];

      images.forEach((image) => {
         image.addEventListener("click", handleImageClick);
         image.addEventListener("mouseenter", handleMouseEnter);
         image.addEventListener("mousemove", handleMouseMove);
         image.addEventListener("mouseleave", handleMouseLeave);
      });
   }, [isMounted]);

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

         {isMounted &&
            createPortal(
               <div
                  ref={magnifierRef}
                  className="top-[200px] left-[300px] pointer-events-none fixed bg-no-repeat"
               ></div>,
               document.querySelector("#portals")!
            )}
      </>
   );
}
