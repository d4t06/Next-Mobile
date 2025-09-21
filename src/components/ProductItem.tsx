import { MyImage } from "@/components";
import TagItem from "./ui/TagItem";

type Props = {
  product: Product;
};

export default function ProductItem({ product }: Props) {
  return (
    <>
      <div className="flex group">
        <div className="w-16 h-16 rounded-md overflow-hidden">
          <MyImage
            alt=""
            width={60}
            height={60}
            className="w-full h-full object-cover"
            src={product.image_url}
          />
        </div>

        <div className="ml-3">
          <p className="font-semibold line-clamp-2 group-hover:underline">{product.product_name}</p>

          <div className="mt-1 flex flex-wrap gap-2">
            {product.product_tags.map((pT, i) => (
              <TagItem key={i} tag={pT.tag} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
