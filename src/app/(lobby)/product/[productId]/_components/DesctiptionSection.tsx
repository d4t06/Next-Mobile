import HTMLConent from "@/components/RenderHTMLContent";
import ImageModalAndMagnifier from "./ImageModalAndMagnifier";

type Props = {
  product: Product;
};

export default function DescriptionSection({ product }: Props) {
  return (
    <>
      <div className="content [&>*]:mt-5 [&>h5]:font-bold [&>h5]:text-xl [&>img]:rounded-[8px] sm:[&>img]:max-w-[80%] [&>img]:mx-auto">
        <HTMLConent content={product.description.content} />
      </div>

      <ImageModalAndMagnifier />
    </>
  );
}
