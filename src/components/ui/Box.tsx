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
    container: `group relative pt-[100%] rounded-[12px] border border-[#ccc] overflow-hidden bg-[#f1f1f1] ${
      !children ? "cursor-pointer " : ""
    }`,
    font: "absolute border-[2px] overflow-hidden border-b-[6px] active:border-b-[2px]  transition-[border] border-[#ccc] inset-0 flex rounded-[12px] items-center justify-center",
  };

  return (
    <div onClick={onClick} className={`${classes.container} ${className}`}>
      <div className={`${classes.font} `}>
        {children || <PlusIcon className="select-none w-[24px]" />}
      </div>
    </div>
  );
}
