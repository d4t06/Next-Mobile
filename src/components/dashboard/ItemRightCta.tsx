import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  margin?: boolean;
};

export default function ItemRightCtaFrame({
  children,
  margin = true,
  className = "",
}: Props) {
  const classes = `${margin ? "mt-2 ml-2" : ""} font-medium primary-shadow flex px-3 py-1.5 text-sm rounded-lg bg-white dark:bg-slate-600 border border-[--a-5-cl] [&>div]:ml-1.5 [&>div]:pl-1.5 [&>div]:border [&>div]:border-transparent [&>div]:flex [&>div]:space-x-1 [&>div]:border-l-[--a-10-cl] hover:[&_button]:scale-[1.05] ${className}`;

  return <div className={classes}>{children}</div>;
}
