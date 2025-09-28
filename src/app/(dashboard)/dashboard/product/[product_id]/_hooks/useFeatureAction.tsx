import { runRevalidateTag } from "@/app/actions";
import useFetch from "@/hooks/useFetch";
import { useToastContext } from "@/stores/ToastContext";
import { useState } from "react";
import { useCurrentProductContext } from "../CurrentProductContext";

export default function useFeatureAction() {
  const { setErrorToast, setSuccessToast } = useToastContext();
  const { product } = useCurrentProductContext();

  const [isFetching, setIsFetching] = useState(false);

  const $fetch = useFetch();

  type Add = {
    type: "Add";
    value: string;
  };

  type Edit = {
    type: "Edit";
    value: string;
    id: number;
  };

  type Delete = {
    type: "Delete";
    id: number;
  };

  const action = async (props: Add | Edit | Delete) => {
    try {
      if (!product) return;

      setIsFetching(true);
      switch (props.type) {
        case "Add":
          const featureSchema: ProductFeatureSchema = {
            value: props.value,
            product_id: product.id,
          };

          await $fetch.post<Tag>("/products/features", featureSchema);
          break;

        case "Edit":
          await $fetch.put(`/products/features/${props.id}`, { value: props.value });
          break;

        case "Delete":
          await $fetch.delete(`/products/features/${props.id}`);
          break;
      }

      await runRevalidateTag(`products-${product.id}`);
      setSuccessToast(`${props.type} feature successful`);
    } catch (error) {
      console.log(error);
      setErrorToast();
    } finally {
      setIsFetching(false);
    }
  };
  return { isFetching, action };
}
