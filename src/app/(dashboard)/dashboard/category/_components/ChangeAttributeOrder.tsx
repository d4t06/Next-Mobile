import AnimateModal, { ModalRef, ModalWrapper } from "@/components/modal/AnimateModal";
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

  const closeModal = () => {
    modalRef.current?.close();
    setIsOpenModal(false);
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

      <AnimateModal ref={modalRef}>
        {isOpenModal && (
          <ModalWrapper>
            <ModalHeader closeModal={closeModal} title="Change order" />

            <div className="flex flex-col flex-grow overflow-auto space-y-2">
              {orderedAttribute.map((att, index) =>
                att ? (
                  <button
                    key={index}
                    onClick={() => handleChangeOrder(index)}
                    data-id={att.id}
                    className={`attribute-item p-1.5 ${currentIndex === index ? "bg-red-300" : "hover:bg-red-300 bg-[#f1f1f1]"}  border-[2px] border-[#ccc] rounded-md`}
                  >
                    {att.attribute_name}
                  </button>
                ) : (
                  <p key={index}>Wrong index</p>
                ),
              )}
            </div>

            <Button
              className="mt-3"
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
          </ModalWrapper>
        )}
      </AnimateModal>
    </>
  );
}
