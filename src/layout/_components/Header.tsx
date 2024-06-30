import Link from "next/link";
import Search from "./Search";
import { getAllCategories } from "@/libs/getAllCategory";
import LinkList from "./LinkList";
import MobileSidebar from "./MobileSidebar";
import Avatar from "./Avatar";

export default async function Header() {
   const categories = await getAllCategories();

   if (!categories) return <p>Some thing went wrong</p>;

   return (
      <>
         <div className="h-[80px]  sm:h-auto">
            <div className="container">
               <div className="sm:h-[60px] flex flex-col sm:flex-row items-start sm:items-center">
                  <div className="flex items-center justify-center w-full h-[50px] sm:h-auto sm:w-auto">
                     <MobileSidebar categories={categories} />

                     <Link href={"/"}>
                        <h1 className="text-[22px] font-[500] my-[5px] sm:my-0 leading-[30px]">
                           <span className="text-[#cd1818]">Next </span>Mobile
                        </h1>
                     </Link>
                  </div>

                  <div className="w-full sm:flex sm:items-center sm:w-auto ml-auto mt-[6px] sm:mt-0">
                     <Search variant="home" />

                     <div className="hidden sm:block ml-[30px]">
                        <Avatar />
                     </div>
                  </div>
               </div>
               <div className="bg-[#cd1818] h-[40px] text-white items-center px-[10px] rounded-[6px] hidden gap-[10px] sm:flex">
                  <LinkList categories={categories} />
               </div>
            </div>
         </div>
      </>
   );
}
