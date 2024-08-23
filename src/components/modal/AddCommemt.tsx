"use client";

import { Session } from "next-auth";
import ModalHeader from "./ModalHeader";
import { inputClasses } from "../ui/MyInput";
import Button from "../ui/Button";
import useCommentAction from "@/hooks/useCommentAction";
import { useEffect, useRef, useState } from "react";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";

type Props = {
  closeModal: () => void;
  session: Session;
  product: Product;
};

export default function AddComment({ closeModal, product, session }: Props) {
  const [content, setContent] = useState("");
  const [showThanks, setShowThanks] = useState(false);

  const contentRef = useRef<HTMLTextAreaElement>(null);

  const { action, isFetching } = useCommentAction();

  const handleSubmit = async () => {
    if (!content.trim()) return;

    const schema: ProductCommentSchema = {
      content,
      product_id: product.id,
      username: session.user.name,
    };

    await action({ variant: "add", comment: schema }).then((res: any) => {
      if ([200, 201].includes(res?.response?.status || res?.status)) setShowThanks(true);
      else closeModal();
    });
  };

  useEffect(() => {
    contentRef.current?.focus();
  }, []);

  return (
    <div className="w-[400px] max-w-[80vw] bg-white">
      <ModalHeader title={"Write comment"} closeModal={closeModal} />

      {!showThanks && (
        <>
          <textarea
            ref={contentRef}
            name=""
            id=""
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={`${inputClasses.input} min-h-[100px]`}
          ></textarea>

          <div className="text-right mt-5">
            <Button
              disabled={!content.trim()}
              loading={isFetching}
              onClick={handleSubmit}
            >
              Post
            </Button>
          </div>
        </>
      )}

      {showThanks && (
        <>
          <div className="flex flex-col items-center">
            <CheckBadgeIcon className="w-[100px] text-emerald-500" />
            <p className="font-medium mt-2">We are got your comment</p>
          </div>

          <div className="text-right mt-5">
            <Button onClick={closeModal}>Cút</Button>
          </div>
        </>
      )}
    </div>
  );
}
