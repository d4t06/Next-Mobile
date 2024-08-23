"use client";

import { useState } from "react";
import usePrivateRequest from "./usePrivateRequest";
import { publicRequest } from "@/utils/request";
import { runRevalidateTag } from "@/app/actions";
import { useToast } from "@/stores/ToastContext";

const COMMENT_URL = "/comments";

export default function useCommentAction() {
  const [isFetching, setIsFetching] = useState(false);

  const privateRequest = usePrivateRequest();
  const { setErrorToast, setSuccessToast } = useToast();

  type Add = {
    variant: "add";
    comment: ProductCommentSchema;
  };

  type Approve = {
    variant: "approve";
    id_list: number[];
    product_id_list: number[];
  };

  type Delete = {
    variant: "delete";
    id: number;
  };

  const action = async (props: Add | Approve | Delete) => {
    try {
      setIsFetching(true);

      switch (props.variant) {
        case "add": {
          const res = await privateRequest.post(COMMENT_URL, props.comment);
          await runRevalidateTag(`comments`);

          return res;
        }
        case "approve": {
          const { id_list, product_id_list } = props;
          await privateRequest.put(`${COMMENT_URL}`, { id_list });

          for await (const id of product_id_list) {
            await runRevalidateTag(`comments-${id}`);
          }

          await runRevalidateTag("comments");

          setSuccessToast("Approve comment successful");

          break;
        }

        case "delete": {
          const { id } = props;
          await privateRequest.delete(`${COMMENT_URL}/${id}`);
          await runRevalidateTag("comments");

          setSuccessToast("Delete comment successful");

          break;
        }
      }
    } catch (error) {
      console.log({ message: error });
      setErrorToast();

      return error;
    } finally {
      setIsFetching(false);
    }
  };

  return { isFetching, action };
}
