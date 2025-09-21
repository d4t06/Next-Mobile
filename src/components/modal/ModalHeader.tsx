import { XMarkIcon } from "@heroicons/react/16/solid";
import Button from "../ui/Button";
import { useModalContext } from "./Modal";

export default function ModalHeader({ title }: { title: string }) {
  const { setIsOpen } = useModalContext();

  return (
    <div className="flex justify-between mb-5">
      <h1 className="text-xl font-bold mr-2 line-clamp-1">{title}</h1>
      <Button
        size={"clear"}
        className="p-[4px]"
        colors={"second"}
        onClick={() => setIsOpen(false)}
      >
        <XMarkIcon className="w-[22px]" />
      </Button>
    </div>
  );
}
