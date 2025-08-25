import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function DetailFrame({
  children,
  className = "space-y-1",
}: Props) {
  return (
    <div
      className={
        "text-sm [&_span]:font-semibold [&_span]:text-[#666] [&_span]:ml-1 " +
        className
      }
    >
      {children}
    </div>
  );
}
