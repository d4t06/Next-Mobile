import { MyImage } from "@/components";
import TagItem from "./ui/TagItem";
import Link from "next/link";

type Props = {
  product: Product;
  href: string;
  image_url?: string;
};

export default function ProductItem({ product, image_url, href }: Props) {
  return (
    <>
      <div className="flex">
        <div className="w-24 h-16 rounded-md overflow-hidden">
          <MyImage
            alt=""
            width={96}
            height={64}
            className="w-full h-full object-contain"
            src={image_url || product.image_url}
          />
        </div>

        <div className="ml-1">
          <div className="flex flex-col sm:flex-row sm:items-center items-start">
            <Link href={href} className="font-semibold line-clamp-1 hover:underline flex-shrink-0">
              {product.product_name}
            </Link>

            <div className="sm:ml-2 flex flex-wrap gap-1">
              {product.product_tags.map((pT, i) => (
                <TagItem key={i} tag={pT.tag} />
              ))}
            </div>
          </div>

          <div className="faded-text text-sm mt-1 sm:mt-0">
            {product.features.map((f, i) => (
              <p key={i}>{f.value}</p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
