"use client";

import { ReactNode, createContext, useContext, useRef, useState } from "react";

type Status = "get-image" | "delete-image" | "idle";

const useImage = () => {
  const [images, setImages] = useState<ImageType[]>([]);
  const [uploadingImages, setUploadingImages] = useState<ImageType[]>([]);
  const [isLast, setIsLast] = useState(false);
  const [page, setPage] = useState(1);

  const [status, setStatus] = useState<Status>("idle");

  const shoudFetchingImage = useRef(true);

  return {
    page,
    setPage,
    images,
    setImages,
    uploadingImages,
    setUploadingImages,
    isLast,
    setIsLast,
    status,
    setStatus,
    shoudFetchingImage,
  };
};

type ContextType = ReturnType<typeof useImage>;

const ct = createContext<ContextType | null>(null);

export default function ImageProvider({ children }: { children: ReactNode }) {
  return <ct.Provider value={useImage()}>{children}</ct.Provider>;
}

export const useImageContext = () => {
  const context = useContext(ct);
  if (!context) throw new Error("ImageProvider is required");

  return context;
};
