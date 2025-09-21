"use client";
import { runRevalidateTag } from "@/app/actions";
import { Modal, ModalRef } from "@/components/modal";
import ConfirmModal from "@/components/modal/Confirm";
import Button from "@/components/ui/Button";
import useFetch from "@/hooks/useFetch";
import { sleep } from "@/utils/appHelper";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

type Props = {
  product: Product;
};

const URL = "products";

export default function DangerZone({ product }: Props) {
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
      <Button onClick={() => modalRef.current?.open()}>Delete</Button>
      <Modal ref={modalRef}>
        <ConfirmModal
          loading={isFetching}
          callback={handleDeleteProduct}
        />
      </Modal>
    </>
  );
}
