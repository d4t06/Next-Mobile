import { ReactNode } from "react";

type Props = {
  className?: string;
  children: ReactNode;
  colorClasses?: string;
};

export default function PopupWrapper({
  children,
  className = "",
  colorClasses = "bg-white dark:bg-slate-700",
}: Props) {
  return (
    <div
      className={`rounded-md py-2 popup-shadow transition-[color] ${colorClasses}  ${className}`}
    >
      {children}
    </div>
  );
}
