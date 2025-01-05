"use client";

import useDescriptionAction from "../_hooks/useDescriptionAction";
import MyEditor from "./MyEditor";

type Props = {
   product: Product;
};

export default function Description({ product }: Props) {
   const { isFetching, update } = useDescriptionAction();

   const handleUpdateDescription = async (value: string, restChange: () => void) => {
      if (!product) return;

      const newDescription: Partial<DescriptionSchema> = {
         content: value,
      };

      await update(newDescription, product.id, restChange);
   };

   return (
      <>
         <div className="overflow-hidden">
            <MyEditor
               className={`${isFetching ? "disabled" : ""} `}
               callback={(value, restChange) => handleUpdateDescription(value, restChange)}
               content={product?.description ? product.description.content : ""}
            />
         </div>
      </>
   );
}
