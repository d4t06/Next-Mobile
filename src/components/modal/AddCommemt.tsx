"use client";

import { Session } from "next-auth";
import ModalHeader from "./ModalHeader";
import { inputClasses } from "../ui/MyInput";
import Button from "../ui/Button";
import useCommentAction from "@/hooks/useCommentAction";
import { useEffect, useRef, useState } from "react";

type Props = {
   closeModal: () => void;
   session: Session;
   product: Product;
};

export default function AddComment({ closeModal, product, session }: Props) {
   const [content, setContent] = useState("");

   const contentRef = useRef<HTMLTextAreaElement>(null);

   const { action, isFetching } = useCommentAction();

   const handleSubmit = async () => {
      const schema: ProductCommentSchema = {
         content,
         product_id: product.id,
         username: session.user.name,
      };

      await action({ variant: "add", comment: schema });

      closeModal();
   };

   useEffect(() => {
      contentRef.current?.focus();
   }, []);

   return (
      <div className="w-[400px] max-w-[80vw] bg-white">
         <ModalHeader title={"Write comment"} closeModal={closeModal} />

         <textarea
            ref={contentRef}
            name=""
            id=""
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={`${inputClasses.input} min-h-[100px]`}
         ></textarea>

         <div className="text-right mt-5">
            <Button loading={isFetching} onClick={handleSubmit}>
               Post
         </Button>
         </div>
      </div>
   );
}
