import Image from "next/image";
import Frame from "./ui/Frame";

export default function ProductDetail({ data }: { data: Product }) {
   return (
      <div className="mt-[20px]">
         <h1 className="text-[22px] text-[#333] mb-[12px]">{data.product_name}</h1>
         <div className="flex flex-wrap space-y-[20px] sm:space-x-[20px] sm:space-y-0">
            <div className="w-full sm:w-1/4">
               <Image src={data.image_url} className="max-h-[40vh] w-auto mx-auto" width={500} height={500} alt="" />
            </div>
            <div className="flex-grow">
               <Frame>
                  <table className="w-full">
                     <tbody>
                        {data.category.attributes.map((catAttr, index) => {
                           const founded = data.attributes.find((attr) => attr.category_attribute_id == catAttr.id);

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
