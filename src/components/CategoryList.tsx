"use client";

import Modal from "@/components/modal";
import AddItem from "@/components/modal/AddItem";
import ConfirmModal from "@/components/modal/Confirm";
import Box from "@/components/ui/Box";
import { generateId } from "@/utils/appHelper";
import { publicRequest } from "@/utils/request";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState, useTransition } from "react";
import OverlayCTA from "./ui/OverlayCta";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

type Props = {
   categories: Category[];
};

type ModalTarget = "add-category" | "edit-category" | "delete-category";

const CAT_URL = "/categories";

export default function CategoryList({ categories }: Props) {
   const [isOpenModal, setIsOpenModal] = useState(false);
   const [apiLoading, setApiLoading] = useState(false);

   const openModalTarget = useRef<ModalTarget | "">("");
   const curCatIndex = useRef<number>();

   // use hooks
   const [isPending, startTransition] = useTransition();
   const router = useRouter();

   const isFetching = apiLoading || isPending;

   const handleOpenModal = (
      target: typeof openModalTarget.current,
      index?: number
   ) => {
      openModalTarget.current = target;
      switch (target) {
         case "edit-category":
         case "delete-category":
            curCatIndex.current = index ?? undefined;
            break;
      }
      setIsOpenModal(true);
   };

   const handleAddCategory = async (value: string, type: "Add" | "Edit") => {
      if (!value.trim()) {
         return;
      }

      try {
         setApiLoading(true);
         const newCategory: CategorySchema = {
            category_name: value,
            category_ascii: generateId(value),
         };

         switch (type) {
            case "Add":
               await publicRequest.post(CAT_URL, newCategory);

               startTransition(() => {
                  router.refresh();
               });
               break;

            case "Edit":
               if (curCatIndex.current === undefined) return;
               const curCategory = categories[curCatIndex.current];
               if (curCategory === undefined) return;

               await publicRequest.put(
                  `${CAT_URL}/${curCategory.id}`,
                  newCategory
               );

               startTransition(() => {
                  router.refresh();
               });

               break;
         }
      } catch (error) {
         console.log(error);
      } finally {
         setApiLoading(false);
         setIsOpenModal(false);
      }
   };

   const handleDeleteCategory = async () => {
      if (curCatIndex.current === undefined) return;
      try {
         setApiLoading(true);
         const curCategory = categories[curCatIndex.current];

         await publicRequest.delete(`${CAT_URL}/${curCategory.id}`);

         startTransition(() => {
            router.refresh();
         });
      } catch (error) {
         console.log(error);
      } finally {
         setIsOpenModal(false);
         setApiLoading(false);
      }
   };

   const renderModal = useMemo(() => {
      if (!isOpenModal) return;
      switch (openModalTarget.current) {
         case "add-category":
            return (
               <AddItem
                  loading={isFetching}
                  title="Add category"
                  cbWhenSubmit={(value) => handleAddCategory(value, "Add")}
                  setIsOpenModal={setIsOpenModal}
               />
            );

         case "edit-category":
            if (curCatIndex.current === undefined) return "Index not found";
            const curCategory = categories[curCatIndex.current];
            return (
               <AddItem
                  loading={isFetching}
                  initValue={curCategory.category_name}
                  title={`Edit category '${curCategory.category_name}'`}
                  cbWhenSubmit={(value) => handleAddCategory(value, "Edit")}
                  setIsOpenModal={setIsOpenModal}
               />
            );
         case "delete-category":
            if (curCatIndex.current === undefined) return "Index not found";

            return (
               <ConfirmModal
                  callback={handleDeleteCategory}
                  loading={isFetching}
                  setOpenModal={setIsOpenModal}
                  label={`Delete category '${
                     categories[curCatIndex.current].category_name
                  }'`}
               />
            );

         default:
            return <h1 className="text-3xl">Not thing to show</h1>;
      }
   }, [isOpenModal, isPending, apiLoading]);

   return (
      <>
         <div className="flex -mx-[8px]">
            {categories.map((c, index) => (
               <div key={index} className="w-1/6 px-[8px]">
                  <Box>
                     {c.category_name}
                     <OverlayCTA
                        data={[
                           {
                              cb: () => handleOpenModal("edit-category", index),
                              icon: <PencilSquareIcon className="w-[22px]" />,
                           },
                           {
                              cb: () =>
                                 handleOpenModal("delete-category", index),
                              icon: <TrashIcon className="w-[22px]" />,
                           },
                        ]}
                     />
                  </Box>
               </div>
            ))}

            <div className="w-1/6 px-[8px]">
               <Box onClick={() => handleOpenModal("add-category")} />
            </div>
         </div>

         {isOpenModal && (
            <Modal setShowModal={setIsOpenModal}>{renderModal}</Modal>
         )}
      </>
   );
}
