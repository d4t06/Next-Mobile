"use client";

import Link from "next/link";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import Skeleton from "@/components/Skeleton";
import { useRef } from "react";
import { ModalRef, Modal } from "@/components/modal";
import ConfirmModal from "@/components/modal/Confirm";

export default function Avatar() {
  const { data: session, status } = useSession();

  const modalRef = useRef<ModalRef>(null);

  const classes = {
    container: "flex items-center space-x-[6px]",
    imageFrame: "h-[36px] w-[36px]",
    placeHolder: "flex h-full justify-center items-center bg-[#e1e1e1] rounded-full",
  };

  if (status === "loading") return <Skeleton className="h-[24px] w-[140px]" />;

  return (
    <>
      <div className={classes.container}>
        {session ? (
          <>
            <p className="font-bold">hi!, {session.user.username}</p>

            <button
              onClick={() => modalRef.current?.open()}
              className="ml-[10px] hover:text-[#cd1818]"
            >
              <ArrowRightStartOnRectangleIcon className="w-6" />
            </button>
          </>
        ) : (
          <Link className="font-[500] hover:text-[#cd1818] p-1" href={"/api/auth/signin"}>
            Sign In
          </Link>
        )}
      </div>

      <Modal ref={modalRef}>
        <ConfirmModal
          label="Logout ?"
          callback={signOut}
          closeModal={() => modalRef.current?.close()}
          loading={false}
        />
      </Modal>
    </>
  );
}
