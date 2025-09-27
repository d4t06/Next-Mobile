"use client";

import { Button } from "@/components";
import { AddItem, Modal, ModalRef } from "@/components/modal";
import { useRef } from "react";
import { useCurrentProductContext } from "../CurrentProductContext";
import useFeatureAction from "../_hooks/useFeatureAction";
import { PlusIcon } from "@heroicons/react/16/solid";

export default function AddFeatureBtn() {
  const { product } = useCurrentProductContext();

  const modalRef = useRef<ModalRef>(null);

  const { action, isFetching } = useFeatureAction();

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
        <AddItem
          cbWhenSubmit={(v) =>
            action({
              type: "Add",
              feature: {
                product_id: product.id,
                value: v,
              },
            })
          }
          title="Add feature"
          loading={isFetching}
        />
      </Modal>
    </>
  );
}
