"use client";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";

import { generateId } from "@/utils/appHelper";
import { PlusIcon } from "@heroicons/react/16/solid";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import AddItem from "@/components/modal/AddItem";
import ConfirmModal from "@/components/modal/Confirm";
import { inputClasses } from "./ui/MyInput";
import Button from "@/components/ui/Button";
import Modal from "@/components/modal";
import { publicRequest } from "@/utils/request";
import { useRouter } from "next/navigation";
import { useToast } from "@/stores/ToastContext";
import DragAbleItem from "./DragAbleItem";
import Frame from "./ui/Frame";

type Props = {
  categories: Category[];
};
type ModalTarget = "add-attr" | "edit-attr" | "delete-attr";

const CAT_ATTR_URL = "/categories/attributes";
const CAT_URL = "/categories";

function CategoryAttributeGroup({ categories }: Props) {
  const [curCategory, setCurCategory] = useState<Category | undefined>();
  const [curCategoryAttrs, setCurCategoryAttrs] = useState<CategoryAttribute[]>(
    []
  );
  const [curCategoryIndex, setCurCategoryIndex] = useState<number>();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isDrag, setIsDrag] = useState(false);

  const openModalTarget = useRef<ModalTarget | "">("");
  const curAttr = useRef<CategoryAttribute>();
  const endIndexRef = useRef<number>(0);

  //  hooks
  const router = useRouter();
  const { setSuccessToast, setErrorToast } = useToast();
  const [isPending, startTransition] = useTransition();

  const isLoading = isFetching || isPending;

  const handleAddAttr = async (value: string, type: "Add" | "Edit") => {
    if (curCategory?.id === undefined)
      throw new Error("curCategory.id is undefined");

    const newCatAttr: CategoryAttributeSchema = {
      attribute_name: value,
      attribute_ascii: generateId(value),
      category_id: curCategory?.id,
    };

    try {
      setIsFetching(true);

      switch (type) {
        case "Add":
          await publicRequest.post(CAT_ATTR_URL, newCatAttr);

          startTransition(() => {
            router.refresh();
            setSuccessToast(`Attribute ${newCatAttr.attribute_name} added`);
          });

          break;

        case "Edit":
          if (curAttr.current === undefined) return;
          const { category_id, ...updateData } = newCatAttr;
          await publicRequest.put(
            `${CAT_ATTR_URL}/${curAttr.current.id}`,
            updateData
          );

          startTransition(() => {
            router.refresh();
            setSuccessToast(`Update attribute successful`);
          });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
      setIsOpenModal(false);
    }
  };

  const handleDeleteAttr = async () => {
    if (curAttr.current == undefined) return;
    try {
      setIsFetching(true);

      await publicRequest.delete(`${CAT_ATTR_URL}/${curAttr.current.id}`);

      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
      setIsOpenModal(false);
    }
  };

  const handleSortAttrs = async (startIndex: number) => {
    if (!curCategory) return setErrorToast();

    if (startIndex === endIndexRef.current) return;

    const newList = [...curCategoryAttrs];

    const needToInsertItem = newList[startIndex];
    newList.splice(startIndex, 1);

    console.log("check start, end", startIndex, endIndexRef.current);

    for (let i = newList.length - 1; i >= endIndexRef.current; i--) {
      newList[i + 1] = newList[i];
    }

    newList[endIndexRef.current] = needToInsertItem;

    // newList[endIndexRef.current] = needToInsertItem;
    console.log("check new list", newList);
    setCurCategoryAttrs(newList);

    let newOrder = "";
    newList.forEach(
      (item, index) =>
        (newOrder +=
          index == 0 ? item.attribute_ascii : `_${item.attribute_ascii}`)
    );

    try {
      setIsFetching(true);
      await publicRequest.put(`${CAT_URL}/${curCategory.id}`, {
        attributes_order: newOrder,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleOpenModal = (
    target: typeof openModalTarget.current,
    attr?: CategoryAttribute
  ) => {
    openModalTarget.current = target;
    switch (target) {
      case "edit-attr":
      case "delete-attr":
        curAttr.current = attr;
        // curAttrIndex.current = index ?? undefined;
        break;
    }
    setIsOpenModal(true);
  };

  const renderModal = () => {
    if (!isOpenModal) return;

    switch (openModalTarget.current) {
      case "add-attr":
        if (!curCategory)
          return <p className="text-[16px]">Current category not found</p>;
        return (
          <AddItem
            loading={isLoading}
            title="Add attribute"
            cbWhenSubmit={(value) => handleAddAttr(value, "Add")}
            setIsOpenModal={setIsOpenModal}
          />
        );
      case "edit-attr":
        if (curAttr === undefined) return <h1>Index not found</h1>;

        const initValue = curAttr.current?.attribute_name;
        return (
          <AddItem
            loading={isLoading}
            title={`Edit attribute '${initValue}'`}
            cbWhenSubmit={(value) => handleAddAttr(value, "Edit")}
            setIsOpenModal={setIsOpenModal}
            initValue={initValue}
          />
        );

      case "delete-attr":
        if (curAttr === undefined) return <h1>Index not found</h1>;

        return (
          <ConfirmModal
            callback={handleDeleteAttr}
            loading={isLoading}
            setOpenModal={setIsOpenModal}
            label={`Delete attribute '${curAttr.current?.attribute_name}'`}
          />
        );

      default:
        return <h1 className="text-3xl">Not thing to show</h1>;
    }
  };

  useEffect(() => {
    if (curCategoryIndex === undefined) return;
    const curCategory = categories[curCategoryIndex];

    if (curCategory) {
      setCurCategory(categories[curCategoryIndex]);
      setCurCategoryAttrs(curCategory.attributes);
    }
  }, [categories, curCategoryIndex]);

  const classes = {
    label: "font-[500] text-[#333]",
    attrItem:
      " bg-[#f1f1f1] px-[18px] py-[8px] border-[2px] border-[#ccc] rounded-[8px]",
    cta: "ml-[10px] pl-[10px] border-[#ccc] border-l-[1px] flex items-center space-x-[4px] text-[#333]",
  };

  return (
    <div className="mt-[10px]">
      <Frame>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-[10px]">
            <p className={classes.label}>Category: </p>
            <div className="bg-[#ccc] rounded-[12px]">
              <select
                disabled={!categories.length}
                className={`${inputClasses.input} min-w-[100px]`}
                name="category"
                onChange={(e) => setCurCategoryIndex(+e.target.value)}
              >
                <option value={undefined}>---</option>
                {!!categories.length &&
                  categories.map((category, index) => (
                    <option key={index} value={index}>
                      {category.category_name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <Button
            disabled={!curCategory}
            variant={"push"}
            onClick={() => handleOpenModal("add-attr")}
          >
            Add attribute
          </Button>
        </div>

        <div
          className={`mt-[14px] flex flex-wrap items-start gap-[10px] ${
            false ? "disable" : ""
          }`}
        >
          {curCategoryAttrs.length ? (
            curCategoryAttrs.map((attr, index) => (
              <DragAbleItem
                index={index}
                key={index}
                className={`${classes.attrItem} ${
                  isLoading ? "opacity-60 pointer-events-none" : ""
                }`}
                setIsDrag={setIsDrag}
                isDrag={isDrag}
                handleDragEnd={() => handleSortAttrs(index)}
                endIndexRef={endIndexRef}
              >
                <div className="flex">
                  <span className="text-[14px]">{attr.attribute_name}</span>
                  <div className={classes.cta}>
                    <button
                      className="hover:text-[#cd1818]"
                      onClick={() => handleOpenModal("delete-attr", attr)}
                    >
                      <TrashIcon className="w-[22px]" />
                    </button>
                    <button
                      className="hover:text-[#cd1818]"
                      onClick={() => handleOpenModal("edit-attr", attr)}
                    >
                      <PencilSquareIcon className="w-[22px]" />
                    </button>
                  </div>
                </div>
              </DragAbleItem>
            ))
          ) : (
            <p>No have attribute jet...</p>
          )}
        </div>
      </Frame>

      {isOpenModal && (
        <Modal setShowModal={setIsOpenModal}>{renderModal()}</Modal>
      )}
    </div>
  );
}

export default CategoryAttributeGroup;
