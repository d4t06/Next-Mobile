import { runRevalidateTag } from "@/app/actions";
import { useToast } from "@/stores/ToastContext";
import { publicRequest } from "@/utils/request";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const CAT_ATTR_URL = "/categories/attributes";
const CAT_URL = "/categories";

export default function useCategory() {
  const [isPending, startTransition] = useTransition();
  const { setSuccessToast } = useToast();
  const router = useRouter();

  const addCategory = async (category: CategorySchema) => {
    try {
      await publicRequest.post(CAT_URL, category);

      startTransition(() => {
        runRevalidateTag("/categories");
        setSuccessToast(`Category '${category.category_name}' added`);
      });
    } catch (error) {}
  };

  const updateCategory = async (
    curCategory: Category,
    newCategory: CategorySchema
  ) => {
    await publicRequest.put(`${CAT_URL}/${curCategory.id}`, newCategory);

    startTransition(() => {
      runRevalidateTag("/categories");
      setSuccessToast(`Update category successful`);
    });
  };

  const deleteCategory = async (id: number) => {
    await publicRequest.delete(`${CAT_URL}/${id}`);

    startTransition(() => {
      router.refresh();
      runRevalidateTag("/categories");
    });
  };

  const addCatAttribute = async (
    catAttribute: CategoryAttributeSchema,
    curCategory: Category
  ) => {
    await publicRequest.post(CAT_ATTR_URL, catAttribute);

    const newAttributeOrder =
      curCategory.attributes_order + `_${catAttribute.attribute_ascii}`;

    await publicRequest.put(`${CAT_URL}/${curCategory.id}`, {
      attributes_order: newAttributeOrder,
    });

    startTransition(async () => {
      router.refresh();
      setSuccessToast(`Attribute ${catAttribute.attribute_name} added`);
      runRevalidateTag(`category-${curCategory.category_ascii}`);
    });
  };

  const updateCatAttribute = async (
    curCatAttribute: CategoryAttribute,
    newCatAttribute: CategoryAttributeSchema,
    curCategory: Category
  ) => {
    if (curCatAttribute === undefined) return setSuccessToast();

    const { category_id, ...updateData } = newCatAttribute;

    const newAttributeOrder = curCategory.attributes_order.replace(
      curCatAttribute.attribute_ascii,
      newCatAttribute.attribute_ascii
    );

    await publicRequest.put(`${CAT_URL}/${curCategory.id}`, {
      attributes_order: newAttributeOrder,
    } as Partial<Category>);

    await publicRequest.put(
      `${CAT_ATTR_URL}/${curCatAttribute.id}`,
      updateData
    );

    startTransition(async () => {
      router.refresh();
      setSuccessToast(`Update attribute successful`);
      runRevalidateTag(`category-${curCategory.category_ascii}`);
    });
  };

  const deleteCatAttribute = async (
    curCatAttribute: CategoryAttribute,
    curCategory: Category
  ) => {
    try {
      const curAttributeOrder = curCategory.attributes_order;
      let newAttributeOrder = "";

      // if last index
      if (curAttributeOrder.includes(`_${curCatAttribute.attribute_ascii}`)) {
        newAttributeOrder = curAttributeOrder.replace(
          `_${curCatAttribute.attribute_ascii}`,
          ""
        );
      } else
        newAttributeOrder = curAttributeOrder.replace(
          `${curCatAttribute.attribute_ascii}_`,
          ""
        );

      await publicRequest.put(`${CAT_URL}/${curCategory.id}`, {
        attributes_order: newAttributeOrder,
      });
      await publicRequest.delete(`${CAT_ATTR_URL}/${curCatAttribute.id}`);

      startTransition(async () => {
        // await testRevalidate();
        // runRevalidateTag("/categories/attributes");
        router.refresh();
        setSuccessToast(`Delete attribute successful`);
        runRevalidateTag(`category-${curCategory.category_ascii}`);
      });
    } catch (error) {}
  };

  const sortAttribute = async (
    startIndex: number,
    endIndex: number,
    curCategory: Category
  ) => {
    if (startIndex === endIndex) return;
    const newList = [...curCategory.attributes];

    const needToInsertItem = newList[startIndex];
    newList.splice(startIndex, 1);

    console.log("check start, end", startIndex, endIndex);

    for (let i = newList.length - 1; i >= endIndex; i--) {
      newList[i + 1] = newList[i];
    }

    newList[endIndex] = needToInsertItem;

    let newOrder = "";
    newList.forEach(
      (item, index) =>
        (newOrder +=
          index == 0 ? item.attribute_ascii : `_${item.attribute_ascii}`)
    );

    await publicRequest.put(`${CAT_URL}/${curCategory.id}`, {
      attributes_order: newOrder,
    });

    startTransition(async () => {
      // await testRevalidate();
      router.refresh();
      runRevalidateTag(`category-${curCategory.category_ascii}`);
    });
  };

  return {
    isPending,
    addCatAttribute,
    updateCatAttribute,
    deleteCatAttribute,
    sortAttribute,
    addCategory,
    updateCategory,
    deleteCategory,
  };
}
