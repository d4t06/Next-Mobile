"use client";
import Button from "@/components/ui/Button";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import {
  BookmarkSquareIcon,
  BuildingStorefrontIcon,
  ChatBubbleLeftRightIcon,
  DevicePhoneMobileIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function DashBoardSidebar() {
  const [expand, setExpand] = useState(false);
  const pathName = usePathname();

  const classes = {
    container:
      "bg-white dark:bg-slate-700 border-r border-[--a-5-cl] transition-[width] max-h-[100vh] relative flex-shrink-0 w-[50px] sm:w-[70px]",
    containerExpand: "!w-[170px] group expand",
    head: "h-[80px] flex items-center justify-center",
    logoText: "text-[22px] font-[500] whitespace-nowrap tracking-[-1px]",
    logoImage: "max-w-[50px] p-[4px]",
    itemActive: "bg-[--a-10-cl]",
    linkList: `[&_svg]:w-6 [&_svg]:flex-shrink-0 [&_a]:font-semibold [&_a]:flex [&_a]:space-x-2 [&_a]:items-center [&_a]:justify-center [&_a]:p-2 hover:[&_a]:bg-[--a-5-cl] group-[.expand]:[&_a]:justify-start [&_span]:whitespace-nowrap [&_span]:hidden group-[.expand]:[&_span]:block`,
  };

  const getActive = (path: string) => {
    return pathName.includes(path) ? classes.itemActive : "";
  };

  return (
    <div className={`${classes.container} ${expand ? classes.containerExpand : ""}`}>
      <div className={classes.head}>
        <Link
          href={"/dashboard"}
          className="bg-[#cd1818] flex-shrink-0 w-8 flex h-8 rounded-md justify-center items-center"
        >
          <span className="text-white text-xl font-bold translate-y-[1px]">:D</span>
        </Link>

        {expand && <span className="font-medium ml-2">Dspec</span>}
      </div>
      <div className={classes.linkList}>
        <Link href="/dashboard/product" className={getActive("/product")}>
          <DevicePhoneMobileIcon />
          <span>Product</span>
        </Link>

        <Link className={getActive("/category")} href="/dashboard/category">
          <BookmarkSquareIcon />
          <span>Category</span>
        </Link>

        <Link className={getActive("/comment")} href="/dashboard/comment">
          <ChatBubbleLeftRightIcon />
          <span>Comment</span>
        </Link>

        <Link className={getActive("/tag")} href="/dashboard/tag">
          <TagIcon />
          <span>Tag</span>
        </Link>

        <Link target="_blank" href="/">
          <BuildingStorefrontIcon />
          <span>My shop</span>
        </Link>
      </div>

      <div className="!absolute bottom-[20px] z-[10] right-0 translate-x-[50%]">
        <Button
          onClick={() => setExpand((prev) => !prev)}
          className="hidden sm:flex p-1"
          size={"clear"}
          border={"clear"}
        >
          {expand ? (
            <ChevronLeftIcon className="w-6 " />
          ) : (
            <ChevronRightIcon className="w-6" />
          )}
        </Button>
      </div>
    </div>
  );
}
