"use client";

import Modal from "@/components/modal";
import AddComment from "@/components/modal/AddCommemt";
import Button from "@/components/ui/Button";
import { PencilSquareIcon } from "@heroicons/react/16/solid";
import { useSession } from "next-auth/react";
import { useState } from "react";

type Props = {
   product: Product;
};

export default function WriteCommentButton({ product }: Props) {
   const [isOpenModal, setIsOpenModal] = useState(false);

   const { data: session } = useSession();

   const closeModal = () => setIsOpenModal(false);

   if (!session) return <></>;

   return (
      <>
         <Button
            size={"clear"}
            onClick={() => setIsOpenModal(true)}
            className="space-x-1 p-1 sm:px-2"
         >
            <PencilSquareIcon className="w-6" />
            <span className="hidden sm:inline">Write comment</span>
         </Button>

         {isOpenModal && (
            <Modal className="z-[999]" closeModal={closeModal}>
               <AddComment closeModal={closeModal} product={product} session={session} />
            </Modal>
         )}
      </>
   );
}
