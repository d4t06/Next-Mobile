import { CheckIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";

type Props = {
  toast: Toast;
  onClick?: (id: string) => void;
};

export default function ToastItem({ toast, onClick }: Props) {
  const [isOpen, setIsOpen] = useState<"init" | "open">("init");

  const title = toast.title || "success";

  const classes = {
    container:
      "flex transition-[transform,opacity] items-center py-1 px-2 space-x-1 rounded-md text-white font-semibold [&_svg]:w-5",
    open: "opacity-[1] translate-x-0",
    init: "opacity-0 translate-x-10",
    error: "bg-red-500",
    success: "bg-emerald-500",
    warning: "",
  };

  const icons = {
    error: <XMarkIcon />,
    success: <CheckIcon />,
    warning: <></>,
  };

  useEffect(() => {
    setTimeout(() => {
      setIsOpen('open');
    }, 0);
  }, []);

  return (
    <div
      onClick={() => (onClick ? onClick(toast.id) : undefined)}
      className={` ${classes.container} 
      ${classes[title]} ${classes[isOpen]}`}
    >
      {icons[title]}
      <p className="font-medium">{toast.desc}</p>
    </div>
  );
}
