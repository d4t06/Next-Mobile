import Link from "next/link";
import Search from "./Search";

export default function Header() {
   return (
      <div className="h-[60px] bg-[#f1f1f1]">
         <div className="px-[20px] h-full flex items-center">
            <Link href={"/"}>
               <h1 className="text-[22px] font-semibold">Mobile War</h1>
            </Link>
            <nav className="ml-[20px] flex space-x-[10px]">
               <Link href={"/product"}>Product</Link>
            </nav>

            <div className="ml-auto">
               <Search />
            </div>
         </div>
      </div>
   );
}
