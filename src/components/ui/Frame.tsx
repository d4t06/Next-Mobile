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
   rounded = "rounded-[8px]",
   type = "border",
   className,
}: Props) {
   if (type === "border")
      return (
         <div className="bg-[#e1e1e1] dark:bg-[#a1a1a1] p-1 pb-2 rounded-xl w-full h-full">
            <div className={`bg-white dark:bg-slate-800 relative rounded-xl overflow-hidden p-2 h-full w-full ${className}`}>
               {children}
            </div>
         </div>
      );

   return (
      <div className={`bg-[#ccc] dark:bg-[#a1a1a1] ${rounded}`}>
         <div
            className={`bg-[#f6f6f6] active:translate-y-[-2px] transition-transform border border-[#ccc] ${rounded} hover:translate-y-[-6px] translate-y-[-4px] ${
               active ? "!translate-y-[-2px]" : ""
            }`}
         >
            {children}
         </div>
      </div>
   );
}
