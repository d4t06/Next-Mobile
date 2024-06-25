"use client";

import Gallery from "@/components/Gallery";
import Modal from "@/components/modal";
import Button from "@/components/ui/Button";
import { Content, Editor } from "@tiptap/react";
import { useState } from "react";

type Props = {
   editor: Editor | null;
   isChange: boolean;
   cb: (value: string) => Promise<void>;
};

export default function Toolbar({ editor, cb, isChange }: Props) {
   const [isOpenModal, setIsOpenModal] = useState(false);
   const closeModal = () => setIsOpenModal(false);

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

      await cb(content);
   };

   if (!editor) return <></>;

   return (
      <>
         <div
            className={`bg-[#cd1818] text-white flex  justify-between items-center h-[50px] px-[10px] `}
         >
            <div className="left flex gap-[8px] [&_button]:px-[6px] [&_button]:font-[500] [&_button]:py-[3px] [&_button.active]:bg-white [&_button.active]:text-[#cd1818] [&_button.active]:rounded-[6px] ">
               <button
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  disabled={!editor.can().chain().focus().toggleBold().run()}
                  className={editor.isActive("bold") ? "active" : ""}
               >
                  bold
               </button>
               <button
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  disabled={!editor.can().chain().focus().toggleItalic().run()}
                  className={editor.isActive("italic") ? "active" : ""}
               >
                  italic
               </button>
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
               <button onClick={() => setIsOpenModal(true)}>image</button>
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
            <div className="right flex gap-[8px]">
               <Button
                  size={"clear"}
                  colors={"second"}
                  className="text-[14px] px-[9px] py-[3px]"
                  onClick={handleSubmit}
                  disabled={!isChange}
               >
                  save
               </Button>
            </div>
         </div>

         {isOpenModal && (
            <Modal closeModal={closeModal}>
               <Gallery
                  closeModal={closeModal}
                  multiple
                  setImageUrl={(images) => handleAddImage(images)}
               />
            </Modal>
         )}
      </>
   );
}
