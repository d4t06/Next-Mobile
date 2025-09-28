"use client";

import { Button } from "@/components";
import { Modal, ModalRef } from "@/components/modal";
import { useRef } from "react";
import { PlusIcon } from "@heroicons/react/16/solid";
import AddFeatureModal from "./AddFeatureModal";

export default function AddFeatureBtn() {
  const modalRef = useRef<ModalRef>(null);

  return (
    <>
      <Button
        onClick={() => modalRef.current?.open()}
        className={`p-1.5 ml-5`}
        size={"clear"}
      >
        <PlusIcon className="w-5" />
        <div className="hidden md:block">Add feature</div>
      </Button>

      <Modal ref={modalRef}>
        <AddFeatureModal variant="Add" />
      </Modal>
    </>
  );
}
