import ProductInfo from "./_components/ProductInfo";
import { getAllCategories } from "@/libs/getAllCategory";
import Specification from "./_components/Specification";
import Description from "./_components/Description";
import DangerZone from "./_components/DangerZone";
import { getProductDetail } from "@/libs/getProductDetail";
import EditDescriptionBtn from "./_components/EditDescriptionBtn";
import { Title } from "@/components";

type Props = {
  params: {
    product_id: string;
  };
};

// export const revalidate = 86400;

export default async function EditProduct({ params: { product_id } }: Props) {
  const [categories, productDetail] = await Promise.all([
    getAllCategories(),
    getProductDetail(product_id),
  ]);

  const classes = {
    group: "p-[20px] rounded-[12px] bg-[#fff] dark:bg-slate-800 border",
    label: "text-lg sm:text-xl font-[500]",
  };

  if (!categories || !productDetail) return;

  return (
    <>
      <div className="space-y-[30px]">
        <ProductInfo categories={categories} product={productDetail} />

        <Title title="Specification" variant={"h2"} />

        <Specification categories={categories} product={productDetail} />

        <div className="flex justify-between items-center">
          <Title title="Description" variant={"h2"} />
          <EditDescriptionBtn product={productDetail} />
        </div>

        <Description product={productDetail} />

        <Title title="Danger Zone" className="text-red-500" variant={"h2"} />

        <div className={`${classes.group} border-red-500`}>
          <DangerZone product={productDetail} />
        </div>
      </div>
    </>
  );
}
