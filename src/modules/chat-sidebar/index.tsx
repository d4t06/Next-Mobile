"use client";
import Button from "@/components/ui/Button";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { createContext, useContext, useEffect, useState } from "react";
import ChatInput from "./_components/ChatInput";
import MessageList from "./_components/MessageList";

export type Messsage = {
  role: "user" | "bot";
  message: string;
};

function useChat() {
  const [messages, setMessages] = useState<Messsage[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  return { messages, setMessages, isFetching, setIsFetching };
}

type ContextType = ReturnType<typeof useChat>;

const context = createContext<ContextType | null>(null);

export default function ChatSidebar() {
  const [expand, setExpand] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    const isMobileUA = mobileRegex.test(navigator.userAgent);

    const hasTouchPoints = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;

    const isOnMobile = isMobileUA || (hasTouchPoints && isSmallScreen);

    setIsMobile(isOnMobile);
  }, []);

  const classes = {
    container:
      "bg-white dark:bg-slate-700 border-l border-[--a-5-cl] transition-width duration-200 h-screen relative flex-shrink-0",
  };

  return (
    <context.Provider value={useChat()}>
      {!isMobile && (
        <div className={`${classes.container} ${expand ? "w-[400px]" : "w-[30px]"}`}>
          <div className="w-[400px] flex flex-col h-full px-4">
            <MessageList />
            <ChatInput />
          </div>
          <div className="!absolute top-1/2 z-[10] -left-2 -translate-x-1/2 -translate-y-1/2">
            <Button
              onClick={() => setExpand((prev) => !prev)}
              className="p-1 [&_svg]:w-6"
              size={"clear"}
              border={"clear"}
            >
              {expand ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </Button>
          </div>
        </div>
      )}
    </context.Provider>
  );
}

export function useChatContext() {
  const ct = useContext(context);
  if (!ct) throw new Error("Cannot use outside ChatSidebar");

  return ct;
}
