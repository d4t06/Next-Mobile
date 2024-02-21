"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  href: string;
  activeClass?: string;
};
export default function LinkItem({ children, href, activeClass }: Props) {
  const pathName = usePathname();

  const classes = {
    linkItem: "font-[500]",
  };

  return (
    <Link
      className={`${classes.linkItem} ${
        pathName === href ? activeClass || "text-[#cd1818]" : ""
      }`}
      href={href}
    >
      {children}
    </Link>
  );
}
