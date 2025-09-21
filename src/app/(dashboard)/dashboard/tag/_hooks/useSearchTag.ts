import useDebounce from "@/hooks/useDebounce";
import { convertToEn } from "@/utils/appHelper";
import { useMemo, useState } from "react";

type Props = {
  tags: Tag[];
};

export default function useSearchTag({ tags }: Props) {
  const [value, setValue] = useState("");

  const debouncedValue = useDebounce(value, 800);

  const _tags = useMemo(
    () =>
      debouncedValue
        ? tags.filter((g) => convertToEn(g.name).includes(convertToEn(debouncedValue)))
        : tags,
    [debouncedValue, tags],
  );

  return { value, setValue, _tags };
}
