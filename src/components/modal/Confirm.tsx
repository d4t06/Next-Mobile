import { Dispatch, SetStateAction } from "react";
import Button from "../ui/Button";

type Props = {
  callback: () => void;
  label?: string;
  desc?: string;
  buttonLabel?: string;
  loading: boolean;
  className?: string;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

export default function ConfirmModal({
  loading,
  callback,
  label,
  setOpenModal,
  buttonLabel,
  desc = "This action cannot be undone",
  className,
}: Props) {
  return (
    <div
      className={`${className || "w-[400px] max-w-[calc(90vw-40px)]"} ${
        loading ? "opacity-60 pointer-events-none" : ""
      }`}
    >
      <h1 className="text-[20px] font-semibold">{label || "Wait a minute"}</h1>
      {desc && (
        <p className=" text-[16px] font-semibold text-red-500">{desc}</p>
      )}

      <div className="flex gap-[10px] mt-[20px]">
        <Button variant={"primary"} className="bg-gray-500 text-[#333]" onClick={() => setOpenModal(false)}>
          Close
        </Button>
        <Button isLoading={loading} variant={"primary"} onClick={callback}>
          {buttonLabel || "Yes please"}
        </Button>
      </div>
    </div>
  );
}
