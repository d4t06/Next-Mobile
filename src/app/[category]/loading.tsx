import Skeleton from "@/components/Skeleton";

export default function Loading() {
   return (
      <div className="flex">
         {[...Array(2).keys()].map((item) => (
            <div key={item} className="w-1/2 sm:w-1/5 mt-[8px] px-[4px]">
               <Skeleton className="w-full pt-[100%]" />
            </div>
         ))}
      </div>
   );
}
