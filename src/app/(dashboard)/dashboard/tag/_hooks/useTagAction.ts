import { runRevalidateTag } from "@/app/actions";
import useFetch from "@/hooks/useFetch";
import { useToastContext } from "@/stores/ToastContext";
import { useState } from "react";

export default function useTagAction() {
  const { setErrorToast, setSuccessToast } = useToastContext();
  const [isFetching, setIsFetching] = useState(false);

  const $fetch = useFetch();

  type Add = {
    type: "add";
    tag: TagSchema;
  };

  type Edit = {
    type: "edit";
    name: string;
    id: number;
  };

  type Delete = {
    type: "delete";
    id: number;
  };

  const action = async (props: Add | Edit | Delete) => {
    try {
      setIsFetching(true);
      switch (props.type) {
        case "add": {
          const res = await $fetch.post<Tag>("/tags", props.tag);

          await runRevalidateTag("tags");

          setIsFetching(false);

          setSuccessToast("Add tag successful");

          return res.data;
        }

        case "edit": {
          await $fetch.put(`/tags/${props.id}`, { name: props.name });

          await runRevalidateTag("tags");

          setSuccessToast("Edit tag successful");

          break;
        }

        case "delete": {
          await $fetch.delete(`/tags/${props.id}`);

          await runRevalidateTag("tags");

          setSuccessToast("Delete genre successful");

          break;
        }
      }
    } catch (error) {
      console.log(error);
      setErrorToast();
    } finally {
      setIsFetching(false);
    }
  };
  return { isFetching, action };
}
