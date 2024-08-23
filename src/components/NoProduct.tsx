import empty from "@/assets/search-empty.png";
import Image from "next/image";
import { ReactNode } from "react";

export default function NoProduct({
  less = false,
  children,
}: {
  less?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className="mt-[30px] text-center font-medium space-y-1">
      <Image width={120} height={120} className="m-auto" src={empty} alt="" />

      {children ? children : <p>No result found, ¯\_(ツ)_/¯ </p>}
    </div>
  );
}
