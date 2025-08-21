"use client";

import AnimateModal, { ModalRef, ModalWrapper } from "@/components/modal/AnimateModal";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";
import useDescriptionAction from "../_hooks/useDescriptionAction";
import Button from "@/components/ui/Button";
import MyEditor from "./MyEditor";

type Props = {
  product: Product;
};

export default function EditDescriptionBtn({ product }: Props) {
  const { update, isFetching } = useDescriptionAction();

  const modalRef = useRef<ModalRef>(null);

  return (
    <>
      <Button
        colors="second"
        onClick={() => modalRef.current?.open()}
        size="clear"
        className="p-1.5"
      >
        <Cog6ToothIcon className="w-6" />
      </Button>

      <AnimateModal ref={modalRef}>
        <ModalWrapper className="w-[700px]" style="bg-white rounded-lg overflow-hidden">
          <MyEditor
            isLoading={isFetching}
            submit={(v) =>
              update({
                desc: { content: v },
                productId: product.id,
              })
            }
            content={product.description.content}
          />
        </ModalWrapper>
      </AnimateModal>
    </>
  );
}
