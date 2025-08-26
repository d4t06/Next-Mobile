"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { useState } from "react";
import EditToolbar from "./EditorToolbar";

type Props = {
  submit: (value: string) => void;
  isLoading?: boolean;
  className?: string;
  content: string;
};

// destructuring callback will show warning
export default function MyEditor({ isLoading, submit, content }: Props) {
  const [isChange, setIsChange] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit, Image],
    onUpdate: () => setIsChange(true),
    content,
  });

  const classes = {
    editContainer: "max-h-[65vh] overflow-auto",
  };

  return (
    <>
      <EditToolbar
        isLoading={isLoading}
        isChange={isChange}
        submit={() => submit(editor?.getHTML() || "")}
        editor={editor}
      />
      <div className={`${classes.editContainer}`}>
        <EditorContent
          className="pt-[30px] sm:w-[70%] sm:mx-auto px-[20px] sm:px-[50px] pb-[50vh] [&_*]:mt-5 [&_h5]:font-[500] [&_h5]:text-xl [&_img]:rounded-[6px] [&_img]:mx-auto [&_img]:border-[2px] [&_img]:border-transparent [&_.ProseMirror-selectednode]:border-red-500"
          editor={editor}
        />
      </div>
    </>
  );
}
