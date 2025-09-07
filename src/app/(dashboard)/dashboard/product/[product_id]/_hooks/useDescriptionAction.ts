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
    product,
  }: {
    product: Product;
    desc: Partial<DescriptionSchema>;
  }) => {
    try {
      if (!desc.content) return;

      setIsFetching(true);
      if (process.env.NODE_ENV === "development") await sleep(300);

      await privateRequest.put(`${URL}/${product.id}`, desc);
      setSuccessToast("Update description successful");

      runRevalidateTag("product-" + product.id);

      const oldImages: string[] = [];
      const regex = /<img.*?src="(.*?)"/g;

      let result;
      while ((result = regex.exec(product.description.content))) {
        oldImages.push(result[1]);
      }

      if (oldImages.length) {
        const newImages: string[] = [];

        let result;
        while ((result = regex.exec(desc.content))) {
          newImages.push(result[1]);
        }

        const noUseImages = oldImages.filter((src) => !newImages.includes(src));

        if (noUseImages?.length) {
          await privateRequest.delete(`/images`, {
            params: { images: noUseImages },
          });
        }
      }
    } catch (error) {
      console.log({ message: error });
      setErrorToast("Update description fail");
    } finally {
      setIsFetching(false);
    }
  };

  return { update, isFetching };
}
