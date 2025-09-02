import { useToastContext } from "@/stores/ToastContext";
import { generateId } from "@/utils/appHelper";
import { request } from "@/utils/request";
import { FormEvent, useState } from "react";

const tabs = ["All", "Result"] as const;

type Tab = (typeof tabs)[number];

export default function useDashboardProduct() {
  const [value, setValue] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [tab, setTab] = useState<Tab>("All");
  const [searchResult, setSearchResult] = useState<Product[]>([]);

  const { setErrorToast } = useToastContext();

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (isFetching) return;

      setIsFetching(true);

      const res = await request.get<Product[]>(`/products/search?q=${generateId(value)}`);

      setSearchResult(res.data);

      setTab("Result");
    } catch (err) {
      console.log({ message: err });
      setErrorToast();
    } finally {
      setIsFetching(false);
    }
  };

  return {
    isFetching,
    value,
    setValue,
    handleSubmit,
    tab,
    searchResult,
    setTab,
    tabs,
  };
}
