import Frame from "@/components/ui/Frame";
import Image from "next/image";
import SpecificationCta from "./SpecificationCta";

type Props = {
   product: Product;
   productCategory: Category;
};

export default async function SpecificationSection({ product, productCategory }: Props) {
   const attributeOrderArray = productCategory
      ? productCategory.attribute_order.split("_")
      : [];

   const classes = {
      proName: "sm:text-xl text-center my-4 font-bold leading-[1]",
      detailLeft: "w-full sm:w-1/3 px-2 flex-shrink-0",
      td: "text-sm px-3 py-1",
   };

   return (
      <>
         <Frame>
            <SpecificationCta product={product} />
            <Image
               src={
                  product.image_url ||
                  "https://d4t06.github.io/HD-Chat/assets/search-empty-ChRLxitn.png"
               }
               className="max-h-[200px] rounded-lg w-auto mx-auto mt-3"
               width={200}
               height={200}
               alt=""
            />


            <h1 className={classes.proName}>{product.product_name}</h1>

            <table className="table font-semibold">
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
                           <td
                              className={`${classes.td} `}
                           >
                              {categoryAttribute.attribute_name}
                           </td>
                           <td
                              className={`${classes.td} `}
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
