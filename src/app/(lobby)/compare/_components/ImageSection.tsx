"use client";

import Skeleton from "@/components/Skeleton";
import Frame from "@/components/ui/Frame";
import MyImage from "@/components/ui/MyImage";
import { useEffect, useRef, useState } from "react";

type Props = {
   products: Product[];
};

export default function ImageSection({ products }: Props) {
   const [isSmall, setIsSmall] = useState(false);

   const sectionRef = useRef<HTMLDivElement>(null);
   const spacingRef = useRef<HTMLDivElement>(null);
   const triggerPoint = useRef<number>();

   const handleShow = () => {
      if (!triggerPoint.current) return;

      if (window.scrollY > triggerPoint.current - 100) setIsSmall(true);
      else setIsSmall(false);
   };

   useEffect(() => {
      window.addEventListener("scroll", handleShow);

      return () => window.removeEventListener("scroll", handleShow);
   }, []);

   useEffect(() => {
      const sectionEle = sectionRef.current;
      if (sectionEle) {
         const spacingEle = spacingRef.current;
         if (!spacingEle) return;
         triggerPoint.current = sectionEle.getBoundingClientRect().bottom;

         spacingEle.style.paddingTop = sectionEle.offsetHeight + "px";
      }
   }, []);

   const classes = {
      proName:
         "text-sm sm:text-base text-center mt-auto pt-[14px] font-[500] text-[#333] leading-[1]",
   };

   return (
      <>
         <div
            className={`container px-0 ${isSmall ? "fixed z-[199] top-0" : ""}`}
            ref={sectionRef}
         >
            <Frame>
               <div className={`flex`}>
                  <div className="w-1/5 sm:w-1/6"></div>
                  {products.map((p, index) => (
                     <div key={index} className="flex-1 flex flex-col">
                        <MyImage
                           src={p?.image_url || ""}
                           className={`max-h-[200px] mx-auto my-auto ${
                              isSmall ? "w-[60px]" : "w-auto"
                           }`}
                           width={200}
                           height={200}
                           alt=""
                        />
                        <h1
                           className={`${classes.proName} ${
                              isSmall ? "!text-sm !pt-0" : ""
                           }`}
                        >
                           {p?.product_name}
                        </h1>
                     </div>
                  ))}
               </div>
            </Frame>
         </div>

         <div className={`${isSmall ? "" : "hidden"}`} ref={spacingRef}></div>
      </>
   );
}
