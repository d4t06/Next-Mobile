"use client";

import Gallery from "@/components/Gallery";
import { Modal, ModalRef } from "@/components/modal";
import Button from "@/components/ui/Button";
import { Content, Editor } from "@tiptap/react";
import { useRef } from "react";

type Props = {
  editor: Editor | null;
  isChange: boolean;
  submit: (value: string) => void;
  isLoading?: boolean;
};

export default function EditToolbar({ editor, isLoading, isChange, ...props }: Props) {
  const modalRef = useRef<ModalRef>(null);

  const closeModal = () => modalRef.current?.close();

  const handleAddImage = (imageList: ImageType[]) => {
    if (!editor) return;
    const imageContents: Content[] = imageList.map((i) => ({
      type: "image",
      attrs: {
        src: i.image_url,
      },
    }));

    editor.chain().focus().insertContent(imageContents).run();
  };

  const handleSubmit = async () => {
    if (!editor) return;
    const content = editor.getHTML();

    props.submit(content);
  };

  if (!editor) return <></>;

  const classes = {
    left: "flex mt-[-8px] ml-[-8px] flex-wrap [&_button]:px-[6px] [&_button]:mt-[8px] [&_button]:ml-[8px] [&_button]:font-[500] [&_button]:py-[3px] [&_button.active]:bg-white [&_button.active]:text-[#cd1818] [&_button.active]:rounded-[6px] ",
  };

  return (
    <>
      <div
        className={`${isLoading ? "disabled" : ""} bg-[#cd1818] text-white flex  justify-between items-center p-[10px] `}
      >
        <div className={`${classes.left}`}>
          <button
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={editor.isActive("paragraph") ? "active" : ""}
          >
            paragraph
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
            className={editor.isActive("heading", { level: 5 }) ? "active" : ""}
          >
            h5
          </button>
          <button onClick={() => modalRef.current?.open()}>image</button>
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
          >
            undo
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
          >
            redo
          </button>
        </div>
        <div className="ml-auto">
          <Button
            size={"clear"}
            colors={"second"}
            className="text-sm px-2 py-1"
            onClick={handleSubmit}
            disabled={!isChange}
          >
            save
          </Button>
        </div>
      </div>

      <Modal ref={modalRef}>
        <Gallery
          closeModal={closeModal}
          multiple
          setImageUrl={(images) => handleAddImage(images)}
        />
      </Modal>
    </>
  );
}
