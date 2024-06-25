import Skeleton from "@/components/Skeleton";

export default function Loading() {
   return (
      <div className="space-y-[30px]">
         <Skeleton className="h-[36px] w-[180px]" />
         {[...Array(2).keys()].map((key) => (
            <div key={key} className="space-y-[30px]">
               <Skeleton className="h-[33px] w-[120px]" />

               <Skeleton className="h-[240px] w-full" />
            </div>
         ))}
      </div>
   );
}
