import Skeleton from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="mt-[20px] space-y-[10px]">
      <Skeleton className="h-[24px] w-[100px]" />
      <Skeleton className="h-[30px] w-full" />
      <div className="flex flex-col space-y-[20px] sm:space-y-0 sm:flex-row mx-[-8px]">
        <div className="w-full sm:w-1/3 px-[8px]">
          <Skeleton className="pt-[100%]" />
        </div>
        <div className="flex-grow h-[400px] px-[8px] space-y-[10px]">
          {[...Array(5).keys()].map((item) => (
            <Skeleton key={item} className="h-[30px]" />
          ))}
        </div>
      </div>
    </div>
  );
}
