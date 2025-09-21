"use client";

import { useImageContext } from "@/stores/ImageContext";
import { useImperativeHandle } from "react";
import useUploadImage from "./useUploadImage";

function UploadImagePortal() {
  const { uploaderRef } = useImageContext();
  const { uploadImage } = useUploadImage();

  useImperativeHandle(uploaderRef, () => ({ upload: uploadImage }));

  return (
    <>
      <div className="fixed"></div>
    </>
  );
}

export default UploadImagePortal;
