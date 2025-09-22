"use client";
import { runRevalidateTag } from "@/app/actions";
import { Title } from "@/components";
import { Modal, ModalRef } from "@/components/modal";
import ConfirmModal from "@/components/modal/Confirm";
import Button from "@/components/ui/Button";
import useFetch from "@/hooks/useFetch";
import { sleep } from "@/utils/appHelper";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useCurrentProductContext } from "../CurrentProductContext";

const URL = "products";

export default function DangerZone() {
  const { product } = useCurrentProductContext();

  const [isFetching, setIsFetching] = useState(false);

  const modalRef = useRef<ModalRef>(null);

  //    hooks
  const privateRequest = useFetch();
  const router = useRouter();

  const handleDeleteProduct = async () => {
    try {
      setIsFetching(true);
      if (process.env.NODE_ENV === "development") await sleep(500);

      await privateRequest.delete(`${URL}/${product.id}`);

      await runRevalidateTag(`products-${product.category_id}`);

      router.push("/dashboard/product");
    } catch (error) {
      console.log({ message: error });
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <>
      <Title title="Danger Zone" className="text-red-500" variant={"h2"} />

      <div className={`p-4 rounded-lg border-red-500`}>
        <Button onClick={() => modalRef.current?.open()}>Delete</Button>
      </div>

      <Modal ref={modalRef}>
        <ConfirmModal loading={isFetching} callback={handleDeleteProduct} />
      </Modal>
    </>
  );
}
