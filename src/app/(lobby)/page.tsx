import { getAllCategories } from "@/libs/getAllCategory";
import { LinkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function HomePage() {
   const categories = await getAllCategories();
   if (!categories) return <p>Some thing went wrong</p>;

   return (
      <>
      <div className="mt-5 text-xl font-bold">Categories</div>
         <div className="flex flex-col items-start [&_>*]:mt-2">
            {categories.map((c) => (
               <Link key={c.id} className="font-semibold flex hover:text-[#cd1818]" href={"/" + c.id}>
                  <LinkIcon className="w-6" />
                  <span className="ml-2">{c.category_name}</span>
               </Link>
            ))}
         </div>
      </>
   );
}
