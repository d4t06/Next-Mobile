import { Button } from "..";
import { ReactNode } from "react";

type Props<T> = {
  setTab: (v: T) => void;
  tab: T;
  tabs: readonly T[];
  disable?: boolean;
  render: (item: T) => ReactNode;
  className?: string;
  buttonClasses?: string;
};

export default function Tab<T>({
  setTab,
  render,
  disable,
  tab,
  tabs,
  className = "",
  buttonClasses = "[&_button]:py-1 [&_button]:px-4 ",
}: Props<T>) {
  return (
    <div
      className={`${disable ? "disabled" : ""} bg-[--a-5-cl] rounded-xl p-2 space-x-1 ${className} ${buttonClasses}`}
    >
      {tabs.map((t, i) => (
        <Button
          size={"clear"}
          key={i}
          colors={t === tab ? "primary" : "second"}
          onClick={(e) => {
            setTab(t);
            (e.target as HTMLButtonElement).blur();
          }}
        >
          {render(t)}
        </Button>
      ))}
    </div>
  );
}
