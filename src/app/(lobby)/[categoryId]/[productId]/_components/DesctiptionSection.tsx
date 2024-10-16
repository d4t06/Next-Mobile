"use client";

import ImageModal from "@/components/modal/ImageModal";
import useDescriptionSection from "@/hooks/useDescriptionSection";
import useMagnifier from "@/hooks/useMagnifier";
import { useMagnifierContext } from "@/stores/MagnifierContext";
import HTMLReactParser from "html-react-parser/lib/index";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
   product: Product;
};

export default function DescriptionSection({ product }: Props) {
   const { isMounted, isOpenModal, magnifierRef, closeModal } = useDescriptionSection();

   return (
      <>
         <div className="content [&>*]:mt-5 [&>p]:text-[#495057] [&>h5]:font-[500] [&>h5]:text-xl [&>img]:rounded-[8px] sm:[&>img]:max-w-[80%] [&>img]:mx-auto">
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
