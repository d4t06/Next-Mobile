import LinkItem from "./LinkItem";

export default function DashboardHeader() {
  const classes = {
    container:
      "flex h-[40px] space-x-[10px] text-white items-center bg-[#cd1818] rounded-[8px] px-[20px]",
    item: "font-[500]",
    linkItemActive: 'font-[600]'
  };

  return (
    <div className={classes.container}>
      <LinkItem activeClass={classes.linkItemActive} href={"/dashboard/product-manage"}>Product</LinkItem>
      <LinkItem activeClass={classes.linkItemActive} href={"/dashboard/category-manage"}>Category</LinkItem>
    </div>
  );
}
