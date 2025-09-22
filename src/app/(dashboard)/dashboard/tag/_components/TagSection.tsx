"use client";
import { useEffect, useState } from "react";
import AddNewTagButton from "./AddNewTagBtn";
import { NotFound } from "@/components";
import CategorySelect from "../../_components/CategorySelect";
import CurrentCategoryProvider, { useCurrentCategoryContext } from "../../_components/CurrentCategoryContext";
import TagItem from "./TagItem";

type Props = {
  categories: Category[];
};

export type BrandListModal = "add" | "edit-name" | "image" | "delete";

function Content({ categories }: Props) {
  const { setCurrentCategory, currentCategory } = useCurrentCategoryContext();
  const [curCategoryIndex, setCurCategoryIndex] = useState<number>();

  useEffect(() => {
    if (curCategoryIndex !== undefined) {
      setCurrentCategory(categories[curCategoryIndex]);
    }
  }, [curCategoryIndex, categories]);

  return (
    <>
      <div className="flex items-center justify-between">
        <CategorySelect categories={categories} />

        {currentCategory && <AddNewTagButton value="" />}
      </div>

      <div className={`mt-1 flex flex-wrap -ml-2`}>
        {currentCategory && (
          <>
            {currentCategory.tags.length ? (
              currentCategory.tags.map((t, index) => <TagItem tag={t} key={index} />)
            ) : (
              <NotFound className="mx-auto" variant="less" />
            )}
          </>
        )}
      </div>
    </>
  );
}

export default function TagSection(props: Props) {
  return (
    <CurrentCategoryProvider>
      <Content {...props} />
    </CurrentCategoryProvider>
  );
}
