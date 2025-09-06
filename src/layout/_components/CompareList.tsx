"use client";

import Button from "@/components/ui/Button";
import Frame from "@/components/ui/Frame";
import { useCompareContext } from "@/stores/CompareContext";
import {
  ArrowsRightLeftIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import { ElementRef, useEffect, useRef, useState } from "react";
import CompareItem from "./CompareItem";
import { useRouter } from "next/navigation";
import useClickOutside from "@/hooks/useClickOutside";

export default function CompareList() {
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<ElementRef<"div">>(null);

  //    hooks
  useClickOutside({
    containerRef,
    cb: () => setIsOpen(false),
    trigger: isOpen,
  });
  const { products, selectIdList, reset, compareRef } = useCompareContext();
  const router = useRouter();

  const handleCompare = () => {
    if (selectIdList.length >= 2) {
      setIsOpen(false);
      router.push(`/compare?q=${selectIdList.join(",")}`);
    }
  };

  const classes = {
    trigger:
      "fixed z-[99] bottom-[30px] transition-[padding,opacity,transform] left-[16px]",
    wrapper:
      "fixed z-[99] bottom-[30px] transition-[padding,opacity,transform] left-[16px] right-[70px]  rounded-[12px]",
    container: "px-[10px] pt-[10px] flex items-center",
    productList:
      "flex flex-grow overflow-x-auto overflow-y-hidden pb-[10px] space-x-[10px] mr-[10px]",
    hide: "opacity-0 translate-y-[30px] pointer-events-none",
    show: "translate-y-[0] opacity-[1]",
  };

  useEffect(() => {
    compareRef.current = { setIsOpen };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className={`${classes.wrapper} ${isOpen ? classes.show : classes.hide} `}
      >
        <Frame className="!p-0">
          <div className={classes.container}>
            <div className="flex items-center w-full">
              <div className={classes.productList}>
                {products.map((p) => (
                  <CompareItem key={p.id} product={p} />
                ))}
              </div>

              <div className="flex flex-col flex-shrink-0">
                <Button
                  onClick={handleCompare}
                  disabled={selectIdList.length < 2}
                  size={"clear"}
                  className="p-[4px] sm:py-[4px] sm:px-[12px]"
                >
                  <ArrowsRightLeftIcon className="w-[20px]" />
                  <span className="hidden sm:block ml-[6px]">Compare</span>
                </Button>

                <Button
                  colors={"second"}
                  onClick={reset}
                  disabled={!products.length}
                  size={"clear"}
                  className="p-[4px] sm:py-[4px] sm:px-[12px] mt-[6px]"
                >
                  <XMarkIcon className="w-[20px]" />
                  <span className="hidden sm:block ml-[6px]">Clear</span>
                </Button>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="flex w-full justify-center py-[6px] mt-[14px] hover:bg-[--a-5-cl]"
          >
            <ChevronDownIcon className="w-[20px]" />
          </button>
        </Frame>
      </div>

      <div className={`${classes.trigger} ${isOpen ? classes.hide : classes.show}`}>
        <Button
          colors={"third"}
          size={"clear"}
          className="p-[6px]"
          onClick={() => setIsOpen(true)}
        >
          <ArrowsRightLeftIcon className="w-[22px]" />
        </Button>
      </div>
    </>
  );
}
