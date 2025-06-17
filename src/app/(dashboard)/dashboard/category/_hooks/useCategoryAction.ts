"use-client";

import { runRevalidateTag } from "@/app/actions";
import { ModalRef } from "@/components/modal/AnimateModal";
import useFetch from "@/hooks/useFetch";
import { useToast } from "@/stores/ToastContext";
import { sleep } from "@/utils/appHelper";
import { useRouter } from "next/navigation";
import { RefObject, useState } from "react";

const CATEGORY_URL = "/categories";

type Props = {
  modalRef: RefObject<ModalRef | null>;
};

export default function useCategoryAction(props?: Props) {
  const { setSuccessToast, setErrorToast } = useToast();
  const [isFetching, setIsFetching] = useState(false);

  // hooks
  const router = useRouter();
  const privateRequest = useFetch();

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

  const actions = async ({ ..._props }: Props) => {
    try {
      setIsFetching(true);
      if (process.env.NODE_ENV === "development") await sleep(500);

      switch (_props.type) {
        case "Add":
          const { category } = _props;
          await privateRequest.post(`${CATEGORY_URL}`, category);

          break;
        case "Edit": {
          const { category, id } = _props;
          await privateRequest.put(`${CATEGORY_URL}/${id}`, category);

          break;
        }

        case "Delete": {
          await privateRequest.delete(`${CATEGORY_URL}/${_props.id}`);
        }
      }

      await runRevalidateTag(`categories`);

      props?.modalRef && props.modalRef.current?.close();

      setSuccessToast(`${_props.type} category successful`);
    } catch (error: any) {
      if (error.response.status === 409) {
        setErrorToast("Category name had taken");
      } else setErrorToast();
    } finally {
      setIsFetching(false);
    }
  };

  return { isFetching, actions };
}
