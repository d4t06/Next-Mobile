import { getAllCategories } from "@/libs/getAllCategory";
import AddProductForm from "@/components/AddProductForm";

export default async function AddProduct() {
  const categories = await getAllCategories();

  if (!categories) return <p>Some thing went wrong</p>;
  return <AddProductForm categories={categories} />;
}
