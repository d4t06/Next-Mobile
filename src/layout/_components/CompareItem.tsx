import Button from "@/components/ui/Button";
import { useCompare } from "@/stores/CompareContext";
import { CheckIcon, XMarkIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

type Props = {
   product: Product;
};

export default function CompareItem({ product }: Props) {
   const { selectProduct, selectIdList, toggleProduct } = useCompare();

   const isInChoseList = useMemo(() => selectIdList.includes(product.id), [selectIdList]);

   return (
      <div key={product.id} className="w-1/3 sm:w-1/5 border-[2px] rounded-[8px]">
         <div className="p-[6px] h-full relative">
            <Link
               className="flex flex-col justify-between h-full"
               href={`/${product.category_id}/${product.id}`}
            >
               <Image
                  src={product.image_url}
                  className="mx-auto"
                  alt="sa"
                  height={70}
                  width={70}
               />
               <p className="text-[14px] mt-[4px] font-[500] text-center line-clamp-1">
                  {product.product_name}
               </p>
            </Link>
            <button
               onClick={() => selectProduct(product)}
               className={`${
                  isInChoseList ? "bg-[#cd1818] " : "bg-[#ccc] hover:bg-[#cd1818]"
               } absolute z-10 h-[20px] w-[20px]  rounded-[6px] text-[white] left-[4px] top-[4px]`}
            >
               {isInChoseList && <CheckIcon className="w-[18px]" />}
            </button>
            <div className="!absolute translate-x-[40%] translate-y-[50%] bottom-0 right-0">
               <Button
                  onClick={() => toggleProduct(product)}
                  size={"clear"}
                  className="p-[2px] sm:p-[4px]"
               >
                  <XMarkIcon className="w-[18px]" />
               </Button>
            </div>
         </div>
      </div>
   );
}
