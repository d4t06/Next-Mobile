import { getProduct } from "@/libs/getProduct";
import AddProductForm from "../../../../components/AddProductForm";
import { getAllCategories } from "@/libs/getAllCategory";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

type Props = {
  params: {
    product_ascii: string;
  };
};


export const revalidate = 0


export default async function EditProduct({
  params: { product_ascii },
}: Props) {
  const product = await getProduct(product_ascii);
  const categories = await getAllCategories();

  const classes = {
    backButton: "inline-flex items-center text-[16px] font-[500] hover:text-[#cd1818]",
  };

  return (
    <>
      <Link className={classes.backButton} href={"/dashboard/product-manage"}>
        <ChevronLeftIcon className="w-[18px]" />
        All product
      </Link>
      <div className="mt-[10px]">
        {product ? (
          <AddProductForm
            categories={categories}
            type="Edit"
            product={product}
          />
        ) : (
          <p>Some thing went wrong</p>
        )}
      </div>
    </>
  );
}
