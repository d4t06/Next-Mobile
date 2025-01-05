"use client";

import { EditorContent, EditorOptions, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { ElementRef, useRef, useState } from "react";
import Toolbar from "./MyToolbar";

interface Props extends Partial<EditorOptions> {
  callback: (value: string, resetChange: () => void) => Promise<void>;
  className: string;
}
// destructuring callback will show warning
export default function MyEditor({ extensions, className, ...props }: Props) {
  const [isChange, setIsChange] = useState(false);
  const [isLock, setIsLock] = useState(true);

  const myEditorRef = useRef<ElementRef<"div">>(null);

  const editor = useEditor({
    extensions: [StarterKit, Image],
    onUpdate: () => setIsChange(true),
    ...props,
  });

  const toggleLock = (v?: boolean) => {
    const content =
      document.querySelector<HTMLDivElement>(".dashboard-content");
    const newLock = v ?? !isLock;

    console.log(newLock)

    if (content) {
      if (newLock) content.style.overflow = "auto";
      else {
        content.style.overflow = "hidden";

        myEditorRef?.current?.scrollIntoView({
          block: "center",
        });
      }
    }

    setIsLock(newLock);
  };
  const restChangeState = () => {
    setIsChange(false);
    toggleLock(true);
  };

  const handleSubmit = async (value: string) => {
    await props.callback(value, restChangeState);
  };

  const classes = {
    wrapper:
      "my-editor border border-black/10 bg-white rounded-[12px] overflow-hidden",
    editContainer: "max-h-[65vh] overflow-auto editor-container",
  };

  return (
    <div ref={myEditorRef} className={`${classes.wrapper} ${className || ""}`}>
      <Toolbar
        isLock={isLock}
        toggleLock={toggleLock}
        isChange={isChange}
        callback={handleSubmit}
        editor={editor}
      />
      <div
        className={`${classes.editContainer} ${isLock ? "pointer-events-none" : ""}`}
      >
        <EditorContent
          className="pt-[30px] sm:w-[70%] sm:mx-auto px-[20px] sm:px-[50px] pb-[50vh] [&_*]:mt-5 [&_p]:text-[#495057] [&_h5]:font-[500] [&_h5]:text-xl [&_img]:rounded-[6px] [&_img]:mx-auto [&_img]:border-[2px] [&_img]:border-transparent [&_.ProseMirror-selectednode]:border-red-500"
          editor={editor}
        />
      </div>
    </div>
  );
}
