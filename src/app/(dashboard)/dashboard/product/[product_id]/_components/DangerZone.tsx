"use client";
import { runRevalidateTag } from "@/app/actions";
import Modal from "@/components/modal";
import ConfirmModal from "@/components/modal/Confirm";
import Button from "@/components/ui/Button";
import useFetch from "@/hooks/useFetch";
import { sleep } from "@/utils/appHelper";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
   product: Product;
};

const URL = "products";

export default function DangerZone({ product }: Props) {
   const [openModal, setOpenModal] = useState(false);
   const [isFetching, setIsFetching] = useState(false);

   const closeModal = () => setOpenModal(false);

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
         <Button onClick={() => setOpenModal(true)}>Delete</Button>
         {openModal && (
            <Modal closeModal={closeModal}>
               <ConfirmModal
                  loading={isFetching}
                  closeModal={closeModal}
                  callback={handleDeleteProduct}
               />
            </Modal>
         )}
      </>
   );
}
