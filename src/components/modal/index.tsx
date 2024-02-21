"use client";

import { Dispatch, ReactNode, SetStateAction } from "react";
import { createPortal } from "react-dom";

type Props = {
  children?: ReactNode;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  className?: string
};

function Modal({ children, setShowModal, className }: Props) {
  return (
    <>
      {createPortal(
        <>
          <div
            className={`fixed inset-0 z-[99] bg-black/60 ${className}`}
            onClick={() => setShowModal(false)}
          ></div>
          {children && (
            <div className="fixed z-[100] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
              <div className="py-[12px] px-[16px] rounded-[8px] bg-white">{children}</div>
            </div>
          )}
        </>,
        document.querySelector("#portals")!
      )}
    </>
  );
}

export default Modal;
