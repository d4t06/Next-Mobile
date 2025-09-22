"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import useTagAction from "../_hooks/useTagAction";
import { useToastContext } from "@/stores/ToastContext";
import { ModalContentWrapper, ModalHeader } from "@/components/modal";
import { Button, MyInput } from "@/components";
import { useModalContext } from "@/components/modal/Modal";
import { useCurrentCategoryContext } from "../../_components/CurrentCategoryContext";

type Props = {
  afterSubmit?: (tag: Tag) => void;
};

type Edit = {
  type: "edit";
  tag: Tag;
};

type Add = {
  type: "add";
  name?: string;
};

export default function AddTagModal({ afterSubmit, ...props }: (Add | Edit) & Props) {
  const { currentCategory } = useCurrentCategoryContext();
  const { closeModal } = useModalContext();

  const [name, setName] = useState(
    props.type === "add" ? props.name || "" : props.tag.name,
  );

  const { action, isFetching } = useTagAction();
  const { setErrorToast } = useToastContext();

  const inputRef = useRef<HTMLInputElement>(null);

  const ableToSubmit = !!name;

  const handleSubmit = async () => {
    try {
      if (!name.trim()) return;

      switch (props.type) {
        case "add":
          if (!currentCategory) return;

          const newTag = await action({
            type: "add",
            tag: {
              category_id: currentCategory.id,
              name,
            },
          });

          if (newTag && afterSubmit) afterSubmit(newTag);
          break;
        case "edit":
          await action({
            type: "edit",
            id: props.tag.id,
            name,
          });
          break;
      }
    } catch (error) {
      console.log(error);
      setErrorToast();
    } finally {
      closeModal();
    }
  };

  const classes = {
    inputGroup: "space-y-1",
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const title = props.type === "edit" ? `Edit '${props.tag.name}'` : `Add tag`;

  return (
    <ModalContentWrapper className="w-[450px]">
      <ModalHeader title={title} />

      <div className="space-y-3 overflow-auto mt-5">
        <div className={classes.inputGroup}>
          <label>Name</label>
          <MyInput
            ref={inputRef}
            value={name}
            cb={(e) => setName(e)}
            placeholder="name..."
          />
        </div>
      </div>

      <div className="text-right mt-10">
        <Button
          disabled={!ableToSubmit}
          loading={isFetching}
          onClick={() => ableToSubmit && handleSubmit()}
        >
          <CheckIcon className="w-6" />
          <p className="text-white">Ok</p>
        </Button>
      </div>
    </ModalContentWrapper>
  );
}
