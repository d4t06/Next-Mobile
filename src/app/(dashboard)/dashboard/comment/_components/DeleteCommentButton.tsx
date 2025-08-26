"use client";

// import ConfirmModal from "@/components/modal/Confirm";
// import Button from "@/components/ui/Button";
// import { TrashIcon } from "@heroicons/react/24/outline";
// import { useState } from "react";

type Props = {
  comment: ProductComment;
};

export default function DeleteCommentButton({ }: Props) {
  // const { action, isFetching } = useCommentAction();

  // const [isOpenModal, setIsOpenModal] = useState(false);

  // const closeModal = () => setIsOpenModal(false);

  // const handleDelete = async () => {
  //   await action({ variant: "delete", id: comment.id });

  //   closeModal();
  // };

  return (
    <>
    {/*  <Button
        loading={isFetching}
        onClick={() => setIsOpenModal(true)}
        className="space-x-1 p-1 sm:px-2"
        size={"clear"}
        colors={"second"}
      >
        <TrashIcon className="w-6" />
        <span className="hidden sm:block">Delete</span>
      </Button>

      {isOpenModal && (
        <Modal closeModal={closeModal}>
          <ConfirmModal
            callback={handleDelete}
            closeModal={closeModal}
            loading={isFetching}
          />
        </Modal>
      )}*/}
    </>
  );
}
