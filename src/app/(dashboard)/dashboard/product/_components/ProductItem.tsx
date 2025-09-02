"use client";

import Image from "next/image";
import Link from "next/link";

type Props = {
  product: Product;
};

export default function ProductItem({ product }: Props) {
  return (
    <>
      <Link className="flex" href={`/dashboard/product/${product.id}`}>
        <div className="w-12 h-12 rounded-md overflow-hidden">
          <Image
            alt=""
            width={60}
            height={60}
            className="w-full h-full object-cover"
            src={
              product.image_url ||
              "https://d4t06.github.io/HD-Chat/assets/search-empty-ChRLxitn.png"
            }
          />
        </div>

        <p className="font-semibold ml-2 line-clamp-2">{product.product_name}</p>
      </Link>
    </>
  );
}
