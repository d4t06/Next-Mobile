"use client";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";

import { generateId } from "@/utils/appHelper";
import { PlusIcon } from "@heroicons/react/16/solid";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import AddItem from "@/components/modal/AddItem";
import ConfirmModal from "@/components/modal/Confirm";
import { inputClasses } from "./ui/MyInput";
import Button from "@/components/ui/Button";
import Modal from "@/components/modal";
import { publicRequest } from "@/utils/request";
import { useRouter } from "next/navigation";

type Props = {
   categories: Category[];
};
type ModalTarget = "add-attr" | "edit-attr" | "delete-attr";

const CAT_ATTR_URL = "/categories/attributes";

function CategoryAttributeGroup({ categories }: Props) {
   const [curCategory, setCurCategory] = useState<Category | undefined>();
   const [curCategoryIndex, setCurCategoryIndex] = useState<number>();
   const [isOpenModal, setIsOpenModal] = useState(false);
   const [isFetching, setIsFetching] = useState(false);

   const openModalTarget = useRef<ModalTarget | "">("");
   const curAttr = useRef<CategoryAttribute>();

   //  hooks
   const router = useRouter();
   const [isPending, startTransition] = useTransition();

   const isLoading = isFetching || isPending;

   const handleAddAttr = async (value: string, type: "Add" | "Edit") => {
      if (curCategory?.id === undefined)
         throw new Error("curCategory.id is undefined");

      const newCatAttr: CategoryAttributeSchema = {
         attribute_name: value,
         attribute_ascii: generateId(value),
         category_id: curCategory?.id,
      };

      try {
         setIsFetching(true);

         switch (type) {
            case "Add":
               await publicRequest.post(CAT_ATTR_URL, newCatAttr);

               startTransition(() => {
                  router.refresh();
               });

               break;

            case "Edit":
               if (curAttr.current === undefined) return;
               const { category_id, ...updateData } = newCatAttr;
               await publicRequest.put(
                  `${CAT_ATTR_URL}/${curAttr.current.id}`,
                  updateData
               );

               startTransition(() => {
                  router.refresh();
               });
         }
      } catch (error) {
         console.log(error);
      } finally {
         setIsFetching(false);
         setIsOpenModal(false);
      }
   };

   const handleDeleteAttr = async () => {
      if (curAttr.current == undefined) return;
      try {
         setIsFetching(true);

         await publicRequest.delete(`${CAT_ATTR_URL}/${curAttr.current.id}`);

         startTransition(() => {
            router.refresh();
         });
      } catch (error) {
         console.log(error);
      } finally {
         setIsFetching(false);
         setIsOpenModal(false);
      }
   };

   const handleOpenModal = (
      target: typeof openModalTarget.current,
      attr?: CategoryAttribute
   ) => {
      openModalTarget.current = target;
      switch (target) {
         case "edit-attr":
         case "delete-attr":
            curAttr.current = attr;
            // curAttrIndex.current = index ?? undefined;
            break;
      }
      setIsOpenModal(true);
   };

   const renderModal = useMemo(() => {
      if (!isOpenModal) return;

      switch (openModalTarget.current) {
         case "add-attr":
            if (!curCategory)
               return <p className="text-[16px]">Current category not found</p>;
            return (
               <AddItem
                  loading={isLoading}
                  title="Add attribute"
                  cbWhenSubmit={(value) => handleAddAttr(value, "Add")}
                  setIsOpenModal={setIsOpenModal}
               />
            );
         case "edit-attr":
            if (curAttr === undefined) return <h1>Index not found</h1>;

            const initValue = curAttr.current?.attribute_name;
            return (
               <AddItem
                  loading={isLoading}
                  title={`Edit attribute '${initValue}'`}
                  cbWhenSubmit={(value) => handleAddAttr(value, "Edit")}
                  setIsOpenModal={setIsOpenModal}
                  initValue={initValue}
               />
            );

         case "delete-attr":
            if (curAttr === undefined) return <h1>Index not found</h1>;

            return (
               <ConfirmModal
                  callback={handleDeleteAttr}
                  loading={isLoading}
                  setOpenModal={setIsOpenModal}
                  label={`Delete attribute '${curAttr.current?.attribute_name}'`}
               />
            );

         default:
            return <h1 className="text-3xl">Not thing to show</h1>;
      }
   }, [isOpenModal, isFetching, isPending]);

   useEffect(() => {
      if (curCategoryIndex === undefined) return;
      setCurCategory(categories[curCategoryIndex]);
   }, [categories, curCategoryIndex]);

   const classes = {
      label: "font-[500] text-[#333]",
      attrItem:
         "inline-flex items-center bg-[#f1f1f1] px-[18px] py-[8px] border-[2px] border-[#ccc] rounded-[8px]",
      cta: "ml-[10px] pl-[10px] border-[#ccc] border-l-[1px] flex items-center space-x-[4px] text-[#333]",
   };

   return (
      <div className="mt-[10px]">
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
               disabled={!curCategory}
               variant={"push"}
               onClick={() => handleOpenModal("add-attr")}
            >
               Add attribute
            </Button>
         </div>

         {curCategory?.attributes && (
            <div
               className={`mt-[14px] flex gap-[10px] ${false ? "disable" : ""}`}
            >
               {curCategory.attributes.map((attr, index) => (
                  <div key={index}>
                     <div className={classes.attrItem}>
                        <span className="text-[14px]">
                           {attr.attribute_name}
                        </span>

                        <div className={classes.cta}>
                           <button
                              className="hover:text-[#cd1818]"
                              onClick={() =>
                                 handleOpenModal("delete-attr", attr)
                              }
                           >
                              <TrashIcon className="w-[22px]" />
                           </button>
                           <button
                              className="hover:text-[#cd1818]"
                              onClick={() => handleOpenModal("edit-attr", attr)}
                           >
                              <PencilSquareIcon className="w-[22px]" />
                           </button>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         )}

         {isOpenModal && (
            <Modal setShowModal={setIsOpenModal}>{renderModal}</Modal>
         )}
      </div>
   );
}

export default CategoryAttributeGroup;
