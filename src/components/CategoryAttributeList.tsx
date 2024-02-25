"use client";
import { useEffect, useRef, useState } from "react";

import { generateId } from "@/utils/appHelper";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import AddItem from "@/components/modal/AddItem";
import ConfirmModal from "@/components/modal/Confirm";
import { inputClasses } from "./ui/MyInput";
import Button from "@/components/ui/Button";
import Modal from "@/components/modal";
import { useToast } from "@/stores/ToastContext";
import DragAbleItem from "./DragAbleItem";
import Frame from "./ui/Frame";
import useCategory from "@/hooks/useCategory";

type Props = {
  categories: Category[];
};
type ModalTarget = "add-attr" | "edit-attr" | "delete-attr";

function CategoryAttributeGroup({ categories }: Props) {
  const [curCategory, setCurCategory] = useState<Category | undefined>();
  const [curCategoryIndex, setCurCategoryIndex] = useState<number>();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isDrag, setIsDrag] = useState(false);

  const openModalTarget = useRef<ModalTarget | "">("");
  const curAttr = useRef<CategoryAttribute>();
  const endIndexRef = useRef<number>(0);

  //  hooks
  const { setErrorToast } = useToast();
  const {
    isPending,
    addCatAttribute,
    updateCatAttribute,
    deleteCatAttribute,
    sortAttribute,
  } = useCategory();

  const isLoading = isFetching || isPending;
  const attributeOrder = curCategory
    ? curCategory.attributes_order.split("_")
    : [];

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
          await addCatAttribute(newCatAttr, curCategory);
          break;

        case "Edit":
          if (curAttr.current === undefined) return;
          await updateCatAttribute(curAttr.current, newCatAttr, curCategory);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
      setIsOpenModal(false);
    }
  };

  const handleDeleteAttr = async () => {
    if (curAttr.current == undefined || curCategory === undefined) return;
    try {
      setIsFetching(true);

      await deleteCatAttribute(curAttr.current, curCategory);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
      setIsOpenModal(false);
    }
  };

  const handleSortAttrs = async (startIndex: number) => {
    if (!curCategory) return setErrorToast();

    try {
      setIsFetching(true);
      await sortAttribute(startIndex, endIndexRef.current, curCategory);
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
      setCurCategory(curCategory);
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
          {curCategory && (
            <>
              {attributeOrder.length ? (
                attributeOrder.map((item, index) => {
                  const foundedCatAttribute = curCategory.attributes.find(
                    (attr) => attr.attribute_ascii === item
                  );
                  if (!foundedCatAttribute) return <p>Wrong index</p>;

                  return (
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
                        <span className="text-[14px]">
                          {foundedCatAttribute.attribute_name}
                        </span>
                        <div className={classes.cta}>
                          <button
                            className="hover:text-[#cd1818]"
                            onClick={() =>
                              handleOpenModal(
                                "delete-attr",
                                foundedCatAttribute
                              )
                            }
                          >
                            <TrashIcon className="w-[22px]" />
                          </button>
                          <button
                            className="hover:text-[#cd1818]"
                            onClick={() =>
                              handleOpenModal("edit-attr", foundedCatAttribute)
                            }
                          >
                            <PencilSquareIcon className="w-[22px]" />
                          </button>
                        </div>
                      </div>
                    </DragAbleItem>
                  );
                })
              ) : (
                <p>No have attribute jet...</p>
              )}
            </>
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
