import {
  DOMAttributes,
  Dispatch,
  DragEvent,
  MutableRefObject,
  SetStateAction,
} from "react";

type Props = {
  index: number;
  endIndexRef: MutableRefObject<number>;
  handleDragEnd: () => void;
  setIsDrag: Dispatch<SetStateAction<boolean>>;
};

const activeStyles: Partial<CSSStyleDeclaration> = {
  border: "1px solid #cd1818",
};

const inActiveStyles: Partial<CSSStyleDeclaration> = {
  borderColor: "rgba(0,0,0,0.15)",
};

const findDraggableItem = (el: HTMLDivElement) => {
  if (el.classList.contains("draggable")) return el;
  let i = 0;
  let parent = el.parentElement as HTMLDivElement;
  while (!parent.classList.contains("draggable") && i < 5) {
    parent = parent.parentElement as HTMLDivElement;
    i++;
  }

  if (i == 5) return null;
  return parent;
};

export default function useDrag({
  endIndexRef,
  index,
  handleDragEnd,
  setIsDrag,
}: Props) {
  const handleDragStart = () => {
    setIsDrag(true);
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    endIndexRef.current = index;
    const el = e.target as HTMLDivElement;
    setIsDrag(true);
    const parentEl = findDraggableItem(el);

    if (parentEl) {
      Object.assign((parentEl.childNodes[0] as HTMLDivElement).style, activeStyles);
      parentEl.classList.add("active");
   }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    const el = e.target as HTMLDivElement;
    const parentEl = findDraggableItem(el);

    if (parentEl) {
      Object.assign((parentEl.childNodes[0] as HTMLDivElement).style, inActiveStyles);
      parentEl.classList.remove("active");
   }
  };

  const endDrag = () => {
    const activeItem = document.querySelector(
      ".draggable.active"
    ) as HTMLDivElement;

    if (activeItem) {
      Object.assign((activeItem.childNodes[0] as HTMLDivElement).style, inActiveStyles);
      activeItem.classList.remove("active");
   }

    setIsDrag(false);
    handleDragEnd();
  };

  const parentProps: DOMAttributes<HTMLDivElement> = {
    onDragEnter: (e) => handleDragEnter(e),
    onDragEnd: endDrag,
    onDragOver: (e) => {
      e.preventDefault();
    },
    onDragLeave: (e) => {
      handleDragOver(e);
    },
    onDragStart: handleDragStart,
  };

  return { parentProps };
}
