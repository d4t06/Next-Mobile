import { DOMAttributes, useRef } from "react";

export default function useMouseEnter({ cb }: { cb: () => void }) {
  const isEnter = useRef(false);

  const handleMouseLeave = () => {
    if (isEnter.current) cb();
  };

  const props: DOMAttributes<HTMLDivElement> = {
    onMouseEnter: () => (isEnter.current = true),
    onMouseLeave: handleMouseLeave,
  };
  return { props };
}
