import { ChangeEvent, ClipboardEventHandler, RefObject, useRef } from "react";

import { FolderOpenIcon } from "@heroicons/react/24/outline";
import { ModalRef, ModalContentWrapper } from ".";
import ModalHeader from "./ModalHeader";
import Button from "../ui/Button";
import { useImageContext } from "@/stores/ImageContext";
import { useModalContext } from "./Modal";

type ReadCopiedImageProps = {
  width?: number;
  height?: number;
};

function useReadCopiedImage({ ...props }: ReadCopiedImageProps) {
  const { closeModal } = useModalContext();
  const { uploaderRef } = useImageContext();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputEle = e.target as HTMLInputElement & { files: FileList };
    const fileLists = inputEle.files;

    uploaderRef.current?.upload(Array.from(fileLists), { ...props });

    closeModal();
  };

  const handlePaste: ClipboardEventHandler = async (e) => {
    try {
      const fileLists = e.clipboardData?.files;
      if (!fileLists.length) return;

      uploaderRef.current?.upload(Array.from(fileLists), { ...props });

      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return { handleInputChange, handlePaste };
}

type Props = {
  title?: string;
  modalRef: RefObject<ModalRef>;
  width?: number;
  height?: number;
};

export default function ChooseImageModal({ title, modalRef, ...props }: Props) {
  const { handleInputChange, handlePaste } = useReadCopiedImage({
    ...props,
  });

  const labelRef = useRef<HTMLLabelElement>(null);

  return (
    <ModalContentWrapper>
      <ModalHeader title={title || "Choose image"} />

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

      <div className="relative">
        <p className="bg-[--a-5-cl] py-1 px-3 rounded-md text-[#808080]">
          Paste image here
        </p>
        <div
          className="absolute inset-0 text-transparent py-1 px-3 bg-transparent"
          onPaste={handlePaste}
          contentEditable
        ></div>
      </div>

      <p className="text-center mt-5">
        <Button onClick={() => labelRef.current?.click()}>
          <FolderOpenIcon className="w-6" />
          <span>Choose image</span>
        </Button>
      </p>
    </ModalContentWrapper>
  );
}
