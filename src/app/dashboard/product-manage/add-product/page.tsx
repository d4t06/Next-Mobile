import { getAllCategories } from "@/libs/getAllCategory";
import AddProductForm from "../../../../components/AddProductForm";

export const revalidate = 0;

export default async function AddProduct() {
  const categories = await getAllCategories();
  return <AddProductForm type="Add" categories={categories} />;
}
