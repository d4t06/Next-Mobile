import { useMagnifierContext } from "@/stores/MagnifierContext";
import { useEffect, useRef, useState } from "react";
import useMagnifier from "./useMagnifier";

export default function useDescriptionSection() {
   const { isOpen } = useMagnifierContext();

   const [isMounted, setIsMounted] = useState(false);
   const [isOpenModal, setIsOpenModal] = useState("");

   const isTouchMove = useRef(false);
   const magnifierRef = useRef<HTMLDivElement>(null);

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
      if (!isMounted) return setIsMounted(true);

      const images =
         typeof document !== "undefined"
            ? document.querySelectorAll<HTMLImageElement>(".content>img")
            : [];

      if (images)
         images.forEach((image) => {
            image.addEventListener("click", handleImageClick);
         });

      return () => {
         if (images)
            images.forEach((image) => {
               image.removeEventListener("click", handleImageClick);
            });
      };
   }, [isMounted]);

   useEffect(() => {
      if (!isMounted) {
         setIsMounted(true);
         return;
      }

      if (!isOpen) return;

      const images =
         typeof document !== "undefined"
            ? document.querySelectorAll<HTMLImageElement>(".content>img")
            : [];

      if (images)
         images.forEach((image) => {
            image.addEventListener("touchend", handleTouchEnd);
            image.addEventListener("touchmove", handleTouchMove);
            image.addEventListener("mouseenter", handleMouseEnter);
            image.addEventListener("mousemove", handleMouseMove);
            image.addEventListener("mouseleave", handleMouseLeave);
         });

      return () => {
         if (images)
            images.forEach((image) => {
               image.addEventListener("touchend", handleTouchEnd);
               image.addEventListener("touchmove", handleTouchMove);
               image.removeEventListener("mouseenter", handleMouseEnter);
               image.removeEventListener("mousemove", handleMouseMove);
               image.removeEventListener("mouseleave", handleMouseLeave);
            });
      };
   }, [isOpen, isMounted]);

   return { isOpenModal, magnifierRef, isMounted, closeModal };
}
