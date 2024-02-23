import Link from "next/link";
import Search from "./Search";
import { getAllCategories } from "@/libs/getAllCategory";
import LinkItem from "./LinkItem";
import LinkList from "./LinkList";

export default async function Header() {
   const categories = await getAllCategories();

   return (
      <>
         <div className="h-[80px]  sm:h-auto">
            <div className="container min-[768px]:w-[800px] px-[10px] mx-auto h-full sm:px-0">
               <div className="sm:h-[60px] flex flex-col sm:flex-row items-start sm:items-center">
                  <Link href={"/"}>
                     <h1 className="text-[22px] font-[500] my-[5px] sm:my-0 leading-[30px]">
                        Mobile Wars
                     </h1>
                  </Link>

                  <div className="w-full sm:w-auto ml-auto">
                     <Search />
                  </div>
               </div>
               {/* desktop navigation */}
               <div className="bg-[#9e0d1d] h-[34px] text-white items-center px-[10px] rounded-[6px] hidden gap-[10px] sm:flex">
                  <LinkList categories={categories} />
               </div>
            </div>
         </div>
      </>
   );
}
