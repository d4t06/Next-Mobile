import Link from "next/link";
import Search from "./Search";
import { getAllCategories } from "@/libs/getAllCategory";
import LinkItem from "./LinkItem";

export default async function Header() {
  const categories = await getAllCategories();

  return (
    <>
      <div className="h-[80px] sm:border-b border-black/15  sm:h-[60px]">
        <div className="container min-[768px]:w-[800px] px-[10px] mx-auto h-full sm:px-0">
          <div className="h-full flex flex-col sm:flex-row items-start sm:items-center">
            <Link href={"/"}>
              <h1 className="text-[22px] font-[500] my-[5px] sm:mb-0 leading-[30px]">
                Mobile Wars
              </h1>
            </Link>

            {/* desktop navigation */}
            <div className="ml-[20px] hidden space-x-[10px] sm:flex">
              {categories.map((item, index) => (
                <LinkItem key={index} href={"/" + item.category_ascii}>
                  {item.category_name}
                </LinkItem>
              ))}
            </div>

            <div className="w-full sm:w-auto ml-auto">
              <Search />
            </div>
          </div>
        </div>
      </div>

      {/* mobile navigation */}
      <div className="h-[30px]  sm:hidden px-[10px]">
        <div className="bg-[#9e0d1d] rounded-[8px] h-full pl-[10px] flex items-center space-x-[10px]">
          {categories.map((item, index) => (
            <LinkItem
              className="text-[white]"
              key={index}
              href={"/" + item.category_ascii}
            >
              {item.category_name}
            </LinkItem>
          ))}
        </div>
      </div>
    </>
  );
}
