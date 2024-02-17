import {
   Dispatch,
   Ref,
   SetStateAction,
   forwardRef,
   useEffect,
   useImperativeHandle,
   useRef,
   useState,
} from "react";
import { inputClasses } from "./ui/MyInput";
import { publicRequest } from "@/utils/request";

export type AttributeRef = {
   submit: () => Promise<ProductAttributeSchema | undefined>;
};

type AddAttribute = {
   type: "Add";
   categoryAttribute: CategoryAttribute;
   product: ProductSchema;
};

type EditAttribute = {
   type: "Edit";
   categoryAttribute: CategoryAttribute;
   product: Product;
   setIsChange: Dispatch<SetStateAction<boolean>>;
};

type Props = AddAttribute | EditAttribute;

const PRODUCT_ATTRIBUTE_URL = "/products/attributes";

const findInitValue = (
   attributes_data: ProductAttribute[],
   catAttr: CategoryAttribute
) => {
   const target = attributes_data.find((item) => {
      return item.category_attribute_id === catAttr.id;
   });

   return target;
};

function AttributeGroup({ ...allProps }: Props, ref: Ref<AttributeRef>) {
   const [value, setValue] = useState("");
   const stock = useRef<ProductAttribute>();

   const submit = async () => {
      if (allProps.categoryAttribute.id === undefined)
         throw new Error("category attribute id is undefined");

      if (stock.current === undefined && !!value) {
         const data: ProductAttributeSchema = {
            category_attribute_id: allProps.categoryAttribute.id,
            product_id: 0,
            value: value,
         };

         return data;
      }

      // update must have value
      if (stock.current && !!value && stock.current.value !== value) {
         await publicRequest.put(
            `${PRODUCT_ATTRIBUTE_URL}/${stock.current.id}`,
            { value }
         );
      } else {
         if (stock.current === null)
            throw new Error("stock.current id is undefined");
      }
   };

   const handleOnChange = (value: string) => {
      setValue(value);

      if (allProps.type === "Edit") allProps.setIsChange(true);
   };

   useImperativeHandle(ref, () => ({ submit }));

   useEffect(() => {
      if (allProps.type === "Edit") {
         const target = findInitValue(
            allProps.product.attributes,
            allProps.categoryAttribute
         );
         if (target) {
            setValue(target.value);
            stock.current = target;
         }
      }
   }, [allProps.product, allProps.categoryAttribute]);

   return (
      <div className="flex items-center">
         <div className="col w-1/3">
            <h5 className={`text-[16px] text-center font-[500]`}>
               {allProps.categoryAttribute.attribute_name}
            </h5>
         </div>

         <div className="col flex-grow">
            <textarea
               value={value}
               onChange={(e) => handleOnChange(e.target.value)}
               className={`${inputClasses.input} min-h-[50px] h-[50px] no-scrollbar`}
               id=""
               cols={10}
            />
         </div>
      </div>
   );
}

export default forwardRef(AttributeGroup);
