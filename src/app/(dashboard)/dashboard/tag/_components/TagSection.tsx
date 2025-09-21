"use client";
import { useEffect, useState } from "react";
import CurrentCategoryProvider, {
  useCurrentCategoryContext,
} from "./CurrentCategoryContext";
import TagItem from "./TagItem";
import AddNewTagButton from "./AddNewTagBtn";
import { NotFound } from "@/components";

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
        <div className="flex items-center space-x-2 h-10">
          <label>Category: </label>
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
