import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import useCategoryAction from "../_hooks/useCategoryAction";
import { generateId } from "@/utils/appHelper";
import { Modal, ModalRef } from "@/components/modal";
import ItemRightCta from "@/components/ui/ItemRightCta";
import ConfirmModal from "@/components/modal/Confirm";
import AddItem from "@/components/modal/AddItem";

type Modal = "edit" | "delete";

type Props = {
  category: Category;
};

export default function CategoryItem({ category }: Props) {
  const modalRef = useRef<ModalRef | null>(null);
  const [modal, setModal] = useState<Modal | "">("");

  const { actions, isFetching } = useCategoryAction({ modalRef });

  const openModal = (m: Modal) => {
    setModal(m);
    modalRef.current?.open();
  };

  return (
    <ItemRightCta className="ml-2 mt-2">
      <span>{category.category_name}</span>

      <div>
        <button onClick={() => openModal("edit")}>
          <PencilIcon className="w-5" />
        </button>
        <button onClick={() => openModal("delete")}>
          <TrashIcon className="w-5" />
        </button>
      </div>

      <Modal ref={modalRef}>
        {modal === "delete" && (
          <ConfirmModal
            loading={isFetching}
            closeModal={() => modalRef.current?.close()}
            callback={() => actions({ type: "Delete", id: category.id })}
          />
        )}
        {modal === "edit" && (
          <AddItem
            variant="input"
            title="Edit category"
            loading={isFetching}
            initValue={category.category_name}
            closeModal={() => modalRef.current?.close()}
            cbWhenSubmit={(v) =>
              actions({
                type: "Edit",
                category: {
                  category_name: v,
                  category_name_ascii: generateId(v),
                },
                id: category.id,
              })
            }
          />
        )}
      </Modal>
    </ItemRightCta>
  );
}
