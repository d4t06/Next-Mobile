"use client";

import Button from "@/components/ui/Button";
import { PencilSquareIcon } from "@heroicons/react/16/solid";
import { useSession } from "next-auth/react";

type Props = {
  product: Product;
};

export default function WriteCommentButton({}: Props) {
  const { data: session } = useSession();

  if (!session) return <></>;

  return (
    <>
      <Button size={"clear"} className="space-x-1 p-1 sm:px-2">
        <PencilSquareIcon className="w-6" />
        <span className="hidden sm:inline">Write comment</span>
      </Button>
    </>
  );
}
