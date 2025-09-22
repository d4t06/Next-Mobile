"use client";

import { useEffect, useMemo } from "react";
import SpecItem from "./SpecItem";
import { useCurrentCategoryContext } from "../../../_components/CurrentCategoryContext";
import { Title } from "@/components";
import { useCurrentProductContext } from "../CurrentProductContext";

export default function Specification() {
  const { categories, product } = useCurrentProductContext();
  const { setCurrentCategory, currentCategory } = useCurrentCategoryContext();

  const attributeOrderArray = useMemo(
    () =>
      currentCategory && currentCategory.attribute_order
        ? currentCategory.attribute_order.split("_")
        : [],
    [currentCategory],
  );

  useEffect(() => {
    setCurrentCategory(categories.find((c) => c.id === product.category_id));
  }, [categories]);

  if (!currentCategory) return <></>;

  return (
    <>
      <Title title="Specification" variant={"h2"} />

      <table className="w-full spec-table primary-shadow overflow-hidden rounded-lg ">
        <thead className="bg-[#cd1818] text-white ">
          <tr>
            <th>Name</th>
            <th>Value</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {attributeOrderArray.length
            ? attributeOrderArray.map((id) => (
                <SpecItem
                  key={id}
                  id={+id}
                  product={product}
                  productCategory={currentCategory}
                />
              ))
            : ""}
        </tbody>
      </table>
    </>
  );
}
