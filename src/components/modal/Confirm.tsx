import Button from "../ui/Button";
import { ModalWrapper } from "./AnimateModal";

type Props = {
  callback: () => void;
  label?: string;
  desc?: string;
  buttonLabel?: string;
  loading: boolean;
  className?: string;
  closeModal: () => void;
};

export default function ConfirmModal({
  loading,
  callback,
  label,
  closeModal,
  buttonLabel,
  desc = "This action cannot be undone",
  className,
}: Props) {
  return (
    <ModalWrapper>
      <h1 className="text-[20px] font-semibold">{label || "Wait a minute"}</h1>
      {desc && <p className=" text-[16px] font-semibold text-red-500">{desc}</p>}

      <div className="flex gap-[10px] mt-[20px]">
        <Button colors={"second"} onClick={closeModal}>
          Close
        </Button>
        <Button className="min-w-[120px]" loading={loading} onClick={callback}>
          {buttonLabel || "Yes please"}
        </Button>
      </div>
    </ModalWrapper>
  );
}
