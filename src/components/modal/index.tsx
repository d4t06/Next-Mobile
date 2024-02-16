"use client";

import { Dispatch, ReactNode, SetStateAction } from "react";
import { createPortal } from "react-dom";

type Props = {
  children?: ReactNode;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

function Modal({ children, setShowModal }: Props) {
  return (
    <>
      {createPortal(
        <>
          <div
            className="fixed inset-0 z-[99] bg-black/60"
            onClick={() => setShowModal(false)}
          ></div>
          {children && (
            <div className="fixed z-[100] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
              <div className="p-[10px] rounded-[8px] bg-white">{children}</div>
            </div>
          )}
        </>,
        document.querySelector("#portals")!
      )}
    </>
  );
}

export default Modal;
