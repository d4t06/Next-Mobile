"use client";

import Button from "@/components/ui/Button";
import Frame from "@/components/ui/Frame";
import { useCompare } from "@/stores/CompareContext";
import { ArrowsRightLeftIcon, ChevronDownIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import CompareItem from "./CompareItem";
import { useRouter } from "next/navigation";

export default function CompareList() {
   const [isOpen, setIsOpen] = useState(false);

   //    hooks
   const { products, selectIdList } = useCompare();
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
      container: "flex items-center",
      productList: "flex-grow flex space-x-[6px] mr-[10px]",
      hide: "opacity-0 translate-y-[30px] pointer-events-none",
      show: "translate-y-[0] opacity-[1]",
   };

   return (
      <>
         <div className={`${classes.wrapper} ${isOpen ? classes.show : classes.hide} `}>
            <Frame className="pb-0">
               <div className={classes.container}>
                  <div className="flex items-center w-full">
                     <div className={classes.productList}>
                        {products.map((p) => (
                           <CompareItem key={p.id} product={p} />
                        ))}
                     </div>

                     <Button
                        onClick={handleCompare}
                        disabled={selectIdList.length < 2}
                        size={"clear"}
                        className="p-[4px] sm:py-[4px] sm:px-[12px]"
                     >
                        <ArrowsRightLeftIcon className="w-[20px]" />
                        <span className="hidden sm:block ml-[6px]">Compare</span>
                     </Button>
                  </div>
               </div>
               <button
                  onClick={() => setIsOpen(false)}
                  className="flex w-full justify-center py-[6px]"
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
