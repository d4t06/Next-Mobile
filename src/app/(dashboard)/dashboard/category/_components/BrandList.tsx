"use client";

import Modal from "@/components/modal";
import AddItem from "@/components/modal/AddItem";
import Button from "@/components/ui/Button";
import { inputClasses } from "@/components/ui/MyInput";
import { useMemo, useState } from "react";
import useBrandAction from "../_hooks/useBrandAction";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { generateId } from "@/utils/appHelper";
import ConfirmModal from "@/components/modal/Confirm";
import { PlusIcon } from "@heroicons/react/16/solid";
import simonCat from "@/assets/search-empty.png";
import BrandListItem from "./BrandListItem";
import Gallery from "@/components/Gallery";

type Props = {
  categories: Category[];
};

export type BrandListModal = "add" | "edit-name" | "image" | "delete";

const classes = {
  label: "font-[500] text-[#333]",
};

export default function BrandList({ categories }: Props) {
  const [curCategoryIndex, setCurCategoryIndex] = useState<number>();
  const [currentBrandIndex, setCurrentBrandIndex] = useState<number>();
  const [openModal, setOpenModal] = useState<BrandListModal | "">("");

  const { isFetching, actions } = useBrandAction();

  const currentCategory = useMemo(
    () => (curCategoryIndex != undefined ? categories[curCategoryIndex] : undefined),
    [categories, curCategoryIndex],
  );

  const brandByCategory = useMemo(
    () => (currentCategory ? currentCategory.brands : []),
    [curCategoryIndex, categories],
  );

  const currentBrand = useMemo(
    () =>
      currentBrandIndex !== undefined ? brandByCategory[currentBrandIndex] : undefined,
    [categories, curCategoryIndex, currentBrandIndex],
  );

  const closeModal = () => setOpenModal("");

  const handleOpenModal = (i: number, modal: BrandListModal) => {
    setCurrentBrandIndex(i);
    setOpenModal(modal);
  };

  type Add = {
    type: "Add";
    value: string;
  };

  type Edit = {
    type: "Edit";
    value: string;
  };

  type ChangeImage = {
    type: "Edit-image";
    value: string;
  };

  type Delete = {
    type: "Delete";
  };

  const handleBrandActions = async (props: Add | Edit | ChangeImage | Delete) => {
    switch (props.type) {
      case "Add": {
        if (!currentCategory) return;

        const brandSchema: BrandSchema = {
          brand_name: props.value,
          brand_name_ascii: generateId(props.value),
          category_id: currentCategory.id,
          image_url: "",
        };

        await actions({
          type: "Add",
          brand: brandSchema,
        });

        break;
      }
      case "Edit": {
        if (!currentBrand) return;
        const brandSchema: BrandSchema = {
          ...currentBrand,
          brand_name: props.value,
          brand_name_ascii: generateId(props.value),
        };

        await actions({
          type: "Edit",
          brand: brandSchema,
          id: currentBrand.id,
        });

        break;
      }

      case "Edit-image": {
        if (!currentBrand) return;
        const brandSchema: BrandSchema = {
          ...currentBrand,
          image_url: props.value,
        };

        await actions({
          type: "Edit",
          brand: brandSchema,
          id: currentBrand.id,
        });

        break;
      }

      case "Delete": {
        if (!currentBrand) return;
        await actions({
          type: "Delete",
          id: currentBrand.id,
        });

        break;
      }
    }

    console.log("close modal");

    closeModal();
  };

  const renderModal = () => {
    if (!openModal) return;
    switch (openModal) {
      case "add":
        return (
          <AddItem
            loading={isFetching}
            title="Add brand"
            cbWhenSubmit={(value) => handleBrandActions({ type: "Add", value })}
            closeModal={closeModal}
          />
        );

      case "edit-name":
        if (!currentBrand) return;
        return (
          <AddItem
            loading={isFetching}
            initValue={currentBrand.brand_name}
            title={`Edit brand '${currentBrand.brand_name}'`}
            cbWhenSubmit={(value) => handleBrandActions({ type: "Edit", value })}
            closeModal={closeModal}
          />
        );

      case "image":
        if (!currentBrand) return;
        return (
          <Gallery
            setImageUrl={(images) =>
              handleBrandActions({ type: "Edit-image", value: images[0].image_url })
            }
            closeModal={closeModal}
          />
        );
      case "delete":
        if (!currentBrand) return;

        return (
          <ConfirmModal
            callback={() => handleBrandActions({ type: "Delete" })}
            loading={isFetching}
            closeModal={closeModal}
            label={`Delete category '${currentBrand.brand_name}'`}
          />
        );

      default:
        return <h1 className="text-3xl">Not thing to show</h1>;
    }
  };

  return (
    <>
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
          className="space-x-1"
          border={"clear"}
          disabled={!currentCategory}
          onClick={() => setOpenModal("add")}
        >
          <PlusIcon className="w-[22px]" />
          <span className="hidden sm:block">Add brand</span>
        </Button>
      </div>

      <div
        className={`mt-[4px] flex flex-wrap items-start ml-[-10px] ${
          false ? "disable" : ""
        }`}
      >
        {currentCategory && (
          <>
            {brandByCategory.length ? (
              brandByCategory.map((brand, index) => (
                <BrandListItem
                  brand={brand}
                  openModal={(m) => handleOpenModal(index, m)}
                  key={index}
                />
              ))
            ) : (
              <p className="text-center w-full mt-[10px]">¯\_(ツ)_/¯</p>
            )}
          </>
        )}
      </div>

      {!!openModal && <Modal closeModal={closeModal}>{renderModal()}</Modal>}
    </>
  );
}
