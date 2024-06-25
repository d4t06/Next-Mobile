"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type Props = {
   children: ReactNode;
   href: string;
   activeClass?: string;
   className?: string;
};
export default function LinkItem({ children, href, activeClass, className }: Props) {
   const pathName = usePathname();

   const classes = {
      linkItem: "inline-flex items-center space-x-[6px] font-[500] hover:text-yellow-500",
   };

   return (
      <Link
         className={`${classes.linkItem} ${className} ${
            pathName === href ? activeClass || "text-[#9e0d1d]" : ""
         }`}
         href={href}
      >
         {children}
      </Link>
   );
}
