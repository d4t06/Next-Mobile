import { useRef, useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Modal, ModalRef } from "@/components/modal";
import useTagAction from "../_hooks/useTagAction";
import AddTagModal from "./AddTagModal";
import ConfirmModal from "@/components/modal/Confirm";
import ItemRightCtaFrame from "@/components/dashboard/ItemRightCta";

type Props = {
  tag: Tag;
};

type Modal = "edit" | "delete";

export default function TagItem({ tag }: Props) {
  const [modal, setModal] = useState<Modal | "">("");

  const modalRef = useRef<ModalRef>(null);

  const { action, isFetching } = useTagAction();

  const openModal = (m: Modal) => {
    setModal(m);

    modalRef.current?.open();
  };

  const handleDeleteGenre = async () => {
    await action({ type: "delete", id: tag.id });
    // closeModal();
  };

  return (
    <>
      <ItemRightCtaFrame>
        <span>{tag.name}</span>

        <div>
          <button className="" onClick={() => openModal("edit")}>
            <PencilIcon className="w-5" />
          </button>
          <button onClick={() => openModal("delete")}>
            <TrashIcon className="w-5" />
          </button>
        </div>
      </ItemRightCtaFrame>

      <Modal ref={modalRef}>
        {modal === "edit" && <AddTagModal type="edit" tag={tag} />}

        {modal === "delete" && (
          <ConfirmModal
            callback={handleDeleteGenre}
            loading={isFetching}
            label={`Delete tag '${tag.name}'`}
          />
        )}
      </Modal>
    </>
  );
}
