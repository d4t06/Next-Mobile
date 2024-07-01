import AddProduct from "./_components/AddProduct";
import { getProductDetail } from "@/libs/getProductDetail";
import Frame from "@/components/ui/Frame";
import NoProduct from "@/components/NoProduct";
import { getAllCategories } from "@/libs/getAllCategory";
import ImageSection from "./_components/ImageSection";
import SpecSection from "./_components/SpecSection";
import HTMLReactParser from "html-react-parser/lib/index";

type Props = {
   searchParams: { q: string };
};

export default async function ComparePage({ searchParams: { q } }: Props) {
   const isValidQuery = !!q && q.split(",").length >= 2;
   if (!isValidQuery) return <AddProduct />;

   const ids = q.split(",");
   const products: Product[] = [];

   // get products
   for await (const id of ids) {
      if (Number.isNaN(id)) return <NoProduct />;

      const product = await getProductDetail(id);
      if (!product) return <NoProduct />;

      products.push(product);
   }

   const categories = await getAllCategories();
   const productCategory = categories?.find((c) => c.id === products[0].category_id);

   if (!productCategory) return <NoProduct />;

   // check products are same category
   products.forEach((p) => {
      if (p.category_id !== productCategory.id) return <NoProduct />;
   });

   const classes = {
      descContainer:
         "space-y-[14px] [&>p]:text-[#495057] [&>h5]:font-[500] [&>h5]:text-xl [&>img]:rounded-[8px] [&>img]:max-h-[350px] [&>img]:mx-auto",
   };

   return (
      <>
         <h1 className="text-lg sm:text-2xl font-[500] mb-[20px]">
            Compare {products[0].product_name} vs {products[1].product_name}
         </h1>
         <ImageSection products={products} />

         <div className="mt-[30px]">
            <Frame>
               <SpecSection category={productCategory} products={products} />
            </Frame>
         </div>

         <div className="flex mt-[30px]">
            {products.map((p, index) => (
               <div key={index} className="flex-1 mr-[10px] sm:mr-[14px]">
                  <div className={classes.descContainer}>
                     {HTMLReactParser(p.description.content || "")}
                  </div>
               </div>
            ))}
         </div>
      </>
   );
}
