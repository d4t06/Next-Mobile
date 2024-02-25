import Button from "@/components/ui/Button";
import { getAllProducts } from "@/libs/getAllProducts";
import Link from "next/link";

export default async function ProductManage() {
  const data = await getAllProducts(2, 1);

  const classes = {
    linkItem: "list-disc",
    aItem: "text-[#333] font-[500] hover:text-[#cd1818]",
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-[22px]">All products</h1>
        <Button variant={"push"} href={"product-manage/add-product"}>
          Add new
        </Button>
      </div>

      {!!data.products.length && (
        <ul className="space-y-[4px] mt-[10px] mx-[10px]">
          {data.products.map((p, index) => (
            <li key={index} className={classes.linkItem}>
              <Link
                className={classes.aItem}
                key={index}
                href={`product-manage/${p.product_ascii}`}
              >
                {p.product_name}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {!data.products.length && <p>No products jet...</p>}
    </>
  );
}
