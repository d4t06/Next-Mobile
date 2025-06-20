import { useRef } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { generateId } from "@/utils/appHelper";
import useAttributeAction from "../_hooks/useAttributeAction";
import AnimateModal, { ModalRef } from "@/components/modal/AnimateModal";
import Button from "@/components/ui/Button";
import AddItem from "@/components/modal/AddItem";

type Props = {
  currentCategory: Category;
};

export default function AddNewAttributeBtn({ currentCategory }: Props) {
  const modalRef = useRef<ModalRef>(null);
  const { actions, isFetching } = useAttributeAction({ modalRef });

  return (
    <>
      <Button
        size={"clear"}
        className="p-1.5"
        disabled={!currentCategory}
        onClick={() => modalRef.current?.open()}
      >
        <PlusIcon className="w-6" />
        <span className="hidden sm:block">Add new brand</span>
      </Button>

      <AnimateModal ref={modalRef}>
        <AddItem
          v-if="props.currentCategory"
          variant="input"
          closeModal={() => modalRef.current?.close()}
          cbWhenSubmit={(v) =>
            currentCategory &&
            actions({
              type: "Add",
              categoryId: currentCategory.id,
              attribute: {
                attribute_name: v,
                attribute_name_ascii: generateId(v),
                category_id: currentCategory.id,
              },
            })
          }
          loading={isFetching}
          title="Add new attribute"
        />
      </AnimateModal>
    </>
  );
}
