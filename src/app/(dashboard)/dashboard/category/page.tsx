import CategoryList from "./_components/CategoryList";
import CategoryAttributeList from "./_components/CategoryAttributeList";
import BrandList from "./_components/BrandList";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/authOption";
import AddNewCategpryBtn from "./_components/AddNewCategoryBtn";
import { Title } from "@/components";
import CurrentCategoryProvider from "../_components/CurrentCategoryContext";

export const revalidate = 86400;

async function Group() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/categories`);
  if (!res.ok) return <></>;

  const categories = (await res.json()) as Category[];

  return (
    <div className="space-y-[30px]">
      <div className="flex justify-between items-center">
        <Title title="Category" />
        <AddNewCategpryBtn />
      </div>
      <CategoryList categories={categories} />

      <Title title="Brand" />

      <CurrentCategoryProvider>
        <BrandList categories={categories} />
      </CurrentCategoryProvider>

      <Title title="Attribute" />

      <CurrentCategoryProvider>
        <CategoryAttributeList categories={categories} />
      </CurrentCategoryProvider>
    </div>
  );
}

export default async function CategoryManagePage() {
  const session = await getServerSession(nextAuthOptions);

  if (!session) return redirect("/signin");
  if (session.user.role !== "ADMIN") return redirect("/unauthorized");

  return (
    <>
      <Group />
    </>
  );
}
