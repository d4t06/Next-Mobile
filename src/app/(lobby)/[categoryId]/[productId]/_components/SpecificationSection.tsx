import Frame from "@/components/ui/Frame";
import Image from "next/image";
import AddToCompareButton from "./AddToCompareButton";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/authOption";
import Button from "@/components/ui/Button";

type Props = {
   product: Product;
   productCategory: Category;
};

export default async function SpecificationSection({ product, productCategory }: Props) {
   const session = await getServerSession(nextAuthOptions);

   const attributeOrderArray = productCategory
      ? productCategory.attribute_order.split("_")
      : [];

   const classes = {
      proName: "sm:text-xl text-center my-[14px] font-[500] text-[#333] leading-[1]",
      detailLeft: "w-full sm:w-1/3 px-[8px] flex-shrink-0",
      td: "group-even:bg-[#f1f1f1] text-[14px] px-[12px] py-[4px]",
   };

   return (
      <>
         <Frame>
            <AddToCompareButton session={session} product={product} />
            <Image
               src={
                  product.image_url ||
                  "https://d4t06.github.io/HD-Chat/assets/search-empty-ChRLxitn.png"
               }
               className="max-h-[200px] w-auto mx-auto"
               width={200}
               height={200}
               alt=""
            />
            <h1 className={classes.proName}>{product.product_name}</h1>

            <table className="w-full">
               <tbody>
                  {attributeOrderArray.map((id, index) => {
                     const categoryAttribute = productCategory.attributes.find(
                        (catAtt) => catAtt.id === +id
                     );
                     if (categoryAttribute === undefined) return;
                     const foundedValue = product.attributes.find(
                        (attr) => attr.category_attribute_id == categoryAttribute.id
                     );

                     return (
                        <tr className="group" key={index}>
                           <td className={`${classes.td} text-[#666] font-[500] `}>
                              {categoryAttribute.attribute_name}
                           </td>
                           <td
                              className={`${classes.td} leading-[2] whitespace-break-spaces`}
                           >
                              {foundedValue?.value || "..."}
                           </td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>
         </Frame>
      </>
   );
}
