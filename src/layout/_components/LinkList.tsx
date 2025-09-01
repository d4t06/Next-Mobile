"use client";
import Button from "@/components/ui/Button";
import LinkItem from "./LinkItem";
import { ComputerDesktopIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";

type Props = {
   categories: Category[];
};
export default function LinkList({ categories }: Props) {
   const { data: session } = useSession();

   return (
      <>
         <div className="flex h-full [&_a]:leading-[32px] [&_a.active]:bg-white [&_a.active]:text-[--primary-cl] dark:[&_a.active]:bg-slate-800 font-semibold [&_a]:px-3">
            {categories.map((category, index) => (
               <LinkItem activeClass="active" key={index} href={"/" + category.id}>
                  {category.category_name}
               </LinkItem>
            ))}
         </div>

         <div className="flex ml-[auto]">
            {session?.user.role === "ADMIN" && (
               <Button border={'clear'} colors={'clear'} variant={'clear'} size={'clear'} href={"/dashboard"}>
                  <ComputerDesktopIcon className="w-[22px]" />
                  <span className="ml-1">Dashboard</span>
               </Button>
            )}
         </div>
      </>
   );
}
