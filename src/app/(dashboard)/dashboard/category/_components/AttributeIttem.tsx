import useAttributeAction from "../_hooks/useAttributeAction";

import { useRef, useState } from "react";
import { generateId } from "@/utils/appHelper";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Modal, ModalRef } from "@/components/modal";
import ItemRightCta from "@/components/ui/ItemRightCta";
import ConfirmModal from "@/components/modal/Confirm";
import AddItem from "@/components/modal/AddItem";
import { useCurrentCategoryContext } from "../../_components/CurrentCategoryContext";

type Props = {
  attribute: CategoryAttribute;
  index: number | undefined;
};
type Modal = "edit" | "delete";

export default function AttributeItem({ attribute, index }: Props) {
  const { currentCategory } = useCurrentCategoryContext();

  const modalRef = useRef<ModalRef | null>(null);
  const [modal, setModal] = useState<Modal | "">("");

  const { actions, isFetching } = useAttributeAction({ modalRef });

  const openModal = (m: Modal) => {
    setModal(m);
    modalRef.current?.open();
  };

  return (
    <>
      <ItemRightCta>
        <span>{attribute.attribute_name}</span>

        <div>
          <button onClick={() => openModal("edit")}>
            <PencilIcon className="w-5" />
          </button>
          <button onClick={() => openModal("delete")}>
            <TrashIcon className="w-5" />
          </button>
        </div>

        <Modal ref={modalRef}>
          {modal === "delete" && currentCategory && index !== undefined && (
            <ConfirmModal
              loading={isFetching}
              callback={() =>
                actions({
                  type: "Delete",
                  id: attribute.id,
                  category: currentCategory,
                  index,
                })
              }
            />
          )}

          {modal === "edit" && index !== undefined && (
            <AddItem
              variant="input"
              title="Edit category"
              loading={isFetching}
              initValue={attribute.attribute_name}
              cbWhenSubmit={(v) =>
                actions({
                  type: "Edit",
                  attribute: {
                    attribute_name: v,
                    attribute_name_ascii: generateId(v),
                  },
                  id: attribute.id,
                  index,
                })
              }
            />
          )}
        </Modal>
      </ItemRightCta>
    </>
  );
}
