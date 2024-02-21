"use client";

import useDrag from "@/hooks/useDrag";
import { Dispatch, MutableRefObject, ReactNode, SetStateAction } from "react";

type Props = {
  className?: string;
  children: ReactNode;
  index: number;
  endIndexRef: MutableRefObject<number>;
  handleDragEnd: () => void;
  setIsDrag: Dispatch<SetStateAction<boolean>>;
  isDrag: boolean;
};
export default function DragAbleItem({
  children,
  index,
  endIndexRef,
  className,
  isDrag,
  handleDragEnd,
  setIsDrag,
}: Props) {
  const { parentProps } = useDrag({
    index,
    endIndexRef,
    handleDragEnd,
    setIsDrag,
  });

  return (
    <div
      className={`draggable transition-[padding_margin]`}
      {...parentProps}
      draggable
    >
      <div className={className}>
        <div
          className="child-zone"
          style={{ pointerEvents: `${isDrag ? "none" : "auto"}` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
