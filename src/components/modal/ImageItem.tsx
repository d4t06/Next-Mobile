'use client'
import { XMarkIcon } from "@heroicons/react/16/solid";
import { createPortal } from "react-dom";
import Button from "../ui/Button";
import useImageModal from "@/hooks/useImageModal";

type Props = {
   isOpenModal: string;
   closeModal: () => void;
};
export default function ImageItem({ closeModal, isOpenModal }: Props) {
   const { attributeObj, isZoomAble, isDrag, imageRef } = useImageModal({ isOpenModal });

   return (
      <>
         {isOpenModal &&
            createPortal(
               <>
                  <div
                     className={`fixed inset-0 bg-black/60 z-[99] `}
                     onClick={closeModal}
                  ></div>
                  <div className="fixed top-0 left-0 z-[199] flex items-center h-[50px] bg-black/20 w-full">
                     <Button
                        colors={"second"}
                        size={"clear"}
                        className="p-[4px] ml-auto mr-[10px]"
                        onClick={closeModal}
                     >
                        <XMarkIcon className="w-[24px]" />
                     </Button>
                  </div>
                  <div
                     className={`fixed z-[99] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]`}
                  >
                     <img
                        draggable={false}
                        ref={imageRef}
                        {...attributeObj}
                        className={`${
                           isZoomAble
                              ? "cursor-zoom-in"
                              : isDrag
                                 ? "cursor-grabbing"
                                 : "cursor-grab"
                        } select-none touch-none max-w-[95vw] origin-top-left h-auto sm:max-h-[80vh] sm:max-w-[80vw]`}
                        src={isOpenModal}
                        alt=""
                     />
                  </div>
               </>,
               document.querySelector("#portals")!
            )}
      </>
   );
}
