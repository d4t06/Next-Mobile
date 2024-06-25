"use client";
import logo from "@/assets/logo.png";
import Button from "@/components/ui/Button";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import {
   BookmarkSquareIcon,
   BuildingStorefrontIcon,
   DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function DashBoardSidebar() {
   const [expand, setExpand] = useState(false);
   const pathName = usePathname();

   const classes = {
      container:
         "bg-[#fff] border-r border-black/15 transition-[width] max-h-[100vh] relative flex-shrink-0 w-[70px]",
      containerExpand: "!w-[180px]",
      head: "h-[60px] flex items-center justify-center",
      logoText: "text-[22px] font-[500] whitespace-nowrap tracking-[-1px]",
      logoImage: "w-[50px]",
      item: "flex space-x-[6px] font-[500] items-center justify-center p-[10px] text-[#333] hover:text-[#cd1818] hover:bg-[#f8f8f8]",
      itemActive: "text-[#cd1818] bg-[#f1f1f1]",
      icon: "w-[24px] flex-shrink-0",
   };

   return (
      <div className={`${classes.container} ${expand ? classes.containerExpand : ""}`}>
         <div className={classes.head}>
            {expand ? (
               <h1 className={classes.logoText}>
                  HD <span className="text-[#cd1818]">Dashboard</span>
               </h1>
            ) : (
               <Image
                  width={50}
                  height={50}
                  alt="logo"
                  className={classes.logoImage}
                  src={logo}
               />
            )}
         </div>
         <div>
            <Link
               href="/dashboard/product"
               className={`${classes.item} ${expand ? "!justify-start" : ""}
               ${pathName === "/dashboard/product" ? classes.itemActive : ""}
               `}
            >
               <DevicePhoneMobileIcon className={classes.icon} />
               {expand && <span>Product</span>}
            </Link>

            <Link
               className={`${classes.item} ${expand ? "!justify-start" : ""}
               ${pathName === "/category" ? classes.itemActive : ""}
               `}
               href="/dashboard/category"
            >
               <BookmarkSquareIcon className={classes.icon} />
               {expand && <span>Asset</span>}
            </Link>

            <Link
               target="blank"
               className={`${classes.item} ${expand ? "!justify-start" : ""}
               ${pathName === "/category" ? classes.itemActive : ""}
               `}
               href="/"
            >
               <BuildingStorefrontIcon className={classes.icon} />
               {expand && <span className="whitespace-nowrap">My shop</span>}
            </Link>
         </div>
         <Button
            onClick={() => setExpand((prev) => !prev)}
            className="p-[4px] !absolute bottom-[20px] right-0 translate-x-[50%] z-[10]"
            size={"clear"}
            border={"clear"}
         >
            {expand ? (
               <ChevronLeftIcon className="w-[24px] " />
            ) : (
               <ChevronRightIcon className="w-[24px]" />
            )}
         </Button>
      </div>
   );
}
