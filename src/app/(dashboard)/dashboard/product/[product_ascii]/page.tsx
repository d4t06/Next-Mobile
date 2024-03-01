import EditProductForm from "@/components/EditProductForm";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

type Props = {
  params: {
    product_ascii: string;
  };
};

export default async function EditProduct({
  params: { product_ascii },
}: Props) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/products/${product_ascii}?withCategory`
  );

  if (!res.ok) return <p>Some thing went wrong</p>;
  const productDetail = (await res.json()) as Product;

  const classes = {
    backButton:
      "inline-flex items-center text-[16px] font-[500] hover:text-[#cd1818]",
  };

  return (
    <>
      <Link className={classes.backButton} href={"/dashboard/product-manage"}>
        <ChevronLeftIcon className="w-[18px]" />
        All product
      </Link>
      <div className="mt-[10px]">
        <EditProductForm product={productDetail} />
      </div>
    </>
  );
}
