"use client";

import { useMemo, useState } from "react";
import AttributeItem from "./AttributeIttem";
import AddNewAttributeBtn from "./AddNewAttributeBtn";
import ChangeAttributeOrder from "./ChangeAttributeOrder";

type Props = {
  categories: Category[];
};

export default function CategoryAttributeList({ categories }: Props) {
  const [curCategoryIndex, setCurCategoryIndex] = useState<number>();

  const currentCategory = useMemo(
    () => (curCategoryIndex != undefined ? categories[curCategoryIndex] : undefined),
    [categories, curCategoryIndex],
  );

  const attributeOrder = currentCategory?.attribute_order
    ? currentCategory.attribute_order.split("_")
    : [];

  const classes = {
    label: "font-bold",
    attrItem:
      " bg-[#f1f1f1] mt-[10px] ml-[10px] px-4 py-2 border-[#ccc] border rounded-[8px]",
    cta: "ml-[10px] pl-[10px] border-[#ccc] border-l-[1px] flex items-center space-x-1",
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-[10px]">
          <p className={classes.label}>Category: </p>
          <div className="bg-[#ccc] rounded-[12px]">
            <select
              disabled={!categories.length}
              className={`my-input min-w-[100px]`}
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

        {currentCategory && <AddNewAttributeBtn currentCategory={currentCategory} />}
      </div>

      <div
        className={`mt-[4px] flex flex-wrap items-start ml-[-10px] ${
          false ? "disable" : ""
        }`}
      >
        {currentCategory && (
          <>
            {attributeOrder.length ? (
              attributeOrder.map((id, index) => {
                const foundedCatAttribute = currentCategory.attributes.find(
                  (attr) => attr.id === +id,
                );
                if (!foundedCatAttribute) return <p>Wrong index</p>;

                return (
                  <AttributeItem
                    key={index}
                    attribute={foundedCatAttribute}
                    index={currentCategory?.attributes.findIndex(
                      (att) => att.id === foundedCatAttribute.id,
                    )}
                  />
                );
              })
            ) : (
              <p className="text-center w-full mt-[10px]">¯\_(ツ)_/¯ </p>
            )}
          </>
        )}
      </div>

      {currentCategory && (
        <p className="mt-5">
          <ChangeAttributeOrder currentCategory={currentCategory} />
        </p>
      )}
    </>
  );
}
