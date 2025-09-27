import ProductInfo from "./_components/ProductInfo";
import { getAllCategories } from "@/libs/getAllCategory";
import Specification from "./_components/Specification";
import Description from "./_components/Description";
import DangerZone from "./_components/DangerZone";
import { getProductDetail } from "@/libs/getProductDetail";
import TagSection from "./_components/TagSection";
import CurrentCategoryProvider from "../../_components/CurrentCategoryContext";
import CurrentProductProdiver from "./CurrentProductContext";
import FeatureSection from "./_components/FeatureSection";

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

  if (!categories || !productDetail) return;

  return (
    <CurrentProductProdiver categories={categories} product={productDetail}>
      <CurrentCategoryProvider>
        <div className="space-y-5">
          <ProductInfo />

          <Specification />

          <FeatureSection />

          <TagSection />

          <Description />

          <DangerZone />
        </div>
      </CurrentCategoryProvider>
    </CurrentProductProdiver>
  );
}
