import { CheckIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/16/solid";

type Props = {
  toast: Toast;
  onClick?: (id: string) => void;
};

export default function ToastItem({ toast, onClick }: Props) {
  const classes = {
    container: "flex items-center py-1 px-2 space-x-1 rounded-md text-white",
  };

  return (
    <div
      onClick={() => (onClick ? onClick(toast.id) : undefined)}
      className={` ${classes.container} ${toast.title === "error" && "bg-red-500"} ${
        toast.title === "success" && "bg-emerald-500"
      } `}
    >
      {toast.title && (
        <>
          {toast.title === "success" && <CheckIcon className="w-[24px]" />}
          {toast.title === "error" && <XMarkIcon className="w-[24px]" />}
        </>
      )}
      <p className="font-medium">{toast.desc}</p>
    </div>
  );
}
