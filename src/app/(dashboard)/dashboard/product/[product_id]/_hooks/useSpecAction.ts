import { useState } from "react";
import { sleep } from "@/utils/appHelper";
import { useToastContext } from "@/stores/ToastContext";
import useFetch from "@/hooks/useFetch";
import { runRevalidateTag } from "@/app/actions";

const URL = "/product-attributes";

type Props = {
   productId: number;
};

export default function useSpecAction({ productId }: Props) {
   const [isFetching, setIsFetching] = useState(false);

   //hooks
   const { setSuccessToast, setErrorToast } = useToastContext();
   const privateRequest = useFetch();

   type Edit = {
      type: "Edit";
      attribute: ProductAttributeSchema;
      id: number;
   };

   type Add = {
      type: "Add";
      attribute: ProductAttributeSchema;
   };

   const actions = async ({ ...props }: Add | Edit) => {
      try {
         setIsFetching(true);
         if (process.env.NODE_ENV === "development") await sleep(500);

         switch (props.type) {
            case "Edit":
               const { attribute, id } = props;
               await privateRequest.put(`${URL}/${id}`, attribute);

               break;
            case "Add":
               await privateRequest.post(URL, props.attribute);
            // break;
         }

         await runRevalidateTag("product-" + productId);

         setSuccessToast(`${props.type} attribute successful`);
      } catch (error) {
         console.log({ message: error });
         setErrorToast(`Update attribute fail`);
      } finally {
         setIsFetching(false);
      }
   };

   return { isFetching, actions };
}
