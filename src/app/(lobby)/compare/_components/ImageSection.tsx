import MyImage from "@/components/ui/MyImage";

type Props = {
   products: Product[];
};

export default function ImageSection({ products }: Props) {
   const classes = {
      proName: "text-sm sm:text-base text-center mt-auto pt-[14px] font-[500] text-[#333] leading-[1]",
   };

   return (
      <>
         <div className="flex">
            <div className="w-1/5 sm:w-1/6"></div>
            {products.map((p, index) => (
               <div key={index} className="flex-1 flex flex-col">
                  <MyImage
                     src={p?.image_url || ""}
                     className="max-h-[200px] w-auto mx-auto"
                     width={200}
                     height={200}
                     alt=""
                  />
                  <h1 className={classes.proName}>{p?.product_name}</h1>
               </div>
            ))}
         </div>
      </>
   );
}
