"use client";

import { EditorContent, EditorOptions, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { ElementRef, useRef, useState } from "react";
import EditToolbar from "./EditorToolbar";

type Props = {
  submit: (value: string) => void;
  isLoading?: boolean
  className?: string;
  content: string;
};

// destructuring callback will show warning
export default function MyEditor({ submit, isLoading, className = "", content }: Props) {
  const [isChange, setIsChange] = useState(false);

  const myEditorRef = useRef<ElementRef<"div">>(null);

  const editor = useEditor({
    extensions: [StarterKit, Image],
    onUpdate: () => setIsChange(true),
    content,
  });

  const classes = {
    wrapper: "my-editor border border-black/10 bg-white rounded-[12px] overflow-hidden",
    editContainer: "max-h-[65vh] overflow-auto",
  };

  return (
    <div ref={myEditorRef} className={`${classes.wrapper} ${className || ""}`}>
      <EditToolbar
        isLoading={isLoading}
        isChange={isChange}
        submit={() => submit(editor?.getHTML() || "")}
        editor={editor}
      />
      <div className={`${classes.editContainer}`}>
        <EditorContent
          className="pt-[30px] sm:w-[70%] sm:mx-auto px-[20px] sm:px-[50px] pb-[50vh] [&_*]:mt-5 [&_p]:text-[#495057] [&_h5]:font-[500] [&_h5]:text-xl [&_img]:rounded-[6px] [&_img]:mx-auto [&_img]:border-[2px] [&_img]:border-transparent [&_.ProseMirror-selectednode]:border-red-500"
          editor={editor}
        />
      </div>
    </div>
  );
}
