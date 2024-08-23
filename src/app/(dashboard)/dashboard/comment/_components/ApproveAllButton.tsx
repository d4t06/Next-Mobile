"use client";

import Modal from "@/components/modal";
import ConfirmModal from "@/components/modal/Confirm";
import Button from "@/components/ui/Button";
import useCommentAction from "@/hooks/useCommentAction";
import { CheckIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

type Props = {
  comments: ProductComment[];
};

export default function ApproveAllButton({ comments }: Props) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { action, isFetching } = useCommentAction();

  const closeModal = () => setIsOpenModal(false);

  const handleApproveAll = async () => {
    const productIdList: number[] = [];

    comments.forEach((c) => {
      if (!productIdList.includes(c.product_id)) productIdList.push(c.product_id);
    });

    await action({
      variant: "approve",
      id_list: comments.map((c) => c.id),
      product_id_list: productIdList,
    });

    closeModal();
  };

  return (
    <>
      <Button
        border={"clear"}
        onClick={() => setIsOpenModal(true)}
        className="space-x-1 p-1 sm:px-2"
        size={"clear"}
      >
        <CheckIcon className="w-6" />
        <span className="hidden sm:block">Approve All</span>
      </Button>

      {isOpenModal && (
        <Modal closeModal={closeModal}>
          <ConfirmModal
            label="Approve all?"
            callback={handleApproveAll}
            closeModal={closeModal}
            loading={isFetching}
          />
        </Modal>
      )}
    </>
  );
}
