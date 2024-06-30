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
         <div className="bg-[#e1e1e1] p-[3px] pb-[6px] rounded-[12px] w-full h-full">
            <div className={`bg-[#fff] relative rounded-[10px] overflow-hidden p-[10px] h-full w-full ${className}`}>
               {children}
            </div>
         </div>
      );

   return (
      <div className={`bg-[#ccc] ${rounded}`}>
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
