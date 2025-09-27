"use client";

import { Button } from "@/components";
import { Modal, ModalRef } from "@/components/modal";
import { useRef, useState } from "react";
import TagSelectModal from "./TagSelectModal";
import useFetch from "@/hooks/useFetch";
import { runRevalidateTag } from "@/app/actions";
import { PlusIcon } from "@heroicons/react/16/solid";
import { useToastContext } from "@/stores/ToastContext";

type Props = {
  tags: Tag[];
  product: Product;
};

type ProductTagSchema = Omit<ProductTag, "tag">;

export default function AddTagBtn({ tags, product }: Props) {
  const { setErrorToast, setSuccessToast } = useToastContext();

  const [isFetching, setIsFetching] = useState(false);

  const modalRef = useRef<ModalRef>(null);

  const $fetch = useFetch();

  const handleSubmit = async (selectedTags: Tag[]) => {
    try {
      setIsFetching(true);
      const oldIds = new Set(product.product_tags.map((pT) => pT.tag_id));
      const newIds = new Set(selectedTags.map((t) => t.id));

      const newTags = selectedTags.filter((t) => !oldIds.has(t.id));
      const removedTags = product.product_tags.filter((pT) => !newIds.has(pT.tag_id));

      if (newTags.length) {
        const newProductTags: ProductTagSchema[] = newTags.map((t) => ({
          tag_id: t.id,
          product_id: product.id,
        }));

        await $fetch.post("/products/tags", newProductTags);
      }

      if (removedTags.length) {
        for (var i = 0; i < removedTags.length; i++) {
          removedTags[i];
          await $fetch.delete(`/products/${product.id}/tags/${removedTags[i].tag_id}`);
        }
      }

      await runRevalidateTag(`product-${product.id}`);
      await runRevalidateTag(`products-${product.category_id}`);

      setSuccessToast("Tag edited");
    } catch (error) {
      console.log(error);
      setErrorToast();
    } finally {
      setIsFetching(false);
      modalRef.current?.close();
    }
  };

  return (
    <>
      <Button
        onClick={() => modalRef.current?.open()}
        className={`p-1.5 ml-5`}
        size={"clear"}
      >
        <PlusIcon className="w-5" />
        <div className="hidden md:block">Add tag</div>
      </Button>

      <Modal ref={modalRef}>
        <TagSelectModal
          current={product.product_tags.map((pT) => pT.tag)}
          choose={handleSubmit}
          tags={tags}
          loading={isFetching}
        />
      </Modal>
    </>
  );
}
