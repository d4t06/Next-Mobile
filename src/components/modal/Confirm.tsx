import { ModalContentWrapper } from ".";
import Button from "../ui/Button";
import { useModalContext } from "./Modal";

type Props = {
  callback: () => void;
  label?: string;
  desc?: string;
  buttonLabel?: string;
  loading: boolean;
};

export default function ConfirmModal({
  loading,
  callback,
  label,
  buttonLabel,
  desc = "This action cannot be undone",
}: Props) {
  const { closeModal } = useModalContext();

  return (
    <ModalContentWrapper>
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
    </ModalContentWrapper>
  );
}
