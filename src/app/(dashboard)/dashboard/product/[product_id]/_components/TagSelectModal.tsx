import { Button, NotFound } from "@/components";
import { Modal, ModalContentWrapper, ModalHeader, ModalRef } from "@/components/modal";
import { useEffect, useRef, useState } from "react";
import useSearchTag from "../../../tag/_hooks/useSearchTag";
import Searchbar from "@/components/dashboard/SearchBar";
import { PlusIcon } from "@heroicons/react/24/outline";
import AddTagModal from "../../../tag/_components/AddTagModal";
import TagItem from "@/components/ui/TagItem";

type Props = {
  choose: (tags: Tag[]) => void;
  tags: Tag[];
  current: Tag[];
  loading?: boolean;
};
export default function TagSelectModal({ current, loading, choose, tags }: Props) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const modalRef = useRef<ModalRef>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { value, setValue, _tags } = useSearchTag({ tags });

  const selectTag = (tag: Tag) => {
    const newSongs = [...selectedTags];
    const index = newSongs.findIndex((s) => s.id === tag.id);

    if (index === -1) newSongs.push(tag);
    else newSongs.splice(index, 1);

    setSelectedTags(newSongs);
  };

  useEffect(() => {
    inputRef.current?.focus();

    setSelectedTags(current);
  }, []);

  return (
    <>
      <ModalContentWrapper>
        <ModalHeader title="Tags" />
        <Searchbar
          inputRef={inputRef}
          value={value}
          setValue={setValue}
          handleSubmit={() => {}}
        />

        <div className="flex flex-wrap mt-5 gap-2 overflow-y-auto">
          {_tags.length ? (
            _tags.map((t, i) => {
              const isSelected = selectedTags.find((_t) => _t.id === t.id);

              return (
                <button key={i} onClick={() => selectTag(t)}>
                  <TagItem tag={t} className={`text-base ${isSelected ? "text-red-500" : ""}`} />
                </button>
              );
            })
          ) : (
            <>
              <NotFound className="mx-auto" variant="less" />

              <p className="text-center w-full">
                <Button onClick={() => modalRef.current?.open()}>
                  <PlusIcon className="w-6" />
                  <span>Add new tag</span>
                </Button>
              </p>
            </>
          )}
        </div>
        <p className="text-right mt-5">
          <Button loading={loading} onClick={() => choose(selectedTags)}>
            <span>Submit</span>
          </Button>
        </p>
      </ModalContentWrapper>

      <Modal ref={modalRef}>
        <AddTagModal name={value} type="add" />
      </Modal>
    </>
  );
}
