import Link from "next/link";
import Search from "./Search";
import { getAllCategories } from "@/libs/getAllCategory";
import LinkList from "./LinkList";
import MobileSidebar from "./MobileSidebar";
import Avatar from "./Avatar";
import ToggleTheme from "./ToggleTheme";

export default async function Header() {
  const categories = await getAllCategories();

  if (!categories) return <p>Some thing went wrong</p>;

  return (
    <>
      <div className="h-[80px]  sm:h-auto">
        <div className="container">
          <div className="sm:h-[60px] flex flex-col sm:flex-row items-start sm:items-center">
            <div className="flex relative items-center justify-center w-full h-[50px] sm:h-auto sm:w-auto">
              <MobileSidebar categories={categories} />

              <Link href={"/"} className="flex items-center">
                <div className="bg-[#cd1818] flex-shrink-0 w-8 flex h-8 rounded-md justify-center items-center">
                  <span className="text-white text-xl font-bold translate-y-[1px]">
                    :D
                  </span>
                </div>
                <span className="font-bold ml-2">Dspec</span>
              </Link>
            </div>

            <div className="w-full sm:flex sm:items-center sm:w-auto ml-auto mt-[6px] sm:mt-0">
              <Search variant="home" />

              <div className="hidden sm:block ml-6">
                <Avatar />
              </div>
              <div className="ml-5 hidden sm:inline-flex">
                <ToggleTheme />
              </div>
            </div>
          </div>
          <div className="bg-[#cd1818] h-8 text-white items-center rounded-md hidden sm:flex [&_a]:leading-[32px] [&_a.active]:bg-white [&_a.active]:text-[--primary-cl] dark:[&_a.active]:bg-slate-800 font-semibold [&_a]:px-3">
            <LinkList categories={categories} />
          </div>
        </div>
      </div>
    </>
  );
}
