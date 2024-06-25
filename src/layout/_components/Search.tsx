"use client";

import useDebounce from "@/hooks/useDebounce";
import { ArrowPathIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { ElementRef, useEffect, useMemo, useRef, useState } from "react";
import Modal from "@/components/modal";
import { generateId } from "@/utils/appHelper";
import { useRouter } from "next/navigation";
import Link from "next/link";
import NoProduct from "@/components/NoProduct";

type Props = {
   variant: "home" | "dashboard";
   basePath?: string;
};

export default function Search({ variant, basePath }: Props) {
   // states
   const [value, setValue] = useState("");
   const [searchResult, setSearchResult] = useState<Product[]>([]);
   const [focus, setFocus] = useState(false);
   const [isFetching, setIsFetching] = useState(false);

   const inputRef = useRef<ElementRef<"input">>(null);

   // hooks
   const query = useDebounce(value, 700);
   const router = useRouter();

   // computed
   const isShowSearchResult = focus && !!searchResult.length && query;

   // methods
   const closeModal = () => setFocus(false);

   const handleMouseLeave = () => {
      closeModal();
      inputRef.current?.blur();
   };

   const handleNavigate = (href: string) => {
      setValue("");
      closeModal();
      router.push(href);
   };

   const classes = {
      container:
         "border bg-white border-black/15 flex items-center rounded-[10px] px-[10px]",
      input: "placeholder:text-[#808080] py-[5px] px-[10pox] w-full font-[500] outline-none text-[#333]",
      searchItem:
         "flex cursor-pointer border-l-[2px] border-transparent px-[4px] transition-[border_padding] hover:border-[#cd1818] hover:pl-[10px] ",
      searchResultWrapper:
         "bg-white rounded-[6px] border border-black/15 px-[6px] py-[10px]",
      searchResultContainer: "max-h-[60vh] overflow-auto space-y-[10px]",
   };

   const renderSearchResult = useMemo(() => {
      return setSearchResult.length ? (
         searchResult.map((p, index) => {
            const content = (
               <>
                  <Image
                     className="w-[60px] flex-shrink-0"
                     src={
                        p.image_url ||
                        "https://d4t06.github.io/HD-Chat/assets/search-empty-ChRLxitn.png"
                     }
                     width={60}
                     height={60}
                     alt=""
                  />
                  <h5 className="ml-[10px] text-[15px] font-[500]">{p.product_name}</h5>
               </>
            );

            switch (variant) {
               case "home":
                  return (
                     <div
                        onClick={() => handleNavigate(`/${p.category_id}/${p.id}`)}
                        className={classes.searchItem}
                        key={index}
                     >
                        {content}
                     </div>
                  );
               case "dashboard":
                  return (
                     <Link
                        href={`/dashboard/product/${p.id}`}
                        className={classes.searchItem}
                     >
                        {content}
                     </Link>
                  );
            }
         })
      ) : (
         <NoProduct />
      );
   }, [searchResult]);

   useEffect(() => {
      if (!query.trim()) return;
      const controller = new AbortController();

      const fetchApi = async () => {
         try {
            setIsFetching(true);

            const res = await fetch(
               `${process.env.NEXT_PUBLIC_API_ENDPOINT || 'https://nest-mobile.vercel.app/api'}/products/search?q=${generateId(
                  query
               )}`
            );

            if (res.ok) {
               const data = (await res.json()) as Product[];
               setSearchResult(data);
            } else setSearchResult([]);
         } catch (error) {
            console.log(error);
         } finally {
            setIsFetching(false);
         }
      };

      fetchApi();

      return () => {
         console.log("abort");
         controller.abort();
      };
   }, [query]);

   return (
      <>
         <div className="relative z-[100]">
            <div className={classes.container}>
               <input
                  ref={inputRef}
                  value={value}
                  onFocus={() => setFocus(true)}
                  onChange={(e) => setValue(e.target.value)}
                  type="text"
                  className={classes.input}
                  placeholder="iphone 15..."
               />
               <button>
                  <MagnifyingGlassIcon className="w-[20px] text-[#333]" />
               </button>

               {isFetching && query && (
                  <span className="absolute right-[40px] animate-spin">
                     <ArrowPathIcon className="text-[#808080] w-[18px] " />
                  </span>
               )}
            </div>

            <div className="absolute top-[calc(100%+6px)] w-full ">
               {isShowSearchResult && (
                  <div
                     className={classes.searchResultWrapper}
                     onMouseLeave={handleMouseLeave}
                  >
                     <div className={classes.searchResultContainer}>
                        {renderSearchResult}
                     </div>
                  </div>
               )}
            </div>
         </div>
         {focus && <Modal closeModal={closeModal} />}
      </>
   );
}
