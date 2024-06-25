import empty from "@/assets/search-empty.png";
import Image from "next/image";

export default function NoProduct() {
   return (
      <div className="mt-[30px]">
         <Image width={120} height={120} className="m-auto" src={empty} alt="" />
         <p className="text-[18px] mt-[10px] text-center">No result found, ¯\_(ツ)_/¯ </p>
      </div>
   );
}
