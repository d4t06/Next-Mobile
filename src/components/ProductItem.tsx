import { moneyFormat } from "@/utils/appHelper";
import Image from "next/image";
import Link from "next/link";

export default function ProductItem({ data }: { data: Product }) {
   const classes = {
      container:
         "pt-[10px] px-[5px] bg-white rounded-[8px] border border-transparent hover:border-[#cd1818] shadow-xl h-full ",
   };

   return (
      <div className={classes.container}>
         <Link href={`product/${data.product_name_ascii}`}>
            <Image
               src={data.image_url}
               alt="product image"
               width={500}
               height={500}
               className="w-full"
            />
         </Link>

         <div className="mt-[10px]">
            <h5 className="text-[14px] font-[500]">{data.product_name}</h5>
           
            <h3 className="text-[#cd1818] text-[16px]">
               {moneyFormat(data.combines_data[0].price)}đ
            </h3>
         </div>
      </div>
   );
}
