"use client";

import { runRevalidateTag } from "@/app/actions";
import usePrivateRequest from "@/hooks/usePrivateRequest";
import { useToast } from "@/stores/ToastContext";
import { sleep } from "@/utils/appHelper";
import { useState } from "react";

const URL = "/product-descriptions";

export default function useDescriptionAction() {
   const [isFetching, setIsFetching] = useState(false);

   //    hooks
   const { setSuccessToast, setErrorToast } = useToast();
   const privateRequest = usePrivateRequest();

   const update = async (
      desc: Partial<DescriptionSchema>,
      productId: number,
      restChange: () => void
   ) => {
      try {
         setIsFetching(true);
         if (process.env.NODE_ENV === "development") await sleep(500);

         await privateRequest.put(`${URL}/${productId}`, desc);
         setSuccessToast("Update description successful");

         runRevalidateTag("product-" + productId);
         restChange();
      } catch (error) {
         console.log({ message: error });
         setErrorToast("Update description fail");
      } finally {
         setIsFetching(false);
      }
   };

   return { update, isFetching };
}
