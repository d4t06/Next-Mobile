import Skeleton from "@/components/Skeleton";
import Frame from "@/components/ui/Frame";

export default function Loading() {
   return (
      <>
         <Skeleton className="h-[28px] sm:h-[32px] mb-[20px] w-[500px] max-w-full" />
         <Frame>
            <div className="flex">
               <div className="w-1/5 sm:w-1/6"></div>
               <div className="flex-1 mr-[10px]">
                  <Skeleton className="pt-[100%] sm:pt-0 sm:h-[200px]" />
                  <Skeleton className="h-[16px] sm:h-[24px] mt-[14px] w-[80%] mx-auto" />
               </div>
               <div className="flex-1">
                  <Skeleton className="pt-[100%] sm:pt-0 sm:h-[200px]" />
                  <Skeleton className="h-[16px] sm:h-[24px] mt-[14px] w-[80%] mx-auto" />
               </div>
            </div>
            <div className="space-y-[10px] mt-[14px]">
               {[...Array(5).keys()].map((item) => (
                  <Skeleton key={item} className="h-[30px]" />
               ))}
            </div>
         </Frame>
      </>
   );
}
