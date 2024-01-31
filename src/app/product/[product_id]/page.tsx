import ProductDetail from "@/components/ProductDetail";
import { Metadata } from "next";

const getProductDetail = async (id: string) => {
   if (!id) throw new Error("missing id fetch data");

   const res = await fetch(`${process.env.API_ENDPOINT}/products/${id}`);
   if (!res.ok) throw new Error("fail to fetch data");
   return await res.json();
};

type Params = {
   params: {
      product_id: string;
   };
};

export async function generateMetadata({
   params: { product_id },
}: Params): Promise<Metadata> {
   const productDetail: Product = await getProductDetail(product_id);
   return {
      title: productDetail.product_name,
   };
}

export default async function ProductDetailPage({
   params: { product_id },
}: Params) {
   const productDetail = await getProductDetail(product_id);

   return <ProductDetail data={productDetail} />;
}
