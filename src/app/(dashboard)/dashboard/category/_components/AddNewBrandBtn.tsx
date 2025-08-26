import { useRef } from "react";
import useBrandAction from "../_hooks/useBrandAction";
import { PlusIcon } from "@heroicons/react/24/outline";
import { generateId } from "@/utils/appHelper";
import Button from "@/components/ui/Button";
import  {Modal, ModalRef } from "@/components/modal";
import AddItem from "@/components/modal/AddItem";

type Props = {
  currentCategory: Category;
};

export default function AddNewBrandBtn({ currentCategory }: Props) {
  const modalRef = useRef<ModalRef>(null);
  const { actions, isFetching } = useBrandAction({ modalRef });

  return (
    <>
      <Button
        disabled={!currentCategory}
        onClick={() => modalRef.current?.open()}
        size={"clear"}
        className="p-1.5"
      >
        <PlusIcon className="w-6" />
        <span className="hidden sm:block">Add new brand</span>
      </Button>

      <Modal ref={modalRef}>
        <AddItem
          v-if="props.currentCategory"
          variant="input"
          closeModal={() => modalRef.current?.close()}
          cbWhenSubmit={(v) =>
            currentCategory &&
            actions({
              type: "Add",
              brand: {
                brand_name: v,
                brand_name_ascii: generateId(v),
                category_id: currentCategory.id,
                image_url: "",
              },
            })
          }
          loading={isFetching}
          title="Add new brand"
        />
      </Modal>
    </>
  );
}
