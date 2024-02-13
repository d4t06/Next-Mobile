import Link from "next/link";

export default function DashboardHeader() {
   return (
      <div className="flex h-[40px] space-x-[10px]  text-white items-center bg-[#cd1818] rounded-[12px] px-[20px]">
         <Link href={"/dashboard/product-manage"}>Product</Link>
         <Link href={"/dashboard/category-manage"}>Category</Link>
      </div>
   );
}
