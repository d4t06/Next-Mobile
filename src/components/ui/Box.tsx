import { PlusIcon } from "@heroicons/react/16/solid";
import { ReactNode } from "react";

type Props = {
   onClick?: () => void;
   children?: ReactNode;
   className?: string;
   pushAble?: boolean;
};
export default function Box({ onClick, children, className }: Props) {
   const classes = {
      base: `group relative pt-[100%] rounded-[12px] ${
         !children ? "cursor-pointer " : ""
      }`,
      font: "absolute border overflow-hidden border-b-[6px] active:border-b-[2px] bg-[#f1f1f1] transition-[border] border-[#ccc] inset-0 flex rounded-[12px] items-center justify-center",
   };

   return (
      <div onClick={onClick} className={`${classes.base} ${className}`}>
         <div className={`${classes.font} `}>
            {children || <PlusIcon className="select-none w-[24px]" />}
         </div>
      </div>
   );
}
