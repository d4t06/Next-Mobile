import { runRevalidateTag } from "@/app/actions";
import { ModalRef } from "@/components/modal";
import useFetch from "@/hooks/useFetch";
import { useToastContext } from "@/stores/ToastContext";
import { useState, type RefObject } from "react";

const ATTRIBUTE_ENDPOINT = "/category-attributes";

type Props = {
  modalRef: RefObject<ModalRef | null>;
};

export default function useAttributeAction({ modalRef }: Props) {
  const { setErrorToast, setSuccessToast } = useToastContext();

  const $fetch = useFetch();
  // const router = useRouter();

  const [isFetching, setIsFetching] = useState(false);

  // hooks

  type Add = {
    type: "Add";
    attribute: CategoryAttributeSchema;
    category: Category;
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
    category: Category;
    index: number;
  };

  type Props = Add | Edit | Delete;

  const actions = async ({ ...props }: Props) => {
    try {
      setIsFetching(true);

      let newOrder: string[] = [];

      switch (props.type) {
        case "Add":
        case "Delete":
          newOrder = props.category.attribute_order
            ? props.category.attribute_order.split("_")
            : [];
          // newOrder = props.category.attributes.map((a) => a.id + "");

          break;
      }

      switch (props.type) {
        case "Add":
          const res = await $fetch.post<CategoryAttribute>(
            ATTRIBUTE_ENDPOINT,
            props.attribute,
          );

          newOrder.push(res.data.id + "");

          break;
        case "Edit": {
          const { attribute, id } = props;
          await $fetch.put(`${ATTRIBUTE_ENDPOINT}/${id}`, attribute);

          break;
        }

        case "Delete": {
          await $fetch.delete(`${ATTRIBUTE_ENDPOINT}/${props.id}`);

          const index = newOrder.findIndex((id) => +id === props.id);
          if (index !== -1) newOrder.splice(index, 1);

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
            attribute_order: newOrder.join("_"),
          };

          await $fetch.put(`/categories/${props.category.id}`, payload);

          break;
      }

      await runRevalidateTag("categories");

      setSuccessToast(`${props.type} attribute ok`);
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
