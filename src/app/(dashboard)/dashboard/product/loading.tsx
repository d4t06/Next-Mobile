import Skeleton from "@/components/Skeleton";
import { ProductListSkelton } from "@/components/skeleton";

export default function Loading() {
  return (
    <>
      <Skeleton className="h-[34px] w-full" />
      <Skeleton className="h-[34px] w-[270px] mt-[20px]" />

      <div className="space-y-2 mt-5">
        <ProductListSkelton />
      </div>
    </>
  );
}
