import Skeleton from "@/components/Skeleton";

export default function Loading() {
   return (
      <>
         <Skeleton className="h-[30px] w-[100px]" />

         <div className="space-y-[10px] mt-[20px]">
            {[...Array(5).keys()].map((item) => (
               <Skeleton key={item} className="h-[70px] w-[400px] max-w-full" />
            ))}
         </div>
      </>
   );
}
