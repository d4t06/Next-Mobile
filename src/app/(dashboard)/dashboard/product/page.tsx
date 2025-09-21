import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getAllCategories } from "@/libs/getAllCategory";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/authOption";
import { NotFound, Title } from "@/components";
import AddProductButton from "./_components/AddProductButton";
import SearchBar from "./_components/SearchBar";
import { Suspense } from "react";
import { ProductListSkelton } from "@/components/skeleton";
import DashboardProductContent from "./Content";

// export const revalidate = 86400;

type Params = {
  searchParams: { q: string };
};

export default async function ProductManage({ searchParams: { q = "" } }: Params) {
  const session = await getServerSession(nextAuthOptions);
  const categories = await getAllCategories();

  if (!session) return redirect("/signin");
  if (session.user.role !== "ADMIN") return redirect("/unauthorized");

  if (!categories) return <NotFound variant="less" />;

  return (
    <>
      <div className="flex justify-between">
        <Title title="Products" />
        <AddProductButton categories={categories} />
      </div>

      <div className="mt-3 inline-block">
        <SearchBar q={q} />
      </div>

      <Suspense
        fallback={
          <div className="mt-5 space-y-4">
            <ProductListSkelton />
          </div>
        }
      >
        <DashboardProductContent keyword={q} />
      </Suspense>
    </>
  );
}
