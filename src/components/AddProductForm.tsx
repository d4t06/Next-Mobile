"use client";

import { useRef, useState, useTransition } from "react";
import MyInput, { inputClasses } from "./ui/MyInput";
import { generateId } from "@/utils/appHelper";
import Frame from "@/components/ui/Frame";
import AttributeGroup, { AttributeRef } from "./AttributeGroup";
import Button from "@/components/ui/Button";
import Box from "@/components/ui/Box";
import { publicRequest } from "@/utils/request";
import Modal from "@/components/modal";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import ConfirmModal from "@/components/modal/Confirm";
import { useRouter } from "next/navigation";

type Props = {
   categories: Category[];
   product?: Product;
   type: "Add" | "Edit";
};

const getInitialProduct = (type: Props["type"], product?: Product) => {
   const initProduct = {
      category_id: 0,
      image_url: "",
      product_ascii: "",
      product_name: "",
   } as ProductSchema;

   switch (type) {
      case "Edit":
         if (product) return product;
      default:
         return initProduct;
   }
};

const getInitCategory = (product?: Product) => {
   if (product) return product.category;
};

const PRODUCT_URL = "/products";

export default function AddProductForm({ categories, product, type }: Props) {
   const [productData, setProductData] = useState<Product | ProductSchema>(() =>
      getInitialProduct(type, product)
   );
   const [curCategory, setCurCategory] = useState<Category | undefined>(() =>
      getInitCategory(product)
   );
   const [isOpenModal, setIsOpenModal] = useState(false);
   const [isChange, setIsChange] = useState(false);
   const [isFetching, setIsFetching] = useState(false);

   const nameRef = useRef(null);
   const attributeRefs = useRef<(AttributeRef | undefined)[]>([]);

   // use hooks
   const router = useRouter();
   const [isPending, startTransition] = useTransition();

   const isLoading = isFetching || isPending;
   const ableToSubmit =
      isChange && productData.category_id && productData.product_name;

   const handleInput = (field: keyof typeof productData, value: any) => {
      // also set product_name_ascii
      if (field === "product_name") {
         return setProductData({
            ...productData,
            [field]: value,
            product_ascii: generateId(value),
         });
      }

      if (field === "category_id") {
         const category = categories.find((c) => c.id === value);
         setCurCategory(category);

         if (!category) return;
      }

      setIsChange(true);
      setProductData({ ...productData, [field]: value });
   };

   const submitAttributes = async (
      type: "Add" | "Edit",
      product_id?: number
   ) => {
      const newAttributes: ProductAttributeSchema[] = [];
      for await (const attributeItem of attributeRefs.current) {
         const newData = await attributeItem?.submit();

         if (newData) {
            switch (type) {
               case "Add":
                  if (product_id === undefined) return;
                  newData["product_id"] = product_id;
               case "Edit":
                  if (product === undefined) return;
                  newData["product_id"] = product.id;
            }
            newAttributes.push(newData);
         }
      }

      await publicRequest.post(`${PRODUCT_URL}/attributes`, newAttributes);
   };

   const handleSubmit = async () => {
      if (
         !ableToSubmit ||
         curCategory === undefined ||
         productData.category_id === undefined ||
         !productData.product_name.trim()
      )
         return;

      try {
         setIsFetching(true);

         const data: ProductSchema = {
            category_id: curCategory?.id,
            image_url: "",
            product_ascii: generateId(productData.product_name),
            product_name: productData.product_name,
         };

         console.log("run here");

         switch (type) {
            case "Add":
               const productRes = await publicRequest.post(PRODUCT_URL, data);
               const newProduct = productRes.data as Product;

               await submitAttributes(type, newProduct.id);

               startTransition(() => {
                  router.push("/dashboard/product-manage");
                  router.refresh();
               });

               break;

            case "Edit":
               if (product === undefined) return;

               await submitAttributes(type);

               if (
                  data.product_name != product.product_name ||
                  data.category_id != product.category_id ||
                  data.image_url != product.image_url
               ) {
                  await publicRequest.put(`${PRODUCT_URL}/${product.id}`, data);
               }
         }
      } catch (error) {
         console.log(error);
      } finally {
         setIsFetching(false);
      }
   };

   const handleDeleteProduct = async () => {
      if (product?.id === undefined) return;

      try {
         setIsFetching(true);

         await publicRequest.delete(`${PRODUCT_URL}/${product.id}`);
      } catch (error) {
         console.log(error);
      } finally {
         setIsFetching(false);

         startTransition(() => {
            router.push("/dashboard/product-manage");
            router.refresh();
         });
      }
   };

   const classes = {
      label: "text-[18px] mb-[4px]",
   };

   const labelMaps: Record<typeof type, string> = {
      Add: "Add new products",
      Edit: `Edit product ${product?.product_name}`,
   };

   return (
      <>
         <div className="flex items-center space-x-[8px]">
            <PencilSquareIcon className="w-[24px]" />
            <h1 className="text-[22px] font-[500]">{labelMaps[type]}</h1>
         </div>
         <div className="flex mx-[-8px] mt-[14px]">
            <div className="w-1/3 px-[8px]">
               <Box onClick={() => setIsOpenModal(true)} />
            </div>

            <div className="flex-1">
               <div className="space-y-[14px] px-[8px]">
                  <div className="flex flex-col">
                     <label className={classes.label} htmlFor="">
                        Tên sản phẩm
                     </label>
                     <MyInput
                        ref={nameRef}
                        name="name"
                        type="text"
                        value={productData.product_name}
                        cb={(value) => handleInput("product_name", value)}
                     />
                  </div>

                  <div className="flex flex-col mt-[14px]">
                     <label className={classes.label} htmlFor="">
                        Danh mục
                     </label>
                     <select
                        name="category"
                        value={productData.category_id}
                        onChange={(e) =>
                           handleInput("category_id", +e.target.value)
                        }
                        className={inputClasses.input}
                     >
                        <option value={undefined}>- - -</option>
                        {!!categories.length &&
                           categories.map((category, index) => (
                              <option key={index} value={category.id}>
                                 {category.category_name}
                              </option>
                           ))}
                     </select>
                  </div>

                  <div className="">
                     <label className={classes.label} htmlFor="">
                        Cấu hình
                     </label>
                     <Frame>
                        <div className="space-y-[10px]">
                           {type === "Add" &&
                              curCategory &&
                              curCategory.attributes.map((attr, index) => (
                                 <AttributeGroup
                                    ref={(ref) =>
                                       (attributeRefs.current[index] = ref!)
                                    }
                                    key={index}
                                    type={"Add"}
                                    categoryAttribute={attr}
                                    product={productData}
                                 />
                              ))}

                           {type === "Edit" &&
                              curCategory &&
                              curCategory.attributes.map((attr, index) => (
                                 <AttributeGroup
                                    ref={(ref) =>
                                       (attributeRefs.current[index] = ref!)
                                    }
                                    key={index}
                                    type={"Edit"}
                                    categoryAttribute={attr}
                                    product={productData as Product}
                                    setIsChange={setIsChange}
                                 />
                              ))}
                        </div>
                     </Frame>
                  </div>
               </div>

               <div className="text-center">
                  <Button
                     onClick={handleSubmit}
                     className="mt-[10px]"
                     variant={"push"}
                     isLoading={isLoading}
                     disabled={!ableToSubmit}
                  >
                     Save
                  </Button>
               </div>

               <div className="mt-[30px] p-[10px] rounded-[8px] border border-[#cd1818]">
                  <Button
                     onClick={() => setIsOpenModal(true)}
                     className=""
                     variant={"push"}
                  >
                     Delete
                  </Button>
               </div>
            </div>
         </div>

         {isOpenModal && (
            <Modal setShowModal={setIsOpenModal}>
               <ConfirmModal
                  callback={handleDeleteProduct}
                  loading={isLoading}
                  setOpenModal={setIsOpenModal}
               />
            </Modal>
         )}
      </>
   );
}
