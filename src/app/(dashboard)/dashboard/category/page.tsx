import CategoryList from "./_components/CategoryList";
import CategoryAttributeList from "./_components/CategoryAttributeList";
import BrandList from "./_components/BrandList";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/authOption";
import AddNewCategpryBtn from "./_components/AddNewCategoryBtn";

export const revalidate = 86400;

async function Group() {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_ENDPOINT ||
      "https://nest-mobile-production.up.railway.app/api" ||
      "https://nest-mobile-production.up.railway.app/api"
    }/categories`,
  );
  if (!res.ok) return <></>;

  const categories = (await res.json()) as Category[];

  const classes = {
    group: "p-[20px] rounded-[12px] bg-[--a-5-cl] border border-[--a-5-cl]",
    label: "text-2xl",
  };

  return (
    <div className="space-y-[30px]">
      <div className="flex justify-between items-center">
        <h1 className={classes.label}>Category</h1>
        <AddNewCategpryBtn />
      </div>
      <div className={classes.group}>
        <CategoryList categories={categories} />
      </div>
      <h1 className={classes.label}>Brand</h1>
      <div className={classes.group}>
        <BrandList categories={categories} />
      </div>
      <h1 className={classes.label}>Attribute</h1>
      <div className={classes.group}>
        <CategoryAttributeList categories={categories} />
      </div>
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
