import { ReactNode } from "react";

type Props = {
   children: ReactNode;
   rounded?: string;
   type?: "border" | "translate";
   active?: boolean;
   className?: string;
};

export default function Frame({
   children,
   active,
   type = "border",
   className,
}: Props) {
   if (type === "border")
      return (
         <div className={`bg-[#e1e1e1] dark:bg-[--second-btn-cl] p-1 pb-2 w-full h-full rounded-xl`}>
            <div className={`bg-white dark:bg-slate-800 relative overflow-hidden rounded-lg p-2 h-full w-full ${className}`}>
               {children}
            </div>
         </div>
      );

   return (
      <div className={`bg-[#ccc] dark:bg-[#a1a1a1] rounded-xl`}>
         <div
            className={`bg-[#f6f6f6] active:translate-y-[-2px] transition-transform border border-[#ccc] rounded-lg hover:translate-y-[-6px] translate-y-[-4px] ${
               active ? "!translate-y-[-2px]" : ""
            }`}
         >
            {children}
         </div>
      </div>
   );
}
