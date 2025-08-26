"use client";

import { useRef, useState } from "react";
import { runRevalidateTag } from "@/app/actions";
import { useToast } from "@/stores/ToastContext";
import useFetch from "@/hooks/useFetch";
import { ModalRef } from "@/components/modal";
import { request } from "@/utils/request";

const COMMENT_URL = "/comments";

const CHECK_TOXIC_ENDPOINT = process.env.NEXT_PUBLIC_COMMENT_CHECK_ENDPOINT + "/predict";

export default function useCommentAction() {
  const [isFetching, setIsFetching] = useState(false);

  const modalRef = useRef<ModalRef>(null);

  const privateRequest = useFetch();
  const { setErrorToast, setSuccessToast } = useToast();

  type Add = {
    variant: "add";
    comment: ProductCommentSchema;
  };

  type Reply = {
    variant: "reply";
    comment: ProductCommentSchema;
    comment_index: number;
  };

  type Delete = {
    variant: "delete";
    id: number;
  };

  const checkToxic = async (comment: string) => {
    const res = await request.post<{ predicted_label: "toxic" | "non-toxic" }>(
      CHECK_TOXIC_ENDPOINT,
      { comment },
    );

    return res.data.predicted_label === "toxic";
  };

  const action = async (props: Add | Reply | Delete) => {
    try {
      setIsFetching(true);

      switch (props.variant) {
        case "add": {
          // const isToxic = await checkToxic(props.comment.content);

          // if (isToxic) {
          //   modalRef.current?.open();
          //   return;
          // }

          const res = await privateRequest.post(COMMENT_URL, props.comment);

          return res;
        }

        case "reply": {
          const isToxic = await checkToxic(props.comment.content);

          if (isToxic) {
            modalRef.current?.open();
            return;
          }

          const res = await privateRequest.post(COMMENT_URL, props.comment);
          await runRevalidateTag(`comments`);

          return;
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

  return { isFetching, action, modalRef };
}
