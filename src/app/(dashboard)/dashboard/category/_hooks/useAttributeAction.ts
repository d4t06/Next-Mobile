import { runRevalidateTag } from "@/app/actions";
import { ModalRef } from "@/components/modal/AnimateModal";
import useFetch from "@/hooks/useFetch";
import { useToast } from "@/stores/ToastContext";
import { useRouter } from "next/navigation";
import { useState, type RefObject } from "react";

const ATTRIBUTE_ENDPOINT = "/category-attributes";

type Props = {
  modalRef: RefObject<ModalRef | null>;
};

export default function useAttributeAction({ modalRef }: Props) {
  const { setErrorToast, setSuccessToast } = useToast();

  const $fetch = useFetch();
  // const router = useRouter();

  const [isFetching, setIsFetching] = useState(false);

  // hooks

  type Add = {
    type: "Add";
    attribute: CategoryAttributeSchema;
    categoryId: number;
  };

  type Edit = {
    type: "Edit";
    attribute: Partial<CategoryAttributeSchema>;
    id: number;
    index: number;
  };

  type Delete = {
    type: "Delete";
    id: number;
    categoryId: number;
    index: number;
  };

  type Props = Add | Edit | Delete;

  const actions = async ({ ...props }: Props) => {
    try {
      setIsFetching(true);
      const idList: number[] = [];

      switch (props.type) {
        case "Add":
        case "Delete":
          const attrItems = document.querySelectorAll(".attribute-item");
          if (attrItems) {
            attrItems.forEach((item) =>
              idList.push(+(item.getAttribute("data-id") as string)),
            );
          }

          break;
      }

      switch (props.type) {
        case "Add":
          const res = await $fetch.post<CategoryAttribute>(
            ATTRIBUTE_ENDPOINT,
            props.attribute,
          );
          idList.push(res.data.id);

          break;
        case "Edit": {
          const { attribute, id } = props;
          await $fetch.put(`${ATTRIBUTE_ENDPOINT}/${id}`, attribute);

          break;
        }

        case "Delete": {
          await $fetch.delete(`${ATTRIBUTE_ENDPOINT}/${props.id}`);

          (() => {
            const index = idList.findIndex((id) => id === props.id);
            if (index !== -1) idList.splice(index, 1);
          })();

          // cause flash render
          // categories.value[currentIndex].attributes.splice(props.index, 1);

          break;
        }
      }

      // update category attribute order
      switch (props.type) {
        case "Add":
        case "Delete":
          const payload: Partial<CategorySchema> = {
            attribute_order: idList.join("_"),
          };

          await $fetch.put(`/categories/${props.categoryId}`, payload);

          break;
      }

      await runRevalidateTag("categories");

      setSuccessToast(`${props.type} ok`);
    } catch (error: any) {
      if (error.response.status === 409) {
        setErrorToast("Attribite name had taken");
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
