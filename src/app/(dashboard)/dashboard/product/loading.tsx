import Skeleton from "@/components/Skeleton";

export default function Loading() {
   return (
      <>
         <Skeleton className="h-[34px] w-full" />
         <Skeleton className="h-[34px] w-[270px] mt-[20px]" />
         <div className="space-y-[10px] mt-[30px]">
            {[...Array(5).keys()].map((item) => (
               <Skeleton key={item} className="h-[70px] w-full" />
            ))}
         </div>
      </>
   );
}
