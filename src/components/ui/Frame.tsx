import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  rounded?: string;
  type?: "border" | "translate";
  active?: boolean;
};

export default function Frame({
  children,
  active,
  rounded = "rounded-[8px]",
  type = "border",
}: Props) {
  if (type === "border")
    return (
      <div className="bg-[#e1e1e1] p-[4px] pb-[8px] rounded-[14px] w-full h-full">
        <div className="bg-[#fff] rounded-[12px] overflow-hidden p-[10px] h-full w-full">{children}</div>
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
