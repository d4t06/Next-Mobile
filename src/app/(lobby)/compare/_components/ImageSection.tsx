"use client";

import Frame from "@/components/ui/Frame";
import MyImage from "@/components/ui/MyImage";
import Link from "next/link";
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
      if (triggerPoint.current === undefined) return;

      if (triggerPoint.current < 0) {
         if (window.scrollY === 0) {
            const sectionEle = sectionRef.current;
            if (sectionEle) {
               triggerPoint.current = sectionEle.getBoundingClientRect().bottom;
            }
         }

         return;
      }

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
            className={`${isSmall ? "fixed z-[199] top-0 left-0 right-0" : ""}`}
            ref={sectionRef}
         >
            <div className="container">
               <Frame>
                  <div className={`flex`}>
                     <div className="w-1/5 sm:w-1/6"></div>
                     {products.map((p, index) => (
                        <Link href={`${p.category_id}/${p.id}`} key={index} className="flex-1 flex flex-col">
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
                        </Link>
                     ))}
                  </div>
               </Frame>
            </div>
         </div>

         <div className={`${isSmall ? "" : "hidden"}`} ref={spacingRef}></div>
      </>
   );
}
