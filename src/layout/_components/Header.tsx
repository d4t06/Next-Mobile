import Link from "next/link";
import Search from "./Search";
import { getAllCategories } from "@/libs/getAllCategory";
import LinkList from "./LinkList";
import MobileSidebar from "./MobileSidebar";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/authOption";
import Avatar from "./Avatar";

export default async function Header() {
   const categories = await getAllCategories();

   if (!categories) return <p>Some thing went wrong</p>;

   return (
      <>
         <div className="h-[80px]  sm:h-auto">
            <div className="container">
               <div className="sm:h-[60px] flex flex-col sm:flex-row items-start sm:items-center">
                  <Link href={"/"}>
                     <h1 className="text-[22px] font-[500] my-[5px] sm:my-0 leading-[30px]">
                        <span className="text-[#cd1818]">Next </span>Mobile
                     </h1>
                  </Link>

                  <div className="w-full sm:flex sm:items-center sm:w-auto ml-auto">
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

         <MobileSidebar categories={categories} />
      </>
   );
}
