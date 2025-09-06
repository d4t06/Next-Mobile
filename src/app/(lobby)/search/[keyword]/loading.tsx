import Skeleton from "@/components/Skeleton";

export default function Loading() {
   return (
      <>
         <div className="space-y-[10px] mt-[20px]">
            {[...Array(6).keys()].map((item) => (
               <div className="flex items-start" key={item}>
                  <Skeleton className="h-[70px] w-[70px]" />
                  <Skeleton className="ml-[10px] w-full sm:w-[260px] h-[24px]" />

               </div>
            ))}
         </div>
      </>
   );
}
