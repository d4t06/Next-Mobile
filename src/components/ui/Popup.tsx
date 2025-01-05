import {
  Children,
  cloneElement,
  createContext,
  ElementRef,
  forwardRef,
  HTMLProps,
  isValidElement,
  ReactNode,
  Ref,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

type StateType = {
  isMounted: boolean;
  isOpen: boolean;
};

// context
type PopupProps = {
  relativeWrap?: boolean;
  appendOnPortal?: boolean;
  className?: string;
};

const usePopup = ({ appendOnPortal }: PopupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const triggerRef = useRef<ElementRef<"button"> | null>(null);
  const contentRef = useRef<ElementRef<"div"> | null>(null);

  const setTriggerRef = (ele: ElementRef<"button">) => {
    triggerRef.current = ele;
  };

  const setContentRef = (ele: ElementRef<"div">) => {
    contentRef.current = ele;
  };

  const close = () => {
    setIsMounted(false);
  };

  const toggle = () => {
    if (isMounted) setIsMounted(false);
    if (!isOpen) setIsOpen(true);
  };

  return {
    refs: { triggerRef, contentRef },
    setTriggerRef,
    setContentRef,
    state: { isMounted, isOpen } as StateType,
    setIsMounted,
    setIsOpen,
    appendOnPortal,
    close,
    toggle,
  };
};

type ContextType = ReturnType<typeof usePopup>;

const Context = createContext<ContextType | null>(null);

const usePopoverContext = () => {
  const context = useContext(Context);
  if (context == null) {
    throw new Error("Popover components must be parent in <MyPopup />");
  }
  return context;
};

export default function Popup({
  children,
  relativeWrap = true,
  appendOnPortal,
  className = "",
  ...rest
}: { children: ReactNode } & PopupProps) {
  return (
    <Context.Provider value={usePopup({ ...rest, appendOnPortal })}>
      {!appendOnPortal ? <div className={`relative ${className}`}>{children}</div> : children}
    </Context.Provider>
  );
}

type TriggerProps = {
  children: ReactNode;
  className?: string;
};
export type TriggerRef = {
  close: () => void;
};

export const PopupTrigger = forwardRef(function Func(
  { children }: TriggerProps,
  ref: Ref<TriggerRef>,
) {
  const {
    refs,
    setTriggerRef,
    setIsMounted,
    setIsOpen,
    close,
    toggle,
    state: { isMounted, isOpen },
  } = usePopoverContext();

  useImperativeHandle(ref, () => ({ close }));

  useEffect(() => {
    if (!isMounted) {
      setTimeout(() => {
        setIsOpen(false);
      }, 400);
    }
  }, [isMounted]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsMounted(true);
      }, 100);
    }

    return () => {
      if (!isOpen) {
        setIsMounted(false);
      }
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (
        !refs.contentRef ||
        !refs.triggerRef ||
        refs.triggerRef.current?.contains(e.target as Node) ||
        refs.contentRef.current?.contains(e.target as Node)
      ) {
        return;
      }

      setIsMounted(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  // @ts-ignore
  if (isValidElement(children)) {
    return cloneElement(children, {
      onClick: toggle,
      isOpen,
      setTriggerRef,
      ref: refs.triggerRef,
    } as HTMLProps<Element>);
  }

  return <></>;
});

type BaseContentProps = {
  children: ReactNode;
  className?: string;
  animationClassName?: string;
};

type WrappedContent = BaseContentProps & {
  appendTo: "parent";
};

type PortalContent = BaseContentProps & {
  appendTo: "portal";
  position?: "left-bottom" | "right-bottom";
  origin?: "bottom right" | "bottom left" | "top right" | "top left";
  spacer?: number;
};

type ContentProps = WrappedContent | PortalContent;

export function PopupContent({
  children,
  className,
  animationClassName,
  ...props
}: ContentProps) {
  const {
    state: { isMounted, isOpen },
    refs,
    close,
    appendOnPortal,
    setContentRef,
  } = usePopoverContext();

  const animationRef = useRef<ElementRef<"div">>(null);

  const setContentPos = () => {
    const triggerEle = refs.triggerRef.current;
    const contentEle = refs.contentRef.current;
    const animationEle = animationRef.current;

    if (!triggerEle || !contentEle) return;

    const triggerRect = triggerEle.getBoundingClientRect();

    // default is left bottom
    const contentPos = {
      top: triggerRect.top + triggerEle.clientHeight,
      left: triggerRect.left - contentEle.clientWidth,
    };

    if (props.appendTo === "portal") {
      const { origin = "top right", position, spacer = 8 } = props;

      switch (position) {
        // case "left-bottom": {}
        case "right-bottom": {
          contentPos.top = triggerRect.top + triggerEle.clientHeight + spacer;
          contentPos.left = triggerRect.left;
          break;
        }
      }

      const isOverScreenHeight =
        contentPos.top + contentEle.clientHeight > window.innerHeight - 90;
      if (isOverScreenHeight) {
        let newTop = contentPos.top - contentEle.clientHeight - triggerEle.clientHeight;

        if (newTop - 60 < 0) newTop = 60;

        contentPos.top = newTop;
      }

      if (animationEle) {
        let finalOrigin = origin;

        if (isOverScreenHeight) finalOrigin = "bottom right";

        animationEle.style.transformOrigin = finalOrigin;
      }
    }

    contentEle.style.left = `${contentPos.left}px`;
    contentEle.style.top = `${contentPos.top}px`;
  };

  const handleWheel: EventListener = close;

  const classes = {
    unMountedContent: "opacity-0 scale-[.95]",
    mountedContent: "opacity-100 scale-[1]",
  };

  const content = (
    <div
      ref={setContentRef}
      className={`${appendOnPortal ? "fixed z-[99]" : "absolute"} ${className || ""}`}
    >
      <div
        ref={animationRef}
        className={` transition-[transform,opacity] duration-[.25s] ease-linear ${
          animationClassName || ""
        } ${isMounted ? classes.mountedContent : classes.unMountedContent}`}
      >
        {children}
      </div>
    </div>
  );

  useEffect(() => {
    if (!appendOnPortal) return;

    if (isOpen) setContentPos();
    else return;

    const mainContainer = document.querySelector(".main-container");
    if (!mainContainer) return;

    mainContainer.addEventListener("wheel", handleWheel);

    return () => {
      if (mainContainer) mainContainer.removeEventListener("wheel", handleWheel);
    };
  }, [isOpen]);

  if (!isOpen) return <></>;

  return (
    <>
      {appendOnPortal
        ? createPortal(content, document.getElementById("portals")!)
        : content}
    </>
  );
}

export function PopupContentWrapper({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const classes = {
    menuItem:
      "*:px-3 *:py-1 *:flex *:items-center  *:space-x-1 hover:[&>*:not(div.absolute)]:bg-[#f4f6f8] hover:[&>*]:text-[#cd1818]",
  };

  return (
    <div
      className={`rounded-lg py-3 text-[#333] text-sm bg-[#fff] flex flex-col shadow-[2px_2px_10px_0_rgba(0,0,0,.15)] ${classes.menuItem} ${className}`}
    >
      {children}
    </div>
  );
}
