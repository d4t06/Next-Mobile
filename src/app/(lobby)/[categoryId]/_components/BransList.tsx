"use client";

import Button from "@/components/ui/Button";
import { useSearchParams } from "next/navigation";

export default function BrandList({ brands }: { brands: Brand[] }) {
  const params = useSearchParams();

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
