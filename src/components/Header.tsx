import Link from "next/link";
import Search from "./Search";
import { getAllCategories } from "@/libs/getAllCategory";
import LinkItem from "./LinkItem";

export const revalidate = 0;

export default async function Header() {
  const categories = await getAllCategories({});

  console.log('header check categories', categories);
  

  return (
    <div className="h-[60px] bg-[#f1f1f1]">
      <div className="px-[20px] h-full flex items-center">
        <Link href={"/"}>
          <h1 className="text-[22px] font-semibold">Mobile War</h1>
        </Link>
        <div className="ml-[20px] flex space-x-[10px]">
          {categories.map((item, index) => (
            <LinkItem key={index} href={"/" + item.category_ascii}>
              {item.category_name}
            </LinkItem>
          ))}

          <LinkItem href={"/dashboard"}>Dashboard</LinkItem>
        </div>

        <div className="ml-auto">
          <Search />
        </div>
      </div>
    </div>
  );
}
