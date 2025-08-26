"use client";

import AddItem from "@/components/modal/AddItem";
import Button from "@/components/ui/Button";
import { useMemo, useRef } from "react";
import useSpecAction from "../_hooks/useSpecAction";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Modal, ModalRef } from "@/components/modal";

type Props = {
  product: Product;
  id: number;
  productCategory: Category;
};

export default function SpecItem({ id, product, productCategory }: Props) {
  const modalRef = useRef<ModalRef>(null);

  //    hooks
  const { actions, isFetching } = useSpecAction({ productId: product.id });

  const foundedCatAttribute = useMemo(
    () => productCategory.attributes.find((c) => c.id === +id),
    [productCategory],
  );

  const foundedAttribute = useMemo(
    () =>
      product.attributes.find(
        (att) => att.category_attribute_id === foundedCatAttribute?.id,
      ),
    [product],
  );

  const handleUpdateAttribute = async (value: string) => {
    if (foundedAttribute) {
      const schema: ProductAttributeSchema = {
        ...foundedAttribute,
        value,
      };

      await actions({
        type: "Edit",
        attribute: schema,
        id: foundedAttribute.id,
      });
    } else if (foundedCatAttribute) {
      if (!product) return;
      const schema: ProductAttributeSchema = {
        value,
        category_attribute_id: foundedCatAttribute.id,
        product_id: product.id,
      };

      await actions({
        type: "Add",
        attribute: schema,
      });
    }

    () => modalRef.current?.close();
  };

  if (!foundedCatAttribute)
    return (
      <tr>
        <td colSpan={3}>Attribute not found</td>
      </tr>
    );

  return (
    <>
      <tr className="border-b last:border-none border-[--a-5-cl] [&_td]:py-1 [&_td]:px-2 sm:[&_td]:py-2 sm:[&_td]:px-4">
        <td className="font-semibold">{foundedCatAttribute.attribute_name}</td>
        <td className="whitespace-break-spaces">{foundedAttribute?.value || "..."}</td>
        <td className="text-right ">
          <Button
            className="p-1  sm:px-3"
            size={"clear"}
            onClick={() => modalRef.current?.open()}
            colors={"second"}
          >
            <PencilSquareIcon className="w-5" />
            <span className="hidden sm:inline ml-1">Change</span>
          </Button>
        </td>
      </tr>

      <Modal ref={modalRef}>
        <AddItem
          variant="text-are"
          loading={isFetching}
          cbWhenSubmit={(value) => handleUpdateAttribute(value)}
          closeModal={() => modalRef.current?.close()}
          title={`Edit '${foundedCatAttribute.attribute_name}'`}
          initValue={foundedAttribute?.value || ""}
        />
      </Modal>
    </>
  );
}
