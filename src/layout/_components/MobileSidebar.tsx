"use client";

import {
  ArrowLeftEndOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
  ComputerDesktopIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import Button from "@/components/ui/Button";
import { Bars3Icon, HeartIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { MyImage } from "@/components";
import { setLocalStorage } from "@/utils/appHelper";
import { moonIcon, sunIcon } from "../../../public/icon";
import VertialMenu from "@/components/popup/VerticalMenu";
import { Modal, ModalRef } from "@/components/modal";
import ConfirmModal from "@/components/modal/Confirm";

type Props = {
  categories: Category[];
};

export default function MobileSidebar({ categories }: Props) {
  const [open, setOpen] = useState(false);

  const modalRef = useRef<ModalRef>(null);

  // hooks
  const { data: session } = useSession();
  const router = useRouter();

  const handleNavigate = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const toggleDarkMode = (toggle: boolean) => {
    if (toggle) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    setLocalStorage("dark", toggle);
  };

  const classes = {
    toggleSidebar: "menu-btn !absolute left-0 block sm:hidden top-1/2 -translate-y-1/2",
    container: `fixed z-[200] bg-[#f1f1f1] dark:bg-slate-800 top-0 left-0 bottom-0 w-[260px] max-w-[60vw] bg-white hidden max-[768px]:block transition-[transform, opacity] duration-[.3s] `,
    open: "translate-x-0 opacity-[1]",
    hide: "translate-x-[-100%] opacity-[0.5] pointer-events-none",
  };

  return (
    <>
      <div className={`${classes.container} ${open ? classes.open : classes.hide}`}>
        <div className="px-3 flex bg-[--a-5-cl] h-[80px] items-center">
          <MyImage
            src="/meo_vo_tri.png"
            height={50}
            width={50}
            className="rounded-full"
          />

          <p className="font-semibold ml-2 text-sm">
            {session ? session.user.username : "Sign in"}
          </p>
        </div>
        <div className="px-3">
          <VertialMenu dismiss={false} className="mt-3">
            {categories.map((c, index) => (
              <button
                key={index}
                onClick={() => handleNavigate(`/${c.id}`)}
                className="flex w-full py-2 items-center space-x-1"
              >
                <TagIcon />
                <span className=" font-[500]">{c.category_name}</span>
              </button>
            ))}
          </VertialMenu>

          <div className="h-0.5 my-2 bg-[--a-5-cl]"></div>

          <VertialMenu dismiss={false}>
            <button
              onClick={() => toggleDarkMode(true)}
              className="sun hover:text-red-500"
            >
              {sunIcon}

              <span>Light</span>
            </button>

            <button
              onClick={() => toggleDarkMode(false)}
              className="moon hover:text-red-500"
            >
              {moonIcon}
              <span>Dark</span>
            </button>

            {session && (
              <>
                <button onClick={() => handleNavigate("/like-product")}>
                  <HeartIcon className="text-red-500" />
                  <span>Liked</span>
                </button>

                <button
                  onClick={() => {
                    setOpen(false);
                    modalRef.current?.open();
                  }}
                >
                  <ArrowRightStartOnRectangleIcon />
                  <span>Log out</span>
                </button>
              </>
            )}

            {!session && (
              <Link href={"/signin"}>
                button
                <ArrowLeftEndOnRectangleIcon />
                <span>Sign in</span>
              </Link>
            )}

            {session && session.user.role === "ADMIN" && (
              <Link href={"/dashboard"} className="flex space-x-1">
                <ComputerDesktopIcon />
                <span className=" font-[500]">Dashboard</span>
              </Link>
            )}
          </VertialMenu>
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

      {open && (
        <div
          className="fixed z-[99] bg-black/60 inset-0"
          onClick={() => setOpen(!open)}
        ></div>
      )}

      <Modal ref={modalRef}>
        <ConfirmModal
          label="Logout ?"
          callback={signOut}
          loading={false}
        />
      </Modal>
    </>
  );
}
