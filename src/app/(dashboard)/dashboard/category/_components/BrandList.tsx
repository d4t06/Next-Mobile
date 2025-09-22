"use client";
import { useEffect, useMemo, useState } from "react";
import AddNewBrandBtn from "./AddNewBrandBtn";
import BrandItem from "./BrandItem";
import { useCurrentCategoryContext } from "../../_components/CurrentCategoryContext";
import CategorySelect from "../../_components/CategorySelect";

type Props = {
  categories: Category[];
};

export type BrandListModal = "add" | "edit-name" | "image" | "delete";

export default function BrandList({ categories }: Props) {
  const { currentCategory } = useCurrentCategoryContext();

  return (
    <>
      <div className="flex items-center justify-between h-9">
        <CategorySelect categories={categories} />

        {currentCategory && <AddNewBrandBtn />}
      </div>

      <div className={`flex flex-wrap gap-2`}>
        {currentCategory && (
          <>
            {currentCategory.brands.length ? (
              currentCategory.brands.map((brand, index) => (
                <BrandItem index={index} brand={brand} key={index} />
              ))
            ) : (
              <p className="text-center w-full mt-[10px]">¯\_(ツ)_/¯</p>
            )}
          </>
        )}
      </div>
    </>
  );
}
