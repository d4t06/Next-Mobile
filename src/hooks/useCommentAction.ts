"use client";

import { useState } from "react";
import usePrivateRequest from "./usePrivateRequest";
import { publicRequest } from "@/utils/request";
import { runRevalidateTag } from "@/app/actions";

const COMMENT_URL = "/comments";

export default function useCommentAction() {
   const [isFetching, setIsFetching] = useState(false);

   const privateRequest = usePrivateRequest();

   type Add = {
      variant: "add";
      comment: ProductCommentSchema;
   };

   type Approve = {
      variant: "approve";
      id: number;
      index: number;
   };

   type Delete = {
      variant: "delete";
      id: number;
      index: number;
   };

   const action = async (props: Add | Approve | Delete) => {
      try {
         setIsFetching(true);

         switch (props.variant) {
            case "add": {
               await publicRequest.post(COMMENT_URL, props.comment);

               runRevalidateTag(`comments-${props.comment.product_id}`);

               break;
            }
            case "approve": {
               const { id, index } = props;
               await privateRequest.put(`${COMMENT_URL}/${id}`);

               // approveRating(index);

               break;
            }

            case "delete": {
               const { id, index } = props;
               await privateRequest.delete(`${COMMENT_URL}/${id}`);

               // deleteRating(index);

               break;
            }
         }
      } catch (error) {
         console.log({ message: error });
      } finally {
         setIsFetching(false);
      }
   };

   return { isFetching, action };
}
