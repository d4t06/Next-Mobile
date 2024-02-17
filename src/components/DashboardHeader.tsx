import Link from "next/link";

export default function DashboardHeader() {
  const classes = {
    container:
      "flex h-[40px] space-x-[10px]  text-white items-center bg-[#cd1818] rounded-[12px] px-[20px]",
    item: "font-[500]",
  };

  return (
    <div className={classes.container}>
      <Link className={classes.item} href={"/dashboard/product-manage"}>Product</Link>
      <Link className={classes.item} href={"/dashboard/category-manage"}>Category</Link>
    </div>
  );
}
