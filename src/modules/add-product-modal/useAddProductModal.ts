import { runRevalidateTag } from "@/app/actions";
import useFetch from "@/hooks/useFetch";
import { useToastContext } from "@/stores/ToastContext";
import { useState } from "react";

const PRODUCT_URL = "/products";

export default function useAddProductModal() {
  const [isFetching, setIsFetching] = useState(false);

  //    hooks
  const privateRequest = useFetch();
  const { setErrorToast, setSuccessToast } = useToastContext();

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

          break;
        }
        case "Edit": {
          const { product, id } = props;
          await privateRequest.put(`${PRODUCT_URL}/${id}`, product);

          await runRevalidateTag("product-" + id);
          await runRevalidateTag(`products-${props.product.category_id}`);

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
