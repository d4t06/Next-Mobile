"use client";

import { useMemo, useRef } from "react";
import { generateId } from "@/utils/appHelper";
import Button from "@/components/ui/Button";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { Modal, ModalContentWrapper, ModalHeader, ModalRef } from "@/components/modal";
import useAddProductModal from "./useAddProductModal";
import { MyImage, MyInput } from "@/components";
import Gallery from "../gallery";

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

export default function AddProductModal(props: Props) {
  const modalRef = useRef<ModalRef>(null);

  const {
    ableToSubmit,
    updateProductData,
    productData,
    isChange,
    brandByCategory,
    isFetching,
    handleSubmit,
  } = useAddProductModal(props);

  const title = useMemo(() => {
    switch (props.type) {
      case "Add":
        return "Add new product";
      case "Edit":
        return `Edit product ${props.product.product_name}`;
    }
  }, []);

  const handleInput = (field: keyof ProductSchema, value: any) => {
    if (field === "product_name") {
      return updateProductData({
        [field]: value,
        product_name_ascii: generateId(value),
      });
    }

    updateProductData({ [field]: value });
  };

  if (!productData) return <></>;

  return (
    <>
      <ModalContentWrapper className="w-[800px] h-[500px]">
        <ModalHeader title={title} />
        <div className="flex-grow overflow-x-hidden">
          <div className="sm:flex sm:flex-row -mx-2">
            <div className="w-full sm:w-[200px] px-2 flex-shrink-0">
              <MyImage
                className="mx-auto rounded-lg"
                src={productData.image_url || "/cho_vo_tri.jpg"}
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

            <div className="mt-[30px] sm:mt-0 w-full px-2">
              <div className="space-y-3">
                <div className="space-y-1">
                  <label htmlFor="">Name</label>
                  <MyInput
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
                    {!!props.categories.length &&
                      props.categories.map((category, index) => (
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
            disabled={!ableToSubmit || !isChange}
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
