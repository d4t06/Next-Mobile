type Props = {
   products: Product[];
   category: Category;
};

export default function SpecSection({ category, products }: Props) {
   const attributeOrderArray = category.attribute_order.split("_") || [];

   const classes = {
      table: "w-full table-fixed mt-[14px] [&_td]:text-[12px] [&_td]:px-[4px] sm:[&_td]:px-[6px] [&_td]:py-[8px] sm:[&_td]:py-[12px]  sm:[&_td]:text-[14px] ",
   };

   return (
      <table className={classes.table}>
         <tbody>
            {attributeOrderArray.map((id, index) => {
               const categoryAttribute = category.attributes.find(
                  (catAtt) => catAtt.id === +id
               );
               if (categoryAttribute === undefined) return;

               return (
                  <tr className="group" key={index}>
                     <td className={`w-1/5 sm:w-1/6 font-[500] group-even:bg-[#f3f4f5]  rounded-[6px_0_0_6px]`}>
                        {categoryAttribute.attribute_name}
                     </td>
                     {products.map((p, index) => {
                        const foundedAttr = p.attributes.find(
                           (attr) => attr.category_attribute_id == categoryAttribute.id
                        );

                        return (
                           <td
                              key={index}
                              className={`leading-[2] whitespace-break-spaces font-[500] group-even:bg-[#f3f4f5] rounded-[0_6px_6px_0]`}
                           >
                              {foundedAttr?.value || "..."}
                           </td>
                        );
                     })}
                  </tr>
               );
            })}
         </tbody>
      </table>
   );
}
