"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { useState } from "react";
import EditToolbar from "./EditorToolbar";
// import Video from "./video";
import Video from "./video";

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
    extensions: [StarterKit, Image, Video],
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
          className="prose pt-[30px] sm:mx-auto pb-[50vh] [&_.ProseMirror-selectednode]:border-red-500"
          editor={editor}
        />
      </div>
    </>
  );
}
