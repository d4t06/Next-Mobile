import { Metadata } from "next";
import Image from "next/image";
import Frame from "@/components/ui/Frame";
import Box from "@/components/ui/Box";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Skeleton from "@/components/Skeleton";

const getProductDetail = async (product_ascii: string) => {
  if (!product_ascii) throw new Error("missing id fetch data");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/products/${product_ascii}`, { cache: "no-cache" });
  if (!res.ok) return undefined;
  return (await res.json()) as Product;
};

type Params = {
  params: {
    product_id: string;
  };
};

export async function generateMetadata({ params: { product_id } }: Params): Promise<Metadata> {
  const productDetail = await getProductDetail(product_id);

  if (!productDetail)
    return {
      title: "Some thing went wrong",
    };

  return {
    title: productDetail.product_name,
  };
}

export default async function ProductDetailPage({ params: { product_id } }: Params) {
  const productDetail = await getProductDetail(product_id);

  console.log("check product detail", productDetail);

  if (!productDetail) return <p>Some thing went wrong</p>;

  return (
    <div className="mt-[20px] space-y-[20px] sm:space-y-[10px]">
      <Link className="flex  items-center space-x-[6px] font-[500] text-[16px] text-[#333]" href={`/${productDetail.category.category_ascii}`}>
        <ChevronLeftIcon className="w-[18px]" />
        All products
      </Link>
      <h1 className="text-[22px] font-[500] text-[#333] leading-[1]">{productDetail.product_name}</h1>
      <div className="flex flex-wrap space-y-[20px] sm:space-y-0 mx-[-8px]">
        <div className="w-full sm:w-1/4 px-[8px]">
          <Image src={productDetail.image_url} className="max-h-[40vh] w-auto mx-auto" width={500} height={500} alt="asd" />
        </div>
        <div className="flex-grow px-[8px]">
          <Frame>
            <table className="w-full">
              <tbody>
                {productDetail.category.attributes.map((catAttr, index) => {
                  const founded = productDetail.attributes.find((attr) => attr.category_attribute_id == catAttr.id);

                  return (
                    <tr className="even:bg-[#f1f1f1] rounded-[6px]" key={index}>
                      <td className="w-[40%] px-[4px] py-[2px]">{catAttr.attribute_name}</td>
                      <td className="px-[4px] py-[2px]">{founded?.value || "..."}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Frame>
        </div>
      </div>
    </div>
  );
}
