import Link from "next/link";
import Search from "./Search";
import { getAllCategories } from "@/libs/getAllCategory";
import LinkItem from "./LinkItem";

export const revalidate = 0;

export default async function Header() {
  const categories = await getAllCategories();

  return (
    <>
      <div className="h-[60px]">
        <div className="container min-[768px]:w-[800px] px-[10px] mx-auto h-full sm:px-0">
          <div className="h-full flex items-center">
            <Link href={"/"}>
              <h1 className="text-[22px] font-[500]">Mobile Wars</h1>
            </Link>
            <div className="ml-[20px] flex space-x-[10px]">
              {categories.map((item, index) => (
                <LinkItem key={index} href={"/" + item.category_ascii}>
                  {item.category_name}
                </LinkItem>
              ))}
            </div>

            <div className="ml-auto">
              <Search />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[30px] bg-[#9e0d1d]">
        <p className="text-[14px] text-white text-center leading-[30px]">
          We compare techs ^^.
        </p>
      </div>
    </>
  );
}
