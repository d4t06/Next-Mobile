import { getAllCategories } from "@/libs/getAllCategory";
import AddProductForm from "../../../../components/AddProductForm";

export default async function AddProduct() {
  const categories = await getAllCategories();
  return <AddProductForm type="Add" categories={categories} />;
}
