import { getProduct } from "@/libs/getProduct";
import Image from "next/image";

type Props = {
   params: {
      product_ascii: string;
   };
};

export default async function EditProduct({ params: { product_ascii } }: Props) {
   const product = await getProduct(product_ascii);

   return (
      <div className="flex">
         <div className="w-1/3">
            <Image src={product.image_url || ""} alt={product.product_ascii} />
         </div>
         <div className="flex-1">
            info
         </div>
      </div>
   );
}
