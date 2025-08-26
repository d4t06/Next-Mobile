import {
  ChangeEvent,
  ClipboardEventHandler,
  RefObject,
  useRef,
} from "react";

import { FolderOpenIcon } from "@heroicons/react/24/outline";
import { ModalRef,ModalContentWrapper } from ".";
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

  const handlePaste: ClipboardEventHandler = async (e) => {
    try {
      const fileLists = e.clipboardData?.files;
      if (!fileLists.length) return;

      uploaderRef.current?.upload(Array.from(fileLists), { ...props });

      modalRef?.current?.close();
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
    modalRef,
    ...props,
  });

  const labelRef = useRef<HTMLLabelElement>(null);

  return (
   <ModalContentWrapper>
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

      <input
        onPaste={handlePaste}
        type="text"
        readOnly
        placeholder="Paste image here"
        className="my-input "
      />

      <p className="text-center mt-5">
        <Button onClick={() => labelRef.current?.click()}>
          <FolderOpenIcon className="w-6" />
          <span>Choose from computer</span>
        </Button>
      </p>
    </ModalContentWrapper>
  );
}
