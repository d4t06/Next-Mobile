import Skeleton from "@/components/Skeleton";

export default function Loading() {
   return (
      <>
         <Skeleton className="h-[32px] w-[200px]" />

         <Skeleton className="h-[36px] w-full mt-[20px]" />

         <div className="space-y-[10px] mt-[30px]">
            {[...Array(5).keys()].map((item) => (
               <Skeleton key={item} className="h-[70px] w-[300px]" />
            ))}
         </div>
      </>
   );
}
