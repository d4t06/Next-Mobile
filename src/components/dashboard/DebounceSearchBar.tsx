import { Dispatch, RefObject, SetStateAction } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button, Frame, MyInput } from "..";

type Props = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  inputRef?: RefObject<HTMLInputElement>
};
export default function DebounceSearchBar({ value, setValue, inputRef }: Props) {
  return (
    <Frame className="flex gap-2 justify-between items-center">
      <MyInput ref={inputRef} value={value} cb={(e) => setValue(e)} placeholder="..." />
      <Button
        onClick={() => (value ? setValue("") : {})}
        size={"clear"}
        className="p-2 flex-shrink-0"
      >
        {value ? <XMarkIcon className="w-6" /> : <MagnifyingGlassIcon className="w-6" />}
      </Button>
    </Frame>
  );
}
