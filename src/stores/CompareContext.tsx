"use client";

import { getLocalStorage, setLocalStorage } from "@/utils/appHelper";
import { ReactNode, createContext, useContext, useEffect, useRef, useState } from "react";

export type CompareRef = { setIsOpen: (v: boolean) => void };

const useCompare = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectIdList, setSelectIdList] = useState<number[]>([]);

  const compareRef = useRef<CompareRef | null>(null);

  const addProduct = (product: Product) => {
    const newProducts = [...products];
    const newIds = [...selectIdList];

       const productIndex = newProducts.findIndex((p) => p.id === product.id);

    if (productIndex === -1) newProducts.push(product);
    else newProducts.splice(productIndex, 1);

    const indexInSelect = newIds.findIndex((id) => id === product.id);
    if (indexInSelect !== -1) newIds.splice(indexInSelect, 1);

    setProducts(newProducts);
    setSelectIdList(newIds);
    setLocalStorage("compare-products", newProducts);
  };

  const selectProduct = (product: Product) => {
    const newIds = [...selectIdList];

    const indexInSelect = newIds.findIndex((id) => id === product.id);
    if (indexInSelect !== -1) newIds.splice(indexInSelect, 1);
    else newIds.push(product.id)

    setSelectIdList(newIds);
  };

  const reset = () => {
    setProducts([]);
    setSelectIdList([]);
    setLocalStorage("compare-products", []);
  };

  useEffect(() => {
    const storage = getLocalStorage();
    setProducts(storage["compare-products"] || []);
  }, []);

  return {
    products,
    setProducts,
    selectIdList,
    setSelectIdList,
    selectProduct,
    addProduct,
    reset,
    compareRef,
  };
};

type ContextType = ReturnType<typeof useCompare>;

const CompareContext = createContext<ContextType | null>(null);

export default function CompareProvider({ children }: { children: ReactNode }) {
  return (
    <CompareContext.Provider value={useCompare()}>{children}</CompareContext.Provider>
  );
}

export const useCompareContext = () => {
  const context = useContext(CompareContext);
  if (!context) throw new Error("context is required");

  return context;
};
