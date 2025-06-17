"use client";

import { useMemo, useState } from "react";
import AddNewBrandBtn from "./AddNewBrandBtn";
import BrandItem from "./BrandItem";
import { inputClasses } from "@/components/ui/MyInput";

type Props = {
  categories: Category[];
};

export type BrandListModal = "add" | "edit-name" | "image" | "delete";

const classes = {
  label: "font-[500] text-[#333]",
};

export default function BrandList({ categories }: Props) {
  const [curCategoryIndex, setCurCategoryIndex] = useState<number>();

  const currentCategory = useMemo(
    () => (curCategoryIndex != undefined ? categories[curCategoryIndex] : undefined),
    [categories, curCategoryIndex],
  );

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-[10px]">
          <p className={classes.label}>Category: </p>
          <div className="bg-[#ccc] rounded-[12px]">
            <select
              disabled={!categories.length}
              className={`${inputClasses.input} min-w-[100px]`}
              name="category"
              onChange={(e) => setCurCategoryIndex(+e.target.value)}
            >
              <option value={undefined}>---</option>
              {!!categories.length &&
                categories.map((category, index) => (
                  <option key={index} value={index}>
                    {category.category_name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {currentCategory && <AddNewBrandBtn currentCategory={currentCategory} />}
      </div>

      <div
        className={`mt-[4px] flex flex-wrap items-start ml-[-10px] ${
          false ? "disable" : ""
        }`}
      >
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
