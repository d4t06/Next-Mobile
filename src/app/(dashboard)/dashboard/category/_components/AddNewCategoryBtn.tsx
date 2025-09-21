"use client";

import { useRef } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import useCategoryAction from "../_hooks/useCategoryAction";
import { Modal, ModalRef } from "@/components/modal";
import Button from "@/components/ui/Button";
import AddItem from "@/components/modal/AddItem";

export default function AddNewCategpryBtn() {
  const modalRef = useRef<ModalRef>(null);
  const { actions, isFetching } = useCategoryAction({ modalRef });

  return (
    <>
      <Button size={"clear"} className="p-1.5" onClick={() => modalRef.current?.open()}>
        <PlusIcon className="w-6" />
        <span className="hidden sm:block">Add new category</span>
      </Button>

      <Modal ref={modalRef}>
        <AddItem
          variant="input"
          cbWhenSubmit={(v) =>
            actions({
              type: "Add",
              name: v,
            })
          }
          loading={isFetching}
          title="Add new category"
        />
      </Modal>
    </>
  );
}
