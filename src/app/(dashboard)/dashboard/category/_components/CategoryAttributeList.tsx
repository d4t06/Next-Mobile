"use client";

import AttributeItem from "./AttributeIttem";
import AddNewAttributeBtn from "./AddNewAttributeBtn";
import ChangeAttributeOrder from "./ChangeAttributeOrder";
import CategorySelect from "../../_components/CategorySelect";
import { useCurrentCategoryContext } from "../../_components/CurrentCategoryContext";

type Props = {
  categories: Category[];
};

export default function CategoryAttributeList({ categories }: Props) {
  const { currentCategory } = useCurrentCategoryContext();

  const attributeOrder = currentCategory?.attribute_order
    ? currentCategory.attribute_order.split("_")
    : [];

  return (
    <>
      <div className="flex items-center justify-between h-9">
        <CategorySelect categories={categories} />
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
