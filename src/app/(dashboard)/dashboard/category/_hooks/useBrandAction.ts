"use-client";

import { runRevalidateTag } from "@/app/actions";
import usePrivateRequest from "@/hooks/usePrivateRequest";
import { useToast } from "@/stores/ToastContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

const URL = "/brands";

export default function useBrandAction() {
  const [isFetching, setIsFetching] = useState(false);

  //    hooks
  const router = useRouter();
  const privateRequest = usePrivateRequest();
  const { setErrorToast, setSuccessToast } = useToast();

  type Add = {
    type: "Add";
    brand: BrandSchema;
  };

  type Edit = {
    type: "Edit";
    brand: BrandSchema;
    id: number;
  };

  type Delete = {
    type: "Delete";
    id: number;
  };

  type Props = Add | Edit | Delete;

  const actions = async ({ ...props }: Props) => {
    try {
      setIsFetching(true);

      switch (props.type) {
        case "Add":
          const { brand } = props;

          await privateRequest.post(`${URL}`, brand);

          break;
        case "Edit": {
          const { brand, id } = props;

          await privateRequest.put(`${URL}/${id}`, brand);

          break;
        }

        case "Delete": {
          await privateRequest.delete(`${URL}/${props.id}`);
        }
      }

      await runRevalidateTag(`categories`);
      router.refresh();

      setSuccessToast(`${props.type} brand successful`);
    } catch (error: any) {
      console.log({ message: error });

      if (error.response.status === 409) {
        setErrorToast("Brand name had taken");
      } else setErrorToast();
    } finally {
      setIsFetching(false);
    }
  };

  return { isFetching, actions };
}
