"use-client";

import { runRevalidateTag } from "@/app/actions";
import usePrivateRequest from "@/hooks/usePrivateRequest";
import { useToast } from "@/stores/ToastContext";
import { sleep } from "@/utils/appHelper";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CATEGORY_URL = "/categories";

export default function useCategoryAction() {
   const { setSuccessToast, setErrorToast } = useToast();
   const [isFetching, setIsFetching] = useState(false);

   // hooks
   const router = useRouter();
   const privateRequest = usePrivateRequest();

   type Add = {
      type: "Add";
      category: CategorySchema;
   };

   type Edit = {
      type: "Edit";
      category: Partial<CategorySchema>;
      id: number;
   };

   type Delete = {
      type: "Delete";
      id: number;
   };

   type Props = Add | Edit | Delete;

   const actions = async ({ ...props }: Props) => {
      try {
         setIsFetching(true);
         if (process.env.NODE_ENV === "development") await sleep(500);

         switch (props.type) {
            case "Add":
               const { category } = props;
               await privateRequest.post(`${CATEGORY_URL}`, category);

               break;
            case "Edit": {
               const { category, id } = props;
               await privateRequest.put(`${CATEGORY_URL}/${id}`, category);

               break;
            }

            case "Delete": {
               await privateRequest.delete(`${CATEGORY_URL}/${props.id}`);
            }
         }

         await runRevalidateTag(`categories`);

         setSuccessToast(`${props.type} category successful`);
      } catch (error) {
         console.log({ message: error });
         setErrorToast(`${props.type} category fail`);
      } finally {
         setIsFetching(false);
      }
   };

   return { isFetching, actions };
}
