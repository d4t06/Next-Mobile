import { getAllCategories } from "@/libs/getAllCategory";
import CategoryList from "../../../components/CategoryList";
import CategoryAttributeGroup from "../../../components/CategoryAttributeList";

export default async function CategoryManagePage() {
  const categories = await getAllCategories();

  return (
    <>
      <h1 className="text-[22px] mb-[10px]">All categories</h1>
      <CategoryList categories={categories} />
      {!!categories.length && (
        <div className="mt-[20px]">
          <CategoryAttributeGroup categories={categories} />
        </div>
      )}
    </>
  );
}
