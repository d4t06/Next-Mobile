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
  cbWhenSubmit: (value: string) => void;
  title: string;
  initValue?: string;
  children?: ReactNode;
  loading?: boolean;
  variant?: "input" | "text-are";
  setValueFromProp?: (v: string) => void;
  valueFromProps?: string;
};

export default function AddItem({
  cbWhenSubmit,
  title,
  initValue,
  loading,
  children,
  variant = "input",
  setValueFromProp,
  valueFromProps
}: Props) {
  const [value, setValue] = useState(initValue || "");

  const inputRef = useRef<HTMLInputElement>(null);

  const isChanged = useMemo(() => value !== initValue, [value]);

  const _setValue = setValueFromProp || setValue;
  const _value = valueFromProps || value

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isChanged) return;

    cbWhenSubmit(_value);
  };

  return (
    <ModalContentWrapper>
      <ModalHeader title={title} />
      <form action="" onSubmit={handleSubmit}>
        {variant === "input" && (
          <MyInput
            className="w-full"
            ref={inputRef}
            placeholder="name..."
            value={_value}
            cb={(value) => _setValue(value)}
          />
        )}

        {variant === "text-are" && (
          <textarea
            className={`my-input`}
            ref={inputRef as RefObject<any>}
            placeholder="name..."
            value={_value}
            onChange={(e) => _setValue(e.target.value)}
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
