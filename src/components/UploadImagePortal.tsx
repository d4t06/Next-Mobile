"use client";

import useUploadImage from "@/hooks/useUploadImage";
import { useImageContext } from "@/stores/ImageContext";
import { useImperativeHandle, useRef } from "react";

function UploadImagePortal() {
  const inputRef = useRef<HTMLInputElement>(null);

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
