import { runRevalidateTag } from "@/app/actions";
import { ModalRef } from "@/components/modal";
import useFetch from "@/hooks/useFetch";
import { useToast } from "@/stores/ToastContext";
import { useState, type RefObject } from "react";

const CATEGORY_URL = "/brands";

type Props = {
  modalRef: RefObject<ModalRef | null>;
};

export default function useBrandAction({ modalRef }: Props) {
  const { setErrorToast, setSuccessToast } = useToast();

  const [isFetching, setIsFetching] = useState(false);

  // hooks
  const $fetch = useFetch();

  type Add = {
    type: "Add";
    brand: BrandSchema;
  };

  type Edit = {
    type: "Edit";
    brand: Partial<BrandSchema>;
    id: number;
    index: number;
  };

  type Delete = {
    type: "Delete";
    id: number;
    index: number;
  };

  type Props = Add | Edit | Delete;

  const actions = async ({ ...props }: Props) => {
    try {
      setIsFetching(true);

      switch (props.type) {
        case "Add":
          await $fetch.post<Brand>(CATEGORY_URL, props.brand);

          break;

        case "Edit": {
          const { brand, id } = props;
          await $fetch.put(`${CATEGORY_URL}/${id}`, brand);

          break;
        }

        case "Delete": {
          await $fetch.delete(`${CATEGORY_URL}/${props.id}`);

          break;
        }
      }

      await runRevalidateTag("categoires");

      setSuccessToast(`${props.type} ok`);
    } catch (error: any) {
      if (error.response.status === 409) {
        setErrorToast("Brand name had taken");
      } else {
        setErrorToast();
      }
    } finally {
      setIsFetching(false);
      modalRef.current?.close();
    }
  };

  return { isFetching, actions };
}
