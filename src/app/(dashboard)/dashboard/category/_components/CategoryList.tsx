"use client";

import Modal from "@/components/modal";
import AddItem from "@/components/modal/AddItem";
import ConfirmModal from "@/components/modal/Confirm";
import Box from "@/components/ui/Box";
import { generateId } from "@/utils/appHelper";
import { useMemo, useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import OverlayCTA from "@/components/ui/OverlayCta";
import useCategoryAction from "../_hooks/useCategoryAction";

type Props = {
   categories: Category[];
};

type Modal = "add" | "edit" | "delete";

export default function CategoryList({ categories }: Props) {
   const [isOpenModal, setIsOpenModal] = useState<Modal | "">("");
   //  const [apiLoading, setApiLoading] = useState(false);

   const [currentCategoryIndex, setCurrentCategoryIndex] = useState<number>();

   // use hooks
   const { actions, isFetching } = useCategoryAction();

   const currentCategory = useMemo(
      () =>
         currentCategoryIndex !== undefined
            ? categories[currentCategoryIndex]
            : undefined,
      [currentCategoryIndex, categories]
   );

   const closeModal = () => setIsOpenModal("");

   type Add = {
      type: "Add";
      value: string;
   };

   type Edit = {
      type: "Edit";
      value: string;
   };

   type Delete = {
      type: "Delete";
   };

   const handleCategoryActions = async (props: Add | Edit | Delete) => {
      if (props.type === "Delete") {
         if (currentCategory === undefined) return;
         await actions({
            type: "Delete",
            id: currentCategory.id,
         });

         closeModal();

         return;
      }

      switch (props.type) {
         case "Add": {
            const schema: CategorySchema = {
               attribute_order: "",
               category_name: props.value,
               category_name_ascii: generateId(props.value),
            };

            await actions({ type: "Add", category: schema });
            break;
         }
         case "Edit": {
            if (currentCategory === undefined) return;

            const schema: Partial<CategorySchema> = {
               category_name: props.value,
               category_name_ascii: generateId(props.value),
            };

            await actions({
               type: "Edit",
               category: schema,
               id: currentCategory.id,
            });
            break;
         }
      }

      closeModal();
   };

   const renderModal = () => {
      if (!isOpenModal) return;
      switch (isOpenModal) {
         case "add":
            return (
               <AddItem
                  loading={isFetching}
                  title="Add category"
                  cbWhenSubmit={(value) => handleCategoryActions({ type: "Add", value })}
                  closeModal={closeModal}
               />
            );

         case "edit":
            if (!currentCategory) return;
            return (
               <AddItem
                  loading={isFetching}
                  initValue={currentCategory.category_name}
                  title={`Edit category '${currentCategory.category_name}'`}
                  cbWhenSubmit={(value) => handleCategoryActions({ type: "Edit", value })}
                  closeModal={closeModal}
               />
            );
         case "delete":
            if (currentCategory === undefined) return;

            return (
               <ConfirmModal
                  callback={() => handleCategoryActions({ type: "Delete" })}
                  loading={isFetching}
                  closeModal={closeModal}
                  label={`Delete category '${currentCategory.category_name}'`}
               />
            );

         default:
            return <h1 className="text-3xl">Not thing to show</h1>;
      }
   };

   return (
      <>
         <div className="flex flex-wrap -mx-[8px] -mt-[8px]">
            {categories.map((c, index) => (
               <div key={index} className="w-1/6 px-[8px] mt-[8px]">
                  <Box className="font-[500]">
                     {c.category_name}
                     <OverlayCTA
                        data={[
                           {
                              cb: () => {
                                 setCurrentCategoryIndex(index);
                                 setIsOpenModal("edit");
                              },
                              icon: <PencilSquareIcon className="w-[22px]" />,
                           },
                           {
                              cb: () => {
                                 setCurrentCategoryIndex(index);
                                 setIsOpenModal("delete");
                              },
                              icon: <TrashIcon className="w-[22px]" />,
                           },
                        ]}
                     />
                  </Box>
               </div>
            ))}

            <div className="w-1/6 mt-[8px] px-[8px]">
               <Box
                  onClick={() => {
                     setCurrentCategoryIndex(undefined);
                     setIsOpenModal("add");
                  }}
               />
            </div>
         </div>

         {isOpenModal && <Modal closeModal={closeModal}>{renderModal()}</Modal>}
      </>
   );
}
