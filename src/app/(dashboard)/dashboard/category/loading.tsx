import Skeleton from "@/components/Skeleton";
import Frame from "@/components/ui/Frame";

export default function Loading() {
   return (
      <div className="space-y-[30px]">
         <Skeleton className="w-[160px] h-[36px]" />
         <Skeleton className="w-full h-[200px]" />
         <Skeleton className="w-[160px] h-[36px]" />
         <Skeleton className="w-full h-[200px]" />
         <Skeleton className="w-[160px] h-[36px]" />
         <Skeleton className="w-full h-[200px]" />
      </div>
   );
}
