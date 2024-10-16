"use client";

import { ComputerDesktopIcon, TagIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { Bars3Icon } from "@heroicons/react/16/solid";
import Modal from "@/components/modal";
import Avatar from "./Avatar";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

type Props = {
  categories: Category[];
};

export default function MobileSidebar({ categories }: Props) {
  const [open, setOpen] = useState(false);

  // hooks
  const { data: session } = useSession();
  const router = useRouter();

  const closeModal = () => setOpen(false);

  const handleNavigate = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const classes = {
    toggleSidebar: "menu-btn !absolute left-0 block sm:hidden top-1/2",
    container: `fixed z-[200] top-0 left-0 bottom-0 w-[260px] max-w-[60vw] bg-white hidden max-[768px]:block transition-[transform, opacity] duration-[.3s] `,
    open: "translate-x-0 opacity-[1]",
    hide: "translate-x-[-100%] opacity-[0.5] pointer-events-none",
    closeBtn: "absolute right-[10px] top-[10px]",
  };

  return (
    <>
      <div className={`${classes.container} ${open ? classes.open : classes.hide}`}>
        <div className="px-[10px] border-b bg-[#f1f1f1] border-[rgba(0,0,0,.15)] h-[56px] flex items-center">
          <Avatar />
        </div>
        <div className="px-[10px]">
          <div className="mt-[10px]">
            {categories.map((c, index) => (
              <button
                key={index}
                onClick={() => handleNavigate(`/${c.id}`)}
                className="flex w-full py-2 items-center space-x-[4px] text-[#333]"
              >
                <TagIcon className="w-[24px]" />
                <span className=" font-[500]">{c.category_name}</span>
              </button>
            ))}
          </div>

          {session && session.user.role === "ADMIN" && (
            <div className="mt-[14px] pt-[14px] border-t">
              <Link href={"/dashboard"} className="flex space-x-[4px]">
                <ComputerDesktopIcon className="w-[24px]" />
                <span className=" font-[500]">Dashboard</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className={`${classes.toggleSidebar} `}>
        <Button
          colors={"second"}
          size={"clear"}
          className="p-[4px]"
          onClick={() => setOpen(true)}
        >
          <Bars3Icon className="w-[22px]" />
        </Button>
      </div>

      {open && <Modal className="z-[199]" closeModal={closeModal} />}
    </>
  );
}
