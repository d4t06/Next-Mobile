"use client";

import Modal from "@/components/modal";
import AddItem from "@/components/modal/AddItem";
import Button from "@/components/ui/Button";
import { useMemo, useState } from "react";
import useSpecAction from "../_hooks/useSpecAction";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

type Props = {
   product: Product;
   id: number;
   productCategory: Category;
};

export default function SpecItem({ id, product, productCategory }: Props) {
   const [openModal, setOpenModal] = useState(false);

   //    hooks
   const { actions, isFetching } = useSpecAction({ productId: product.id });

   const closeModal = () => setOpenModal(false);

   const foundedCatAttribute = useMemo(
      () => productCategory.attributes.find((c) => c.id === +id),
      [productCategory]
   );

   const foundedAttribute = useMemo(
      () =>
         product.attributes.find(
            (att) => att.category_attribute_id === foundedCatAttribute?.id
         ),
      [product]
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

      closeModal();
   };

   if (!foundedCatAttribute)
      return (
         <tr>
            <td colSpan={3}>Attribute not found</td>
         </tr>
      );

   return (
      <>
         <tr className="border-b last:border-none hover:bg-[#f1f1f1]">
            <td className="py-[8px] px-[16px] font-[500]">
               {foundedCatAttribute.attribute_name}
            </td>
            <td className="py-[8px] px-[16px]">{foundedAttribute?.value || "..."}</td>
            <td className="text-right py-[8px] px-[16px]">
               <Button onClick={() => setOpenModal(true)} colors={"second"}>
                  <PencilSquareIcon className="w-[22px] mr-[6px]" />
                  Change
               </Button>
            </td>
         </tr>

         {openModal && (
            <Modal closeModal={closeModal}>
               <AddItem
                  loading={isFetching}
                  cbWhenSubmit={(value) => handleUpdateAttribute(value)}
                  closeModal={closeModal}
                  title={`Edit '${foundedCatAttribute.attribute_name}'`}
                  initValue={foundedAttribute?.value || ""}
               />
            </Modal>
         )}
      </>
   );
}
