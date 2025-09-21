import { searchProduct } from "@/libs/searchProduct";
import { generateId } from "@/utils/appHelper";
import { useEffect, useRef, useState } from "react";

type Props = {
  query: string;
};
export default function useSearchProduct({ query }: Props) {
  const [isFetching, setIsFetching] = useState(false);
  const [searchResult, setSearchResult] = useState<Product[]>([]);

  const controllerRef = useRef<AbortController>();

  useEffect(() => {
    if (!query.trim()) {
      setIsFetching(false);
      setSearchResult([]);
      return;
    }

    const fetchApi = async () => {
      try {
        setIsFetching(true);

        if (controllerRef.current) {
          controllerRef.current.abort();
        }

        controllerRef.current = new AbortController();

        const products = await searchProduct(generateId(query), controllerRef.current);

        if (products) {
          setSearchResult(products);
        } else setSearchResult([]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchApi();
  }, [query]);

  return { isFetching, searchResult, setSearchResult };
}
