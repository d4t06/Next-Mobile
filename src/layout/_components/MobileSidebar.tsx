"use client";

import { TagIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { Bars3Icon } from "@heroicons/react/16/solid";
import Modal from "@/components/modal";
import Avatar from "./Avatar";
import { useRouter } from "next/navigation";

type Props = {
   categories: Category[];
};

export default function MobileSidebar({ categories }: Props) {
   const [open, setOpen] = useState(false);

   const router = useRouter();

   const closeModal = () => setOpen(false);

   const handleNavigate = (href: string) => {
      setOpen(false);
      router.push(href);
   };

   const classes = {
      toggleSidebar:
         "!fixed bottom-[30px] transition-[padding,opacity,transform] left-[16px]",
      container: `fixed z-[200] top-0 bottom-0 w-[260px] max-w-[60vw] bg-[#fff] hidden max-[768px]:block transition-[transform, opacity] duration-[.3s] `,
      open: "translate-x-0 opacity-[1]",
      hide: "translate-x-[-100%] opacity-[.5]",
      closeBtn: "absolute right-[10px] top-[10px]",
   };

   return (
      <>
         <div className={`${classes.container} ${open ? classes.open : classes.hide}`}>
            <div className="py-[14px] px-[10px]">
               <Avatar />
               <div className="mt-[14px]">
                  {categories.map((c, index) => (
                     <button
                        key={index}
                        onClick={() => handleNavigate(`/${c.id}`)}
                        className="flex items-center space-x-[4px] h-[34px] text-[#333]"
                     >
                        <TagIcon className="w-[24px]" />
                        <span className="text-[16px] font-[500]">{c.category_name}</span>
                     </button>
                  ))}
               </div>
            </div>
         </div>

         <div className={`sm:hidden ${classes.toggleSidebar}`}>
            <Button
               onClick={() => setOpen(true)}
               colors={"third"}
               className="p-[6px]"
               size={"clear"}
            >
               <Bars3Icon className="w-[22px] " />
            </Button>
         </div>

         {open && <Modal className="z-[199]" closeModal={closeModal} />}
      </>
   );
}
