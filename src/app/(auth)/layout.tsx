import Button from "@/components/ui/Button";
import { HomeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
   return (
      <div className="h-screen relative">
         {children}
         <Link href={'/'}>
            <Button
               variant={"push"}
               className="!absolute h-[40px] w-[40px] bottom-[20px] left-[20px]"
            >
               <HomeIcon className="w-[24px]" />
            </Button>
         </Link>
      </div>
   );
}
