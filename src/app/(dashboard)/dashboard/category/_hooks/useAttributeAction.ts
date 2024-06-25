"use-client";

import { runRevalidateTag } from "@/app/actions";
import usePrivateRequest from "@/hooks/usePrivateRequest";
import { useToast } from "@/stores/ToastContext";
import { sleep } from "@/utils/appHelper";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
   currentCategory: Category | undefined;
};

const ATTRIBUTE_URL = "/category-attributes";
const CATEGORY_URL = "/categories";

export default function useAttributeAction({ currentCategory }: Props) {
   const [isFetching, setIsFetching] = useState(false);

   //   hooks
   const router = useRouter();
   const { setSuccessToast, setErrorToast } = useToast();
   const privateRequest = usePrivateRequest();

   type Add = {
      type: "Add";
      attribute: CategoryAttributeSchema;
   };

   type Edit = {
      type: "Edit";
      attribute: CategoryAttributeSchema;
      id: number;
   };

   type Delete = {
      type: "Delete";
      id: number;
   };

   type Props = Add | Edit | Delete;

   const actions = async ({ ...props }: Props) => {
      if (!currentCategory) return;

      try {
         setIsFetching(true);

         if (process.env.NODE_ENV === "development") sleep(500);
         switch (props.type) {
            case "Add": {
               const { attribute } = props;
               const curAttributeOrder = currentCategory.attribute_order;

               const res = await privateRequest.post(ATTRIBUTE_URL, attribute);

               const newAttribute = res.data;

               // case fist time create category
               const newAttributeOrder = !!curAttributeOrder
                  ? curAttributeOrder + `_${newAttribute.id}`
                  : `${newAttribute.id}`;

               const newCategory: Partial<CategorySchema> = {
                  attribute_order: newAttributeOrder,
               };

               await privateRequest.put(`/categories/${currentCategory.id}`, newCategory);

               break;
            }

            case "Edit": {
               const { attribute, id } = props;
               await privateRequest.put(`${ATTRIBUTE_URL}/${id}`, attribute);

               break;
            }

            case "Delete": {
               const { id } = props;
               const curAttributeOrder = currentCategory.attribute_order;
               let newAttributeOrder = "";

               // if last index
               if (curAttributeOrder.includes(`_${id}`)) {
                  newAttributeOrder = curAttributeOrder.replace(`_${id}`, "");
               } else newAttributeOrder = curAttributeOrder.replace(`${id}_`, "");

               await privateRequest.delete(`${ATTRIBUTE_URL}/${id}`);

               const newCategory: Partial<CategorySchema> = {
                  attribute_order: newAttributeOrder,
               };

               await privateRequest.put(
                  `${ATTRIBUTE_URL}/${currentCategory.id}`,
                  newCategory
               );

               break;
            }
         }
         await runRevalidateTag(`categories`);
         router.refresh();

         setSuccessToast(`${props.type} attribute successful`);
      } catch (error) {
         console.log({ message: error });
         setErrorToast(`${props.type} attribute fail`);
      } finally {
         setIsFetching(false);
      }
   };

   const sortAttribute = async (startIndex: number, endIndex: number) => {
      try {
         if (startIndex === endIndex || !currentCategory) return;
         if (process.env.NODE_ENV === "development") sleep(500);

         setIsFetching(true);
         const newOrderArray = currentCategory.attribute_order.split("_");

         let temp = newOrderArray[startIndex];
         newOrderArray[startIndex] = newOrderArray[endIndex];
         newOrderArray[endIndex] = temp;

         const newOrder = newOrderArray.join("_");
         const newCategory: Partial<CategorySchema> = {
            attribute_order: newOrder,
         };

         await privateRequest.put(`${CATEGORY_URL}/${currentCategory.id}`, newCategory);

         await runRevalidateTag(`categories`);
         router.refresh();
      } catch (error) {
         console.log({ message: error });
         setErrorToast("");
      } finally {
         setIsFetching(false);
      }
   };

   return { isFetching, actions, sortAttribute };
}
