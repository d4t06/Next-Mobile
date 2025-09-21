import Frame from "@/components/ui/Frame";
import SpecificationCta from "./SpecificationCta";
import { MyImage } from "@/components";
import TagItem from "@/components/ui/TagItem";

type Props = {
  product: Product;
  productCategory: Category;
};

export default async function SpecificationSection({ product, productCategory }: Props) {
  const attributeOrderArray = productCategory
    ? productCategory.attribute_order.split("_")
    : [];

  const classes = {
    proName: "sm:text-xl text-center my-4 font-bold leading-[1]",
    detailLeft: "w-full sm:w-1/3 px-2 flex-shrink-0",
    td: "text-sm px-3 py-1",
  };

  return (
    <>
      <Frame>
        <SpecificationCta product={product} />
        <MyImage
          src={product.image_url}
          className="max-w-[200px] rounded-lg mx-auto mt-3"
          width={120}
          height={120}
          alt=""
        />

        <h1 className={classes.proName}>{product.product_name}</h1>

        <table className="spec-table">
          <tbody>
            {attributeOrderArray.map((id, index) => {
              const categoryAttribute = productCategory.attributes.find(
                (catAtt) => catAtt.id === +id,
              );
              if (categoryAttribute === undefined) return;
              const foundedValue = product.attributes.find(
                (attr) => attr.category_attribute_id == categoryAttribute.id,
              );

              return (
                <tr className="group" key={index}>
                  <td className={`${classes.td} `}>{categoryAttribute.attribute_name}</td>
                  <td className={`${classes.td} `}>{foundedValue?.value || "..."}</td>
                </tr>
              );
            })}

            <tr>
              <td>Tags</td>
              <td>
                <div className="flex flex-wrap gap-1">
                  {product.product_tags.map((pT, i) => (
                    <TagItem key={i} tag={pT.tag} />
                  ))}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </Frame>
    </>
  );
}
