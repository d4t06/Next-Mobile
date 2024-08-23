"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import MyInput, { inputClasses } from "./ui/MyInput";
import { generateId, initProductObject } from "@/utils/appHelper";
import Button from "@/components/ui/Button";
import Box from "@/components/ui/Box";
import Modal from "@/components/modal";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import Gallery from "./Gallery";
import Image from "next/image";
import OverlayCTA from "./ui/OverlayCta";
import useProductInfoAction from "@/hooks/useProductInfoAction";
import ModalHeader from "./modal/ModalHeader";

type AddProduct = {
  type: "Add";
  categories: Category[];
  closeModal: () => void;
};

type EditProduct = {
  type: "Edit";
  product: Product;
  categories: Category[];
  closeModal: () => void;
};

type Props = AddProduct | EditProduct;

export default function AddProductForm({ closeModal, categories, ...props }: Props) {
  const [productData, setProductData] = useState<ProductSchema>(() => {
    switch (props.type) {
      case "Edit":
        const { product } = props;

        return initProductObject({
          image_url: product.image_url,
          product_name: product.product_name,
          product_name_ascii: product.product_name_ascii,
          brand_id: product.brand_id,
          category_id: product.category_id,
        });
      default:
        return initProductObject({});
    }
  });

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isChange, setIsChange] = useState(false);

  const nameRef = useRef(null);

  // use hooks
  const { actions, isFetching } = useProductInfoAction();

  const currentCategory = useMemo(
    () =>
      productData ? categories.find((c) => c.id === productData.category_id) : undefined,
    [categories, productData?.category_id]
  );

  const brandByCategory = useMemo(
    () => (currentCategory ? currentCategory.brands : []),
    [productData?.category_id]
  );

  const ableToSubmit = useMemo(
    () =>
      productData &&
      isChange &&
      !!productData.product_name &&
      productData.category_id !== undefined &&
      productData.brand_id !== undefined,
    [productData, isChange]
  );

  const localCloseModal = () => setIsOpenModal(false);

  const title = useMemo(() => {
    switch (props.type) {
      case "Add":
        return "Add new product";
      case "Edit":
        return `Edit product ${props.product.product_name}`;
    }
  }, []);

  const handleInput = (field: keyof ProductSchema, value: any) => {
    if (!productData) return;
    setIsChange(true);

    if (field === "product_name") {
      return setProductData({
        ...productData,
        [field]: value,
        product_name_ascii: generateId(value),
      });
    }

    setProductData({ ...productData, [field]: value });
  };

  const handleSubmit = async () => {
    if (!ableToSubmit || !productData) return;

    switch (props.type) {
      case "Add":
        await actions({ variant: "Add", product: productData });
        break;

      case "Edit":
        await actions({
          variant: "Edit",
          product: productData,
          id: props.product.id,
        });

        break;
    }

    closeModal();
  };

  return (
    <>
      <div className="w-[800px] max-h-[80vh] max-w-[80vw] flex flex-col">
        <ModalHeader closeModal={closeModal} title={title} />
        <div className="flex-grow overflow-x-hidden">
          <div className="sm:flex sm:flex-row mx-[-8px] mt-[14px] pb-[30px]">
            <div className="w-full sm:w-1/3 px-[8px]">
              {!productData.image_url ? (
                <Box
                  className="pt-[50%] sm:pt-[100%]"
                  onClick={() => setIsOpenModal(true)}
                />
              ) : (
                <Box>
                  <Image src={productData.image_url} width={500} height={500} alt="asd" />

                  <OverlayCTA
                    data={[
                      {
                        cb: () => setIsOpenModal(true),
                        icon: <ArrowPathIcon className="w-[22px]" />,
                        className: "bg-[#f1f1f1] p-[5px] rounded-[99px]",
                      },
                    ]}
                  />
                </Box>
              )}
            </div>

            <div className="mt-[30px] sm:mt-0 w-full">
              <div className="space-y-[14px] px-[8px]">
                <div className="space-y-[4px]">
                  <label htmlFor="">Name</label>
                  <MyInput
                    ref={nameRef}
                    name="name"
                    type="text"
                    value={productData.product_name}
                    cb={(value) => handleInput("product_name", value)}
                  />
                </div>

                <div
                  className={`space-y-[4px] ${props.type === "Edit" ? "disabled" : ""}`}
                >
                  <label htmlFor="">Category</label>
                  <select
                    name="category"
                    value={productData.category_id}
                    onChange={(e) =>
                      e.target.value ? handleInput("category_id", +e.target.value) : {}
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

                <div className="space-y-[4px]">
                  <label htmlFor="">Brand</label>
                  <select
                    value={productData.brand_id}
                    onChange={(e) =>
                      e.target.value ? handleInput("brand_id", +e.target.value) : {}
                    }
                    className={inputClasses.input}
                  >
                    <option value={undefined}>- - -</option>
                    {!!brandByCategory.length &&
                      brandByCategory.map((brand, index) => (
                        <option key={index} value={brand.id}>
                          {brand.brand_name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-right mt-[10px]">
          <Button
            loading={isFetching}
            disabled={!ableToSubmit}
            onClick={handleSubmit}
            border={"clear"}
          >
            Save
          </Button>
        </div>
      </div>

      {isOpenModal && (
        <Modal className="z-[199]" closeModal={localCloseModal}>
          <Gallery
            closeModal={localCloseModal}
            setImageUrl={(images) => handleInput("image_url", images[0].image_url)}
          />
        </Modal>
      )}
    </>
  );
}
