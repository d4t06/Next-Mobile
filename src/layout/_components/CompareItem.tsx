import Button from "@/components/ui/Button";
import MyImage from "@/components/ui/MyImage";
import { useCompareContext } from "@/stores/CompareContext";
import { CheckIcon, XMarkIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { useMemo } from "react";

type Props = {
  product: Product;
};

export default function CompareItem({ product }: Props) {
  const { selectProduct, selectIdList, addProduct } = useCompareContext();

  const isInChoseList = useMemo(() => selectIdList.includes(product.id), [selectIdList]);

  return (
    <div
      key={product.id}
      className="p-1 flex-shrink-0 w-[90px] sm:w-[120px] max-w-[calc(50%-10px)] relative border-[2px] rounded-[8px]"
    >
      <Link
        className="h-full flex flex-col justify-between"
        href={`/product/${product.id}`}
      >
        <MyImage src={product.image_url} className="m-auto" height={70} width={70} />
        <p className="text-[14px] mt-[6px] font-[500] text-center line-clamp-1">
          {product.product_name}
        </p>
      </Link>
      <button
        onClick={() => selectProduct(product)}
        className={`${
          isInChoseList ? "bg-[#cd1818] " : "bg-[#ccc] hover:bg-[#cd1818]"
        } absolute z-10 h-[20px] w-[20px]  rounded-[6px] text-[white] left-[4px] top-[4px]`}
      >
        {isInChoseList && <CheckIcon className="pointer-events-none w-[18px]" />}
      </button>
      <div className="!absolute translate-x-[40%] translate-y-[50%] bottom-1 right-0">
        <Button
          onClick={() => addProduct(product)}
          size={"clear"}
          className="p-[2px] sm:p-[4px]"
        >
          <XMarkIcon className="w-[18px]" />
        </Button>
      </div>
    </div>
  );
}
