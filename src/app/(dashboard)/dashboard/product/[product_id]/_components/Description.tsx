"use client";

import { Title } from "@/components";
import HTMLConent from "@/components/RenderHTMLContent";
import EditDescriptionBtn from "./EditDescriptionBtn";
import { useCurrentProductContext } from "../CurrentProductContext";

export default function Description() {
  const { product } = useCurrentProductContext();

  return (
    <>
      <div className="flex justify-between items-center">
        <Title title="Description" variant={"h2"} />
        <EditDescriptionBtn product={product} />
      </div>

      <div className={`overflow-hidden`}>
        <div className="content prose">
          <HTMLConent content={product.description.content} />
        </div>
      </div>
    </>
  );
}
