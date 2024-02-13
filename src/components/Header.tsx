import Link from "next/link";
import Search from "./Search";

const getCategories = async () => {
   const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/categories`);
   if (!res.ok) throw new Error("Fail to fetch data");

   return (await res.json()) as Category[];
};

export default async function Header() {
   const categories = await getCategories();

   return (
      <div className="h-[60px] bg-[#f1f1f1]">
         <div className="px-[20px] h-full flex items-center">
            <Link href={"/"}>
               <h1 className="text-[22px] font-semibold">Mobile War</h1>
            </Link>
            <div className="ml-[20px] flex space-x-[10px]">
               {categories.map((item, index) => (
                  <Link key={index} href={"/" + item.category_ascii}>
                     {item.category_name}
                  </Link>
               ))}

               <Link href={"/dashboard"}>Dashboard</Link>
            </div>

            <div className="ml-auto">
               <Search />
            </div>
         </div>
      </div>
   );
}
