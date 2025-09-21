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

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 h-9">
          <p className="faded-text">Category: </p>
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

      <div className={`flex flex-wrap gap-2`}>
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

      {currentCategory && attributeOrder.length >= 2 && (
        <p className="">
          <ChangeAttributeOrder currentCategory={currentCategory} />
        </p>
      )}
    </>
  );
}
