"use client";

import { runRevalidateTag } from "@/app/actions";
import useFetch from "@/hooks/useFetch";
import { useToastContext } from "@/stores/ToastContext";
import { sleep } from "@/utils/appHelper";
import { useState } from "react";

const URL = "/product-descriptions";

export default function useDescriptionAction() {
  const [isFetching, setIsFetching] = useState(false);

  //    hooks
  const { setSuccessToast, setErrorToast } = useToastContext();
  const privateRequest = useFetch();

  const update = async ({
    desc,
    productId,
  }: {
    productId: number;
    desc: Partial<DescriptionSchema>;
  }) => {
    try {
      setIsFetching(true);
      if (process.env.NODE_ENV === "development") await sleep(500);

      await privateRequest.put(`${URL}/${productId}`, desc);
      setSuccessToast("Update description successful");

      runRevalidateTag("product-" + productId);
    } catch (error) {
      console.log({ message: error });
      setErrorToast("Update description fail");
    } finally {
      setIsFetching(false);
    }
  };

  return { update, isFetching };
}
