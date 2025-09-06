import Skeleton from "@/components/Skeleton";
import Frame from "@/components/ui/Frame";

export default function Loading() {
   return (
      <div className="sm:flex mx-[-10px]">
         <div className="w-full sm:w-1/3 px-[10px]">
            <Frame>
               <Skeleton className="h-[200px]" />
               <Skeleton className="h-[28px] mx-auto my-[14px] w-[50%]" />
               <div className="space-y-[10px]">
                  {[...Array(5).keys()].map((item) => (
                     <Skeleton key={item} className="h-[30px]" />
                  ))}
               </div>
            </Frame>
         </div>

         <div className="w-full sm:w-2/3 px-[10px] mt-[30px] sm:mt-0">
            <div className="space-y-[10px]">
               {[...Array(6).keys()].map((item) => (
                  <Skeleton key={item} className="h-[60px]" />
               ))}
            </div>
         </div>
      </div>
   );
}
