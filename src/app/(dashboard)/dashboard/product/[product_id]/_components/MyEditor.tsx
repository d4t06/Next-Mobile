"use client";

import { EditorContent, EditorOptions, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { useState } from "react";
import Toolbar from "./MyToolbar";

interface Props extends Partial<EditorOptions> {
   cb: (value: string, resetChange: () => void) => Promise<void>;
   className: string;
}

export default function MyEditor({ extensions, className, cb, ...props }: Props) {
   const [isChange, setIsChange] = useState(false);

   const editor = useEditor({
      extensions: [StarterKit, Image],
      onUpdate: () => setIsChange(true),
      ...props,
   });

   const restChangeState = () => setIsChange(false);

   const handleSubmit = async (value: string) => {
      await cb(value, restChangeState);
   };

   const classes = {
      wrapper: "my-editor border border-black/10 bg-white rounded-[12px] overflow-hidden",
      editContainer: "max-h-[70vh] overflow-auto editor-container",
   };

   return (
      <div className={`${classes.wrapper} ${className || ""}`}>
         <Toolbar isChange={isChange} cb={handleSubmit} editor={editor} />
         <div className={classes.editContainer}>
            <EditorContent
               className="pt-[30px] px-[50px] pb-[50vh] [&_div]:space-y-[14px] [&_p]:text-[#495057] [&_h5]:font-[500] [&_h5]:text-xl [&_img]:rounded-[6px]"
               editor={editor}
            />
         </div>
      </div>
   );
}
