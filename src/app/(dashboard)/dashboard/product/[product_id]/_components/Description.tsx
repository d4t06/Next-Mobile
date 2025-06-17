"use client";

import HTMLReactParser from "html-react-parser/lib/index";

type Props = {
  product: Product;
};

export default function Description({ product }: Props) {
  return (
    <>
      <div className={`overflow-hidden`}>
        <div className="content [&>*]:mt-5 [&>p]:text-[#495057] [&>h5]:font-[500] [&>h5]:text-xl [&>img]:rounded-[8px] sm:[&>img]:max-w-[80%] [&>img]:mx-auto">
          {HTMLReactParser(product.description.content || "")}
        </div>
      </div>
    </>
  );
}
