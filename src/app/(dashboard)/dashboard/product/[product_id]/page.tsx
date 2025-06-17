import ProductInfo from "./_components/ProductInfo";
import { getAllCategories } from "@/libs/getAllCategory";
import Specification from "./_components/Specification";
import Description from "./_components/Description";
import DangerZone from "./_components/DangerZone";
import { getProductDetail } from "@/libs/getProductDetail";
import EditDescriptionBtn from "./_components/EditDescriptionBtn";

type Props = {
  params: {
    product_id: string;
  };
};

export const revalidate = 0;

export default async function EditProduct({ params: { product_id } }: Props) {
  const categories = await getAllCategories();
  const productDetail = await getProductDetail(product_id);

  const classes = {
    group: "p-[20px] rounded-[12px] bg-[#fff] border",
    label: "text-lg sm:text-xl font-[500]",
  };

  if (!categories || !productDetail) return;

  return (
    <>
      <div className="space-y-[30px]">
        <ProductInfo categories={categories} product={productDetail} />

        <h1 className={classes.label}>Specification</h1>
        <Specification categories={categories} product={productDetail} />

        <div className="flex justify-between items-center">
          <h1 className={classes.label}>Description</h1>
          <EditDescriptionBtn product={productDetail} />
        </div>

        <Description product={productDetail} />

        <h1 className={`${classes.label} text-red-500 font-[500]`}>Danger Zone</h1>
        <div className={`${classes.group} border-red-500`}>
          <DangerZone product={productDetail} />
        </div>
      </div>
    </>
  );
}
