"use client";

import ModalHeader from "@/components/modal/ModalHeader";
import MyImage from "@/components/ui/MyImage";
import MyInput, { inputClasses } from "@/components/ui/MyInput";
import useDebounce from "@/hooks/useDebounce";
import useSearchProduct from "@/hooks/useSearchProduct";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

type Props = {
   closeModal: () => void;
   submit: (p: Product) => void;
};

export default function SearchBox({ closeModal, submit }: Props) {
   const [key, setKey] = useState("");

   const debouncedValue = useDebounce(key, 800);
   const { isFetching, searchResult } = useSearchProduct({ query: debouncedValue });

   return (
      <div className="w-[600px] max-w-[80vw]">
         <ModalHeader closeModal={closeModal} title="¯\_(ツ)_/¯" />
         <div className="flex flex-col">
            <div className="relative flex items-center">
               <MyInput cb={(value) => setKey(value)} value={key} />
               {isFetching && (
                  <ArrowPathIcon className="w-[20px] animate-spin absolute right-[10px]" />
               )}
            </div>
            <div className="flex-grow overflow-hidden space-y-[6px] mt-[10px]">
               {key &&
                  searchResult.map((p) => (
                     <button
                        onClick={() => submit(p)}
                        key={p.id}
                        className="flex w-full space-y-[10px] hover:bg-[#f6f6f6] p-[4px] rounded-[4px] cursor-pointer"
                     >
                        <MyImage
                           className="w-[60px] flex-shrink-0"
                           src={
                              p.image_url ||
                              "https://d4t06.github.io/HD-Chat/assets/search-empty-ChRLxitn.png"
                           }
                           width={60}
                           height={60}
                           alt=""
                        />
                        <h5 className="ml-[10px] text-[15px] font-[500]">
                           {p.product_name}
                        </h5>
                     </button>
                  ))}
            </div>
         </div>
      </div>
   );
}
