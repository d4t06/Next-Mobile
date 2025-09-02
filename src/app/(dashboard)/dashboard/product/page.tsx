import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ProductItem from "./_components/ProductItem";
import { getAllCategories } from "@/libs/getAllCategory";
import AddProductButton from "./_components/AddProductButton";
import Search from "@/layout/_components/Search";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/authOption";
import { getAllProducts } from "@/libs/getAllProducts";
import NoProduct from "@/components/NoProduct";
import DashboardProductContent from "./Content";

export const revalidate = 86400;

export default async function ProductManage() {
  const session = await getServerSession(nextAuthOptions);
  const categories = await getAllCategories();

  if (!session) return redirect("/signin");
  if (session.user.role !== "ADMIN") return redirect("/unauthorized");

  const data = await getAllProducts();

  if (!data || !categories) return <p className="text-center">Some thing went wrong</p>;

  return (
    <>
     <DashboardProductContent  categories={categories} products={data.products} />
    </>
  );
}
