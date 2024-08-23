import Skeleton from "@/components/Skeleton";

export default function Loading() {
  return (
    <>
      <Skeleton className="h-[34px] w-full" />
      <div className="space-y-4 mt-5">
        {[...Array(2).keys()].map((item) => (
          <div className="flex" key={item}>
            <Skeleton className="w-[44px] h-[44px] rounded-full flex-shrink-0" />
            <div className="ml-[10px]">
              <Skeleton className="h-[20px] w-[200px] max-w-[30vw] rounded-[4px]" />
              <Skeleton className="h-[24px] mt-[10px] w-[400px] max-w-[50vw] rounded-[4px]" />
              <Skeleton className="h-[18px] mt-[10px] w-[100px] max-w-[30vw] rounded-[4px]" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
