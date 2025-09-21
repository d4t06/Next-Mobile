import useBrandAction from "../_hooks/useBrandAction";
import simonCat from "@/assets/search-empty.png";

import { useRef, useState } from "react";
import { generateId } from "@/utils/appHelper";

import { PencilSquareIcon, PhotoIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Modal, ModalRef } from "@/components/modal";
import ItemRightCta from "@/components/ui/ItemRightCta";
import ConfirmModal from "@/components/modal/Confirm";
import AddItem from "@/components/modal/AddItem";
import MyImage from "@/components/ui/MyImage";
import Gallery from "@/modules/gallery";

type Props = {
  brand: Brand;
  index: number;
};

export default function BrandItem({ brand, index }: Props) {
  type Modal = "edit" | "delete" | "image";

  const modalRef = useRef<ModalRef | null>(null);
  const [modal, setModal] = useState<Modal | "">("");

  const { actions, isFetching } = useBrandAction({ modalRef });

  const openModal = (m: Modal) => {
    setModal(m);
    modalRef.current?.open();
  };

  return (
    <>
      <div className="border border-[--a-5-cl] rounded-lg p-2">
        <ItemRightCta>
          <span>{brand.brand_name}</span>

          <div>
            <button onClick={() => openModal("edit")}>
              <PencilSquareIcon className="w-5" />
            </button>
            <button onClick={() => openModal("image")}>
              <PhotoIcon className="w-5" />
            </button>
            <button onClick={() => openModal("delete")}>
              <TrashIcon className="w-5" />
            </button>
          </div>

          <Modal ref={modalRef}>
            {modal === "delete" && (
              <ConfirmModal
                label="Delete brand"
                loading={isFetching}
                callback={() => actions({ type: "Delete", id: brand.id, index })}
              />
            )}

            {modal === "edit" && (
              <AddItem
                variant="input"
                title="Edit brand"
                loading={isFetching}
                initValue={brand.brand_name}
                cbWhenSubmit={(v) =>
                  actions({
                    type: "Edit",
                    brand: {
                      brand_name: v,
                      brand_name_ascii: generateId(v),
                    },
                    id: brand.id,
                    index: index,
                  })
                }
              />
            )}

            {modal === "image" && (
              <Gallery
                setImageUrl={(images) =>
                  actions({
                    type: "Edit",
                    brand: {
                      image_url: images[0].image_url,
                    },
                    id: brand.id,
                    index: index,
                  })
                }
              />
            )}
          </Modal>
        </ItemRightCta>

        <MyImage
          className=" object-cover mx-auto"
          src={brand.image_url || simonCat.src}
          width={90}
          height={90}
        />
      </div>
    </>
  );
}
