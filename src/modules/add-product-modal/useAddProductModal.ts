import { runRevalidateTag } from "@/app/actions";
import useFetch from "@/hooks/useFetch";
import { useToastContext } from "@/stores/ToastContext";
import { ComponentProps, useEffect, useMemo, useState } from "react";
import AddProductModal from ".";
import { initProductObject } from "@/utils/appHelper";
import { useModalContext } from "@/components/modal/Modal";

const PRODUCT_URL = "/products";

export default function useAddProductModal({
  categories,
  ...props
}: ComponentProps<typeof AddProductModal>) {
  const { setIsOpen, persist } = useModalContext();
  const { setErrorToast, setSuccessToast } = useToastContext();

  const [productData, setProductData] = useState<ProductSchema>();
  const [isFetching, setIsFetching] = useState(false);
  // const [isChange, setIsChange] = useState(false);

  const privateRequest = useFetch();

  const currentCategory = useMemo(
    () =>
      productData ? categories.find((c) => c.id === productData.category_id) : undefined,
    [categories, productData?.category_id],
  );

  const brandByCategory = useMemo(
    () => (currentCategory ? currentCategory.brands : []),
    [productData?.category_id],
  );

  const isChange = useMemo(() => {
    if (props.type === "Add") return true;

    if (!productData) return false;

    return (
      props.product.product_name !== productData?.product_name ||
      props.product.brand_id !== productData.brand_id ||
      props.product.image_url !== productData.image_url
    );
  }, [props, productData]);

  const ableToSubmit = useMemo(
    () =>
      productData &&
      isChange &&
      !!productData.product_name &&
      productData.category_id !== undefined &&
      productData.brand_id !== undefined,
    [productData, isChange],
  );

  const updateProductData = (payload: Partial<ProductSchema>) => {
    if (productData) setProductData(() => ({ ...productData, ...payload }));
  };

  const handleSubmit = async () => {
    try {
      if (!productData) return;
      setIsFetching(true);

      switch (props.type) {
        case "Add": {
          await privateRequest.post(`${PRODUCT_URL}`, productData);
          await runRevalidateTag(`products-${productData.category_id}`);

          break;
        }
        case "Edit": {
          await privateRequest.put(`${PRODUCT_URL}/${props.product.id}`, productData);

          await runRevalidateTag("product-" + props.product.id);
          await runRevalidateTag(`products-${props.product.category_id}`);

          break;
        }
      }

      setSuccessToast(`${props.type} product successful`);
    } catch (error: any) {
      if (error.response.status === 409) {
        setErrorToast("Product name had taken");
      } else setErrorToast();
    } finally {
      setIsFetching(false);
      setIsOpen(false);
    }
  };

  //  init product data
  useEffect(() => {
    switch (props.type) {
      case "Add":
        return setProductData(initProductObject({}));
      case "Edit":
        const { id, product_tags, features, attributes, category, description, ...rest } =
          props.product;
        return setProductData(initProductObject(rest));
    }
  }, []);

  // auto set brand
  useEffect(() => {
    if (currentCategory && productData?.product_name && brandByCategory) {
      const [brand, ..._rest] = productData.product_name.split(" ");

      const foundedBrand = brandByCategory.find(
        (b) => b.brand_name.toLowerCase() === brand.toLowerCase(),
      );

      if (foundedBrand) {
        updateProductData({ brand_id: foundedBrand.id });
      }
    }
  }, [productData?.category_id]);

  useEffect(() => {
    if (isChange) {
      persist.current = true;
    }
  }, [productData]);

  return {
    isFetching,
    handleSubmit,
    setProductData,
    updateProductData,
    productData,
    ableToSubmit,
    currentCategory,
    isChange,
    brandByCategory,
  };
}
