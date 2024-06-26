"use client";

import { useMemo, useRef, useState } from "react";
import { generateId } from "@/utils/appHelper";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import AddItem from "@/components/modal/AddItem";
import ConfirmModal from "@/components/modal/Confirm";
import Button from "@/components/ui/Button";
import Modal from "@/components/modal";
import { useToast } from "@/stores/ToastContext";
import { inputClasses } from "@/components/ui/MyInput";
import DragAbleItem from "@/components/DragAbleItem";
import useAttributeAction from "../_hooks/useAttributeAction";
import { PlusIcon } from "@heroicons/react/16/solid";

type Props = {
   categories: Category[];
};
type Modal = "add" | "edit" | "delete";

export default function CategoryAttributeList({ categories }: Props) {
   const [curCategoryIndex, setCurCategoryIndex] = useState<number>();
   const [isOpenModal, setIsOpenModal] = useState<Modal | "">("");
   // const [isFetching, setIsFetching] = useState(false);
   const [isDrag, setIsDrag] = useState(false);

   const currentAttribute = useRef<CategoryAttribute>();
   const endIndexRef = useRef<number>(0);

   //  hooks
   const { setErrorToast } = useToast();
   // const {
   //    isPending,
   //    addCatAttribute,
   //    updateCatAttribute,
   //    deleteCatAttribute,
   //    sortAttribute,
   // } = useCategory();

   const currentCategory = useMemo(
      () => (curCategoryIndex != undefined ? categories[curCategoryIndex] : undefined),
      [categories, curCategoryIndex]
   );

   const { actions, isFetching, sortAttribute } = useAttributeAction({ currentCategory });

   const attributeOrder = currentCategory?.attribute_order
      ? currentCategory.attribute_order.split("_")
      : [];

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

   const handleAttributeAction = async (props: Add | Edit | Delete) => {
      switch (props.type) {
         case "Add": {
            if (!currentCategory) return;

            const schema: CategoryAttributeSchema = {
               category_id: currentCategory.id,
               attribute_name: props.value,
               attribute_name_ascii: generateId(props.value),
            };

            await actions({
               type: "Add",
               attribute: schema,
            });

            break;
         }
         case "Edit": {
            if (!currentAttribute.current) return;
            const schema: CategoryAttributeSchema = {
               ...currentAttribute.current,
               attribute_name: props.value,
               attribute_name_ascii: generateId(props.value),
            };

            await actions({
               type: "Edit",
               attribute: schema,
               id: currentAttribute.current.id,
            });
            break;
         }

         case "Delete": {
            if (!currentAttribute.current) return;
            await actions({
               type: "Delete",
               id: currentAttribute.current.id,
            });
         }
      }

      closeModal();
   };

   const renderModal = () => {
      if (!isOpenModal) return;

      switch (isOpenModal) {
         case "add":
            if (!currentCategory)
               return <p className="text-[16px]">Current category not found</p>;
            return (
               <AddItem
                  loading={isFetching}
                  title="Add attribute"
                  cbWhenSubmit={(value) => handleAttributeAction({ type: "Add", value })}
                  closeModal={closeModal}
               />
            );
         case "edit":
            if (currentAttribute.current === undefined) return <h1>Index not found</h1>;

            return (
               <AddItem
                  loading={isFetching}
                  title={`Edit attribute '${currentAttribute.current.attribute_name}'`}
                  cbWhenSubmit={(value) => handleAttributeAction({ type: "Edit", value })}
                  closeModal={closeModal}
                  initValue={currentAttribute.current.attribute_name}
               />
            );

         case "delete":
            if (currentAttribute.current === undefined) return;

            return (
               <ConfirmModal
                  callback={() => handleAttributeAction({ type: "Delete" })}
                  loading={isFetching}
                  closeModal={closeModal}
                  label={`Delete attribute '${currentAttribute.current.attribute_name}'`}
               />
            );

         default:
            return <h1 className="text-3xl">Not thing to show</h1>;
      }
   };

   const classes = {
      label: "font-[500] text-[#333]",
      attrItem:
         " bg-[#f1f1f1] mt-[10px] ml-[10px] px-[18px] py-[8px] border-[2px] border-[#ccc] rounded-[8px]",
      cta: "ml-[10px] pl-[10px] border-[#ccc] border-l-[1px] flex items-center space-x-[4px] text-[#333]",
   };

   return (
      <>
         <div className="flex items-center justify-between">
            <div className="flex items-center space-x-[10px]">
               <p className={classes.label}>Category: </p>
               <div className="bg-[#ccc] rounded-[12px]">
                  <select
                     disabled={!categories.length}
                     className={`${inputClasses.input} min-w-[100px]`}
                     name="category"
                     onChange={(e) => setCurCategoryIndex(+e.target.value)}
                  >
                     <option value={undefined}>---</option>
                     {!!categories.length &&
                        categories.map((category, index) => (
                           <option key={index} value={index}>
                              {category.category_name}
                           </option>
                        ))}
                  </select>
               </div>
            </div>

            <Button
               border={"clear"}
               disabled={!currentCategory}
               onClick={() => setIsOpenModal("add")}
            >
                <PlusIcon className="w-[22px]" />
               <span className="hidden sm:block"> Add attribute</span>
              
            </Button>
         </div>

         <div
            className={`mt-[4px] flex flex-wrap items-start ml-[-10px] ${
               false ? "disable" : ""
            }`}
         >
            {currentCategory && (
               <>
                  {attributeOrder.length ? (
                     attributeOrder.map((id, index) => {
                        const foundedCatAttribute = currentCategory.attributes.find(
                           (attr) => attr.id === +id
                        );
                        if (!foundedCatAttribute) return <p>Wrong index</p>;

                        return (
                           <DragAbleItem
                              index={index}
                              key={index}
                              className={`${classes.attrItem} ${
                                 isFetching ? "opacity-60 pointer-events-none" : ""
                              }`}
                              setIsDrag={setIsDrag}
                              isDrag={isDrag}
                              handleDragEnd={() =>
                                 sortAttribute(index, endIndexRef.current)
                              }
                              endIndexRef={endIndexRef}
                           >
                              <div className="flex">
                                 <span className="text-[14px]">
                                    {foundedCatAttribute.attribute_name}
                                 </span>
                                 <div className={classes.cta}>
                                    <button
                                       className="hover:text-[#cd1818]"
                                       onClick={() => {}}
                                    >
                                       <TrashIcon className="w-[22px]" />
                                    </button>
                                    <button
                                       className="hover:text-[#cd1818]"
                                       onClick={() => {}}
                                    >
                                       <PencilSquareIcon className="w-[22px]" />
                                    </button>
                                 </div>
                              </div>
                           </DragAbleItem>
                        );
                     })
                  ) : (
                     <p className="text-center w-full mt-[10px]">¯\_(ツ)_/¯ </p>
                  )}
               </>
            )}
         </div>

         {isOpenModal && <Modal closeModal={closeModal}>{renderModal()}</Modal>}
      </>
   );
}
