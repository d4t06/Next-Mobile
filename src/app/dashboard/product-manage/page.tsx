import Button from "@/components/ui/Button";
import { getAllProducts } from "@/libs/getAllProducts";
import { PlusIcon } from "@heroicons/react/24/outline";
import { log } from "console";
import Link from "next/link";

export default async function ProductManage() {
  const data = await getAllProducts(2, 1);

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-[22px]">All products</h1>
        <Button variant={"push"} href={"product-manage/add-product"}>
          Add new
        </Button>
      </div>
      <ul className="space-y-[4px] mt-[10px]">
        {data.products.map((p, index) => (
          <li>
            <Link key={index} href={`product-manage/${p.product_ascii}`}>
              {p.product_name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
