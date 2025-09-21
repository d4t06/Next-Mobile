"use client";

import { Button } from "@/components";
import { Modal, ModalRef } from "@/components/modal";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";
import AddTagModal from "./AddTagModal";

type Props = {
  value: string;
};

export default function AddNewTagButton({ value }: Props) {
  const modalRef = useRef<ModalRef>(null);

  return (
    <>
      <Button
        onClick={() => modalRef.current?.open()}
        className={`p-1.5 ml-5`}
        size={"clear"}
      >
        <PlusIcon className="w-6" />
        <div className="hidden md:block">Add tag</div>
      </Button>

      <Modal ref={modalRef}>
        <AddTagModal name={value} type="add" />
      </Modal>
    </>
  );
}
