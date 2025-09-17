import HTMLConent from "@/components/RenderHTMLContent";
import ImageModalAndMagnifier from "./ImageModalAndMagnifier";

type Props = {
  product: Product;
};

export default function DescriptionSection({ product }: Props) {
  return (
    <>
      <div className="content prose">
        <HTMLConent content={product.description.content} />
      </div>

      <ImageModalAndMagnifier />
    </>
  );
}
