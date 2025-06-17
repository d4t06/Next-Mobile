import { runRevalidateTag } from "@/app/actions";
import useFetch from "@/hooks/useFetch";
import { useToast } from "@/stores/ToastContext";
import { useState } from "react";

const PRODUCT_URL = "/products";

export default function useProductInfoAction() {
  const [isFetching, setIsFetching] = useState(false);

  //    hooks
  const privateRequest = useFetch();
  const { setErrorToast, setSuccessToast } = useToast();

  type Add = {
    variant: "Add";
    product: ProductSchema;
  };

  type Edit = {
    variant: "Edit";
    product: Partial<ProductSchema>;
    id: number;
  };

  const actions = async (props: Add | Edit) => {
    try {
      setIsFetching(true);

      switch (props.variant) {
        case "Add": {
          await privateRequest.post(`${PRODUCT_URL}`, props.product);
          await runRevalidateTag(`products-${props.product.category_id}`);
          await runRevalidateTag(`products`);

          break;
        }
        case "Edit": {
          const { product, id } = props;
          await privateRequest.put(`${PRODUCT_URL}/${id}`, product);

          await runRevalidateTag("product-" + id);

          break;
        }
      }

      setSuccessToast(`${props.variant} product successful`);
    } catch (error: any) {
      if (error.response.status === 409) {
        setErrorToast("Product name had taken");
      } else setErrorToast();
    } finally {
      setIsFetching(false);
    }
  };

  return { isFetching, actions };
}
