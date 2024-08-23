import { runRevalidateTag } from "@/app/actions";
import usePrivateRequest from "@/hooks/usePrivateRequest";
import { useToast } from "@/stores/ToastContext";
import {  useState } from "react";

const PRODUCT_URL = "/products";

export default function useProductInfoAction() {
   const [isFetching, setIsFetching] = useState(false);

   //    hooks
   const privateRequest = usePrivateRequest();
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
      } catch (error) {
         console.log({ message: error });
         setErrorToast();
      } finally {
         setIsFetching(false);
      }
   };

   return { isFetching, actions };
}
