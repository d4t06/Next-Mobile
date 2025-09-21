"use client";

import { useEffect, useMemo } from "react";
import SpecItem from "./SpecItem";
import AddTagBtn from "./AddTagBtn";
import TagItem from "@/components/ui/TagItem";
import CurrentCategoryProvider, {
  useCurrentCategoryContext,
} from "../../../tag/_components/CurrentCategoryContext";

type Props = {
  categories: Category[];
  product: Product;
};

function Content({ categories, product }: Props) {
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

          <tr>
            <td>Tags</td>
            <td>
              <div className="flex flex-wrap gap-2">
                {product.product_tags.map((pT, i) => (
                  <TagItem key={i} tag={pT.tag} />
                ))}
              </div>
            </td>
            <td>
              <AddTagBtn tags={currentCategory.tags} product={product} />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default function Specification(props: Props) {
  return (
    <CurrentCategoryProvider>
      <Content {...props} />
    </CurrentCategoryProvider>
  );
}
