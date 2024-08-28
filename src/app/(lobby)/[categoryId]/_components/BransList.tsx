"use client";

import Button from "@/components/ui/Button";
import { useSearchParams } from "next/navigation";

export default function BrandList({ brands }: { brands: Brand[] }) {
   const params = useSearchParams();

   // const generateLink = ({ key, value }: { key: string; value: string }) => {
   //    let url = "";

   //    for (const [k, v] of params.entries()) {
   //       if (!url) {
   //          if (k !== key) url += `?${k}=${v}`;
   //          else url += `?${k}=${value}`;
   //       } else {
   //          if (k !== key) url += `&${k}=${v}`;
   //          else url += `&${k}=${value}`;
   //       }
   //    }

   //    if (!url) url = `${pathName}?${key}=${value}`;
   //    else if (!params.get(key)) {
   //       url += `&${key}=${value}`;
   //    }

   //    console.log("check ", url);

   //    return url;
   // };

   return (
      <div className="flex flex-wrap -ml-2 mb-2">
         {brands.map((b, index) => (
            <Button
               key={index}
               href={`/${
                  params.get("page")
                     ? `?page=${params.get("page")}&brand_id=${b.id}`
                     : `?brand_id=${b.id}`
               }`}
               colors={"second"}
               size={"clear"}
               className="mt-2 ml-2 p-1 sm:px-2"
            >
               {b.brand_name}
            </Button>
         ))}
      </div>
   );
}
