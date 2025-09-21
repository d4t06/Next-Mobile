import AddProduct from "./_components/AddProduct";
import { getProductDetail } from "@/libs/getProductDetail";
import Frame from "@/components/ui/Frame";
import NoProduct from "@/components/NoProduct";
import { getAllCategories } from "@/libs/getAllCategory";
import ImageSection from "./_components/ImageSection";
import SpecSection from "./_components/SpecSection";
import DescriptionSection from "./_components/DescSectiont";

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
   let title = 'Compare '
   products.forEach((p, index) => {
      
      title += `${p.product_name}`
      if (index < products.length - 1) title += ' vs '
      if (p.category_id !== productCategory.id) return <NoProduct />;
   });

   return (
      <>
         <h1 className="text-lg sm:text-xl font-[500] mb-[20px]">
            {title}
         </h1>
         <ImageSection products={products} />

         <div className="mt-[30px]">
            <Frame>
               <SpecSection category={productCategory} products={products} />
            </Frame>
         </div>

        <DescriptionSection products={products} />
      </>
   );
}
