import { CheckIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/16/solid";

type Props = {
  toast: Toast;
  onClick?: (id: string) => void;
};

export default function ToastItem({ toast, onClick }: Props) {
  const classes = {
    container: "flex items-center font-[500] px-[12px] py-[6px] rounded-[8px]",
  };

  return (
    <div
      onClick={() => (onClick ? onClick(toast.id) : undefined)}
      className={` ${classes.container} ${
        toast.title === "error" && "bg-red-500 text-white"
      } ${toast.title === "success" && "bg-emerald-500 text-white"} `}
    >
      {toast.title && (
        <>
          {toast.title === "success" && <CheckIcon className="w-[24px]" />}
          {toast.title === "error" && <XMarkIcon className="w-[24px]" />}
        </>
      )}
      <p className="text-[16px] ml-[8px]">{toast.desc}</p>
    </div>
  );
}
