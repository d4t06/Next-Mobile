"use client";

import HTMLConent from "@/components/RenderHTMLContent";

type Props = {
  product: Product;
};

export default function Description({ product }: Props) {
  return (
    <>
      <div className={`overflow-hidden`}>
        <div className="content prose">
          <HTMLConent content={product.description.content} />
        </div>
      </div>
    </>
  );
}
