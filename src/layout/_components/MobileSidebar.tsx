"use client";

"use client";

import { TagIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { Bars3Icon } from "@heroicons/react/16/solid";
import Modal from "@/components/modal";

type Props = {
   categories: Category[];
};

export default function MobileSidebar({ categories }: Props) {
   const [open, setOpen] = useState(false);

   const closeModal = () => setOpen(false);

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
            <ul className="py-[14px] px-[10px]">
               {categories.map((c, index) => (
                  <Link
                     //    onClick={closeSidebar}
                     key={index}
                     href={`/${c.category_name_ascii}`}
                     className="flex items-center space-x-[4px] h-[34px] text-[#333]"
                  >
                     <TagIcon className="w-[24px]" />
                     <span className="text-[16px] font-[500]">{c.category_name}</span>
                  </Link>
               ))}
            </ul>
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
