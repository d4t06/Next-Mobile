import { ChangeEvent, RefObject, useEffect, useRef, useState } from "react";

import { FolderOpenIcon } from "@heroicons/react/24/outline";
import { ModalRef, ModalWrapper } from "./AnimateModal";
import ModalHeader from "./ModalHeader";
import Button from "../ui/Button";
import { useImageContext } from "@/stores/ImageContext";

type ReadCopiedImageProps = {
  modalRef?: RefObject<ModalRef>;
  width?: number;
  height?: number;
};

function useReadCopiedImage({ modalRef, ...props }: ReadCopiedImageProps) {
  const { uploaderRef } = useImageContext();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputEle = e.target as HTMLInputElement & { files: FileList };
    const fileLists = inputEle.files;

    uploaderRef.current?.upload(Array.from(fileLists), { ...props });

    modalRef?.current?.close();
  };

  const handleReadImage = async (e: ClipboardEvent) => {
    try {
      const fileLists = e.clipboardData?.files;
      if (!fileLists) return;

      uploaderRef.current?.upload(Array.from(fileLists), { ...props });

      modalRef?.current?.close();
    } catch (error) {
      console.log(error);
    }
  };

  const handleReadImageWhenClick = async () => {
    try {
      const clipboardItems = await navigator.clipboard.read();
      for (const clipboardItem of clipboardItems) {
        for (const type of clipboardItem.types) {
          if (type.startsWith("image/")) {
            const blob = await clipboardItem.getType(type);

            const myFile = new File([blob], "image.jpeg", {
              type: blob.type,
            });

            uploaderRef.current?.upload([myFile], { ...props });
          }
        }
      }
      console.log("No image found in clipboard.");

      modalRef?.current?.close();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("paste", handleReadImage);

    return () => {
      window.removeEventListener("paste", handleReadImage);
    };
  }, []);

  return { handleInputChange, handleReadImageWhenClick };
}

type Props = {
  title?: string;
  modalRef: RefObject<ModalRef>;
  width?: number;
  height?: number;
};

export default function ChooseImageModal({ title, modalRef, ...props }: Props) {
  const { handleInputChange, handleReadImageWhenClick } = useReadCopiedImage({
    modalRef,
    ...props,
  });

  const labelRef = useRef<HTMLLabelElement>(null);

  return (
    <ModalWrapper>
      <ModalHeader
        title={title || "Choose image"}
        closeModal={() => modalRef.current?.close()}
      />

      <input
        onChange={handleInputChange}
        type="file"
        multiple
        accept="image"
        id="image-upload"
        className="hidden"
      />
      <label
        ref={labelRef}
        htmlFor="image-upload"
        className={`inline-flex p-1.5 space-x-1 md:px-3`}
      ></label>

      <div className="space-x-2 flex items-center justify-center">
        <Button
          onClick={handleReadImageWhenClick}
          className="lg:hidden"
          colors={"second"}
        >
          Paste
        </Button>

        <Button onClick={() => labelRef.current?.click()}>
          <FolderOpenIcon className="w-6" />
          <span>Choose from computer</span>
        </Button>
      </div>
    </ModalWrapper>
  );
}
