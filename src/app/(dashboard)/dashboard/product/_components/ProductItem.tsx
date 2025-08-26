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
        <Image
          alt=""
          className="rounded-[6px]"
          width={60}
          height={60}
          src={
            product.image_url ||
            "https://d4t06.github.io/HD-Chat/assets/search-empty-ChRLxitn.png"
          }
        />
        <p className="font-bold ml-2 line-clamp-2">{product.product_name}</p>
      </Link>
    </>
  );
}
