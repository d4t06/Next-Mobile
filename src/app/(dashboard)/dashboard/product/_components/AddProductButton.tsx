"use client";
import AddProductForm from "@/components/AddProductForm";
import Modal from "@/components/modal";
import AnimateModal, { ModalRef } from "@/components/modal/AnimateModal";
import Button from "@/components/ui/Button";
import { PlusIcon } from "@heroicons/react/16/solid";
import { useRef, useState } from "react";

type Props = {
  categories: Category[];
};

export default function AddProductButton({ categories }: Props) {
  const modalRef = useRef<ModalRef>(null);

  return (
    <>
      <Button border={"clear"} onClick={() => modalRef.current?.open()}>
        <PlusIcon className="w-[22px]" />
        <span className="hidden ml-[6px] sm:block">Add new</span>
      </Button>
      <AnimateModal ref={modalRef}>
        <AddProductForm
          closeModal={() => modalRef.current?.close()}
          type="Add"
          categories={categories}
        />
      </AnimateModal>
    </>
  );
}
