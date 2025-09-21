import { Title } from "@/components";
import { getAllCategories } from "@/libs/getAllCategory";

type Props = {
  categoryId: string;
};

export default async function CategoryLabel({ categoryId }: Props) {
  const categories = await getAllCategories();
  const currentCategory = categories?.find((c) => c.id === +categoryId);

  if (!currentCategory) return <></>;

  return <Title title={currentCategory.category_name} />;
}
