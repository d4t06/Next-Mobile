"use client";

import { createPortal } from "react-dom";
import useDescriptionSection from "../_hooks/useDescriptionSection";
import ImageModal from "@/modules/image-modal";

export default function ImageModalAndMagnifier() {
  const { isOpenModal, magnifierRef, closeModal, isMounted } = useDescriptionSection();

  return (
    <>
      {!!isOpenModal && <ImageModal src={isOpenModal} closeModal={closeModal} />}

      {isMounted &&
        createPortal(
          <div
            ref={magnifierRef}
            className="top-[200px] rounded-lg overflow-hidden left-[300px] pointer-events-none fixed bg-no-repeat"
          ></div>,
          document.querySelector("#portals")!,
        )}
    </>
  );
}
