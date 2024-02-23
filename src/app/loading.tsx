import Skeleton from "@/components/Skeleton";

export default function loading() {
   return (
      <div className="mt-[30px] space-y-[20px]">
         {[...Array(3).keys()].map((item) => (
            <Skeleton key={item} className="w-full h-[200px]" />
         ))}
      </div>
   );
}
