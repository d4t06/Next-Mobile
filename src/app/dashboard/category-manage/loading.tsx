import Skeleton from "@/components/Skeleton";
import Frame from "@/components/ui/Frame";

export default function Loading() {
   return (
      <div className="space-y-[16px]">
         <Skeleton className="w-[160px] h-[24px]" />
         <div className="flex flex-wrap mx-[-4px]">
            {[...Array(4).keys()].map((item) => (
               <div key={item} className="w-1/6 px-[4px]">
                  <Skeleton className="pt-[100%]" />
               </div>
            ))}
         </div>

         <Frame>
            <div className="space-y-[16px]">
               <div className="flex justify-between items-center">
                  <Skeleton className="w-[100px] h-[33px]" />
                  <Skeleton className="w-[140px] h-[33px]" />
               </div>
               <div className="flex flex-wrap gap-[10px]">
                  {[...Array(8).keys()].map((item) => (
                     <Skeleton key={item} className="h-[42px] w-[160px]" />
                  ))}
               </div>
            </div>
         </Frame>
      </div>
   );
}
