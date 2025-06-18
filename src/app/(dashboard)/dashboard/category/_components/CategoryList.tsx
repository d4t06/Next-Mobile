'use client'

import NotFound from "@/components/ui/NotFound";
import CategoryItem from "./CategoryItem";

type Props = {
  categories: Category[];
};

export default function CategoryList({ categories }: Props) {
  return (
    <>
      <div className="flex flex-wrap -mx-2 -mt-2">
        {categories.length ? (
          categories.map((c, index) => <CategoryItem key={index} category={c} />)
        ) : (
          <NotFound />
        )}
      </div>
    </>
  );
}
