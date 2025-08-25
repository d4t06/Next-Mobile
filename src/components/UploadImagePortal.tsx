"use client";

import useUploadImage from "@/hooks/useUploadImage";
import { useImageContext } from "@/stores/ImageContext";
import { useImperativeHandle } from "react";

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
