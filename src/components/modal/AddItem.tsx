import {
  FormEvent,
  useEffect,
  useState,
  useRef,
  ReactNode,
  RefObject,
  useMemo,
} from "react";
import Button from "../ui/Button";
import ModalHeader from "./ModalHeader";
import MyInput from "@/components/ui/MyInput";
import { ModalContentWrapper } from ".";

type Props = {
  closeModal: () => void;
  cbWhenSubmit: (value: string) => void;
  title: string;
  initValue?: string;
  children?: ReactNode;
  loading?: boolean;
  variant?: "input" | "text-are";
};

export default function AddItem({
  closeModal,
  cbWhenSubmit,
  title,
  initValue,
  loading,
  children,
  variant = "input",
}: Props) {
  const [value, setValue] = useState(initValue || "");

  const inputRef = useRef<HTMLInputElement>(null);

  const isChanged = useMemo(() => value !== initValue, [value]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isChanged) return;

    cbWhenSubmit(value);
  };

  return (
    <ModalContentWrapper>
      <ModalHeader closeModal={closeModal} title={title} />
      <form action="" onSubmit={handleSubmit}>
        {variant === "input" && (
          <MyInput
            className="w-full"
            ref={inputRef}
            placeholder="name..."
            value={value}
            cb={(value) => setValue(value)}
          />
        )}

        {variant === "text-are" && (
          <textarea
            className={`my-input`}
            ref={inputRef as RefObject<any>}
            placeholder="name..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        )}

        {children}

        <p className="text-right mt-[20px]">
          <Button
            disabled={!isChanged}
            className="min-w-[70px]"
            loading={loading}
            type="submit"
          >
            Save
          </Button>
        </p>
      </form>
    </ModalContentWrapper>
  );
}
