import { ArrowPathIcon, PlayIcon } from "@heroicons/react/16/solid";
import { useChatContext } from "..";
import useChatInput from "../useChatInput";
import useAIChat from "../useAIChat";
import { FormEventHandler } from "react";

export default function ChatInput() {
  const { isFetching } = useChatContext();

  const { textareaRef, value, setValue } = useChatInput();

  const { sendMessage } = useAIChat();

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    if (!value.trim()) return;
    setValue("");

    sendMessage(value);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={`flex pb-3 items-end`}>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={1}
          className={`my-input no-scrollbar resize-none max-h-[30vh] w-full`}
        />

        <button type="submit" className={`p-1.5 hover:bg-white/10 rounded-full`}>
          {isFetching ? (
            <ArrowPathIcon className="w-6 animate-spin" />
          ) : (
            <PlayIcon className="w-6" />
          )}
        </button>
      </form>
    </>
  );
}
