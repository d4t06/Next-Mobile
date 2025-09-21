"use client";

import { useMemo, useRef, useState } from "react";
import { generateId, initProductObject } from "@/utils/appHelper";
import Button from "@/components/ui/Button";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { Modal, ModalContentWrapper, ModalHeader, ModalRef } from "@/components/modal";
import useAddProductModal from "./useAddProductModal";
import { MyImage, MyInput } from "@/components";
import Gallery from "../gallery";
import { useModalContext } from "@/components/modal/Modal";

type AddProduct = {
  type: "Add";
  categories: Category[];
};

type EditProduct = {
  type: "Edit";
  product: Product;
  categories: Category[];
};

type Props = AddProduct | EditProduct;

export default function AddProductModal({ categories, ...props }: Props) {
  const { closeModal } = useModalContext();

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

  const [isChange, setIsChange] = useState(false);

  const nameRef = useRef(null);
  const modalRef = useRef<ModalRef>(null);

  // use hooks
  const { actions, isFetching } = useAddProductModal();

  const currentCategory = useMemo(
    () =>
      productData ? categories.find((c) => c.id === productData.category_id) : undefined,
    [categories, productData?.category_id],
  );

  const brandByCategory = useMemo(
    () => (currentCategory ? currentCategory.brands : []),
    [productData?.category_id],
  );

  const ableToSubmit = useMemo(
    () =>
      productData &&
      isChange &&
      !!productData.product_name &&
      productData.category_id !== undefined &&
      productData.brand_id !== undefined,
    [productData, isChange],
  );

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
      <ModalContentWrapper className="w-[800px] h-[500px]">
        <ModalHeader title={title} />
        <div className="flex-grow overflow-x-hidden">
          <div className="sm:flex sm:flex-row -mx-2">
            <div className="w-full sm:w-2/5 px-2 flex-shrink-0">
              <MyImage
                className="mx-auto rounded-lg"
                src={productData.image_url}
                height={200}
                width={200}
              />

              <Button
                onClick={() => modalRef.current?.open()}
                className="mt-3"
                colors={"second"}
              >
                <PhotoIcon className="w-6" />
                <span>Change image</span>
              </Button>
            </div>

            <div className="mt-[30px] sm:mt-0 w-full">
              <div className="space-y-3 px-2">
                <div className="space-y-1">
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
                    className={"my-input"}
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

                <div className="space-y-1">
                  <label htmlFor="">Brand</label>
                  <select
                    value={productData.brand_id ?? undefined}
                    onChange={(e) =>
                      e.target.value ? handleInput("brand_id", +e.target.value) : {}
                    }
                    className={"my-input"}
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

        <div className="text-right mt-3">
          <Button
            loading={isFetching}
            disabled={!ableToSubmit}
            onClick={handleSubmit}
            border={"clear"}
          >
            Save
          </Button>
        </div>
      </ModalContentWrapper>

      <Modal ref={modalRef}>
        <Gallery
          height={200}
          width={200}
          setImageUrl={(images) => handleInput("image_url", images[0].image_url)}
        />
      </Modal>
    </>
  );
}
