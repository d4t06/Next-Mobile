"use client";

import Gallery from "@/components/Gallery";
import Modal from "@/components/modal";
import Button from "@/components/ui/Button";
import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/16/solid";
import { Content, Editor } from "@tiptap/react";
import { useState } from "react";

type Props = {
   editor: Editor | null;
   isChange: boolean;
   isLock: boolean;
   toggleLock: () => void;
   cb: (value: string) => Promise<void>;
};

export default function Toolbar({ editor, cb, isChange, isLock, toggleLock }: Props) {
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

   const classes = {
      left: "flex mt-[-8px] ml-[-8px] flex-wrap [&_button]:px-[6px] [&_button]:mt-[8px] [&_button]:ml-[8px] [&_button]:font-[500] [&_button]:py-[3px] [&_button.active]:bg-white [&_button.active]:text-[#cd1818] [&_button.active]:rounded-[6px] ",
      right: "right flex flex-col space-y-[8px] sm:space-x-[8px] sm:space-y-0 sm:flex-row items-center",
   };

   return (
      <>
         <div
            className={`bg-[#cd1818] text-white flex  justify-between items-center p-[10px] `}
         >
            <div className={`${classes.left} ${isLock ? "disabled" : ""}`}>
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
            <div className={classes.right}>
               <Button
                  size={"clear"}
                  colors={"second"}
                  className="text-[14px] px-[9px] py-[3px]"
                  onClick={handleSubmit}
                  disabled={!isChange}
               >
                  save
               </Button>

               <button onClick={toggleLock}>
                  {isLock ? (
                     <LockClosedIcon className="w-[20px]" />
                  ) : (
                     <LockOpenIcon className="w-[20px]" />
                  )}
               </button>
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
