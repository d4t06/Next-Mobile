import { ReactNode } from "react";

export const revalidate = 0

export default function ProductLayout({ children }: { children: ReactNode }) {
  return <div className="pt-[30px]">{children}</div>;
}
