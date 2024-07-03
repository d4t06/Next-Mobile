"use client";

import { ReactNode } from "react";
import { createPortal } from "react-dom";

type Props = {
   children?: ReactNode;
   closeModal: () => void;
   className?: string;
   childClassName?: string;
};

function Modal({ children, closeModal, className = "z-[99]", childClassName }: Props) {
   return (
      <>
         {createPortal(
            <>
               <div
                  className={`fixed inset-0 bg-black/60 ${className}`}
                  onClick={closeModal}
               ></div>
               {children && (
                  <div
                     className={`fixed ${className} top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]`}
                  >
                     <div
                        className={`${
                           childClassName || "py-[12px] px-[16px]"
                        }rounded-[8px] bg-white`}
                     >
                        {children}
                     </div>
                  </div>
               )}
            </>,
            document.querySelector("#portals")!
         )}
      </>
   );
}

export default Modal;
