import { Modal, ModalRef, ModalContentWrapper } from "@/components/modal";
import { useEffect, useMemo, useRef, useState } from "react";
import useCategoryAction from "../_hooks/useCategoryAction";
import Button from "@/components/ui/Button";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import ModalHeader from "@/components/modal/ModalHeader";

type Props = {
  currentCategory: Category;
};

export default function ChangeAttributeOrder({ currentCategory }: Props) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>();
  const [localAttributeOrder, setLocalAttributeOrder] = useState<string[]>([]);

  const modalRef = useRef<ModalRef | null>(null);

  const { actions, isFetching } = useCategoryAction({ modalRef });

  const orderedAttribute = useMemo(
    () =>
      localAttributeOrder.map((id) =>
        currentCategory?.attributes.find((att) => att.id === +id),
      ),
    [currentCategory, localAttributeOrder],
  );

  const handleChangeOrder = (index: number) => {
    if (currentIndex === undefined) setCurrentIndex(index);
    else if (index === currentIndex) setCurrentIndex(undefined);
    else {
      const newOrder = [...localAttributeOrder];

      const temp = newOrder[currentIndex];

      newOrder[currentIndex] = localAttributeOrder[index];
      newOrder[index] = temp;

      setCurrentIndex(undefined);

      setLocalAttributeOrder(newOrder);
    }
  };

  const openModal = () => {
    modalRef.current?.open();
    setIsOpenModal(true);
  };

  useEffect(() => {
    if (currentCategory)
      setLocalAttributeOrder(currentCategory.attribute_order.split("_"));
  }, [currentCategory]);

  return (
    <>
      <Button onClick={openModal}>
        <ArrowPathIcon className="w-6" />
        <span>Change order</span>
      </Button>

      <Modal onClose={() => setIsOpenModal(false)} ref={modalRef}>
        {isOpenModal && (
          <ModalContentWrapper>
            <ModalHeader title="Change order" />

            <div className="flex flex-col flex-grow overflow-auto space-y-2">
              {orderedAttribute.map((att, index) =>
                att ? (
                  <button
                    key={index}
                    onClick={() => handleChangeOrder(index)}
                    data-id={att.id}
                    className={`attribute-item p-1.5 ${currentIndex === index ? "bg-red-500" : "bg-white dark:bg-slate-700"} border-2 border-[--a-5-cl] rounded-md`}
                  >
                    {att.attribute_name}
                  </button>
                ) : (
                  <p key={index}>Wrong index</p>
                ),
              )}
            </div>

            <p className="text-right">
              <Button
                className="mt-5"
                loading={isFetching}
                onClick={() => {
                  actions({
                    type: "Edit",
                    category: { attribute_order: localAttributeOrder.join("_") },
                    id: currentCategory!.id,
                  });
                }}
              >
                Save
              </Button>
            </p>
          </ModalContentWrapper>
        )}
      </Modal>
    </>
  );
}
