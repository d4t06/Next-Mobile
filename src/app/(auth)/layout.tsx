import Button from "@/components/ui/Button";
import { HomeIcon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
   return (
      <div className="h-screen relative">
         {children}
         <Button
            href="/"
            className="!absolute p-[6px] bottom-[20px] left-[20px]"
            size={"clear"}
            border={'clear'}
         >
            <HomeIcon className="w-[24px]" />
         </Button>
      </div>
   );
}
