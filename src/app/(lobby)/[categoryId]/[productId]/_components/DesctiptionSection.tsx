"use client";

import ImageModal from "@/components/modal/ImageModal";
import useMagnifier from "@/hooks/useMagnifier";
import HTMLReactParser from "html-react-parser/lib/index";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
   product: Product;
};

export default function DescriptionSection({ product }: Props) {
   const [isMounted, setIsMounted] = useState(false);
   const [isOpenModal, setIsOpenModal] = useState("");

   const magnifierRef = useRef<HTMLDivElement>(null);
   const isTouchMove = useRef(false);
   // hooks
   const { handleMouseEnter, handleMouseLeave, handleMouseMove } = useMagnifier(
      {
         magnifierRef: magnifierRef,
      }
   );

   const closeModal = () => {
      const body =
         typeof document !== "undefined" && document.querySelector("body");

      if (body) {
         body.style.overflow = "auto";
      }
      setIsOpenModal("");
   };

   const handleOpenImageModal = (src: string) => {
      const body =
         typeof document !== "undefined" && document.querySelector("body");

      if (body) {
         body.style.overflow = "hidden";
      }

      setIsOpenModal(src);
   };

   const handleImageClick = (e: Event) => {
      const imageEle = e.target as HTMLImageElement;

      handleOpenImageModal(imageEle.src);
   };

   const handleTouchMove = () => {
      isTouchMove.current = true;
   };

   const handleTouchEnd = (e: Event) => {
      const imageEle = e.target as HTMLImageElement;

      if (isTouchMove.current) isTouchMove.current = false;
      else setIsOpenModal(imageEle.src);

      e.preventDefault();
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

      if (images)
         images.forEach((image) => {
            image.addEventListener("click", handleImageClick);
            image.addEventListener("touchend", handleTouchEnd);
            image.addEventListener("touchmove", handleTouchMove);
            image.addEventListener("mouseenter", handleMouseEnter);
            image.addEventListener("mousemove", handleMouseMove);
            image.addEventListener("mouseleave", handleMouseLeave);
         });
   }, [isMounted]);

   return (
      <>
         <div className="content space-y-[14px] [&>p]:text-[#495057] [&>h5]:font-[500] [&>h5]:text-xl [&>img]:rounded-[8px] [&>img]:max-h-[350px] [&>img]:mx-auto">
            {HTMLReactParser(product.description.content || "")}
         </div>

         {!!isOpenModal && (
            <ImageModal src={isOpenModal} closeModal={closeModal} />
         )}

         {isMounted &&
            createPortal(
               <div
                  ref={magnifierRef}
                  className="top-[200px] rounded-lg overflow-hidden left-[300px] pointer-events-none fixed bg-no-repeat"
               ></div>,
               document.querySelector("#portals")!
            )}
      </>
   );
}
