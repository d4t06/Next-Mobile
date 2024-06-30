"use";
import { generateId } from "@/utils/appHelper";
import { useEffect, useState } from "react";

type Props = {
   query: string;
};
export default function useSearchProduct({ query }: Props) {
   const [isFetching, setIsFetching] = useState(false);
   const [searchResult, setSearchResult] = useState<Product[]>([]);

   useEffect(() => {
      if (!query.trim()) {
         setIsFetching(false);
         setSearchResult([]);
         return;
      }
      const controller = new AbortController();

      const fetchApi = async () => {
         try {
            setIsFetching(true);

            const res = await fetch(
               `${
                  process.env.NEXT_PUBLIC_API_ENDPOINT ||
                  "https://nest-mobile.vercel.app/api"
               }/products/search?q=${generateId(query)}`
            );

            if (res.ok) {
               const data = (await res.json()) as Product[];
               setSearchResult(data);
            } else setSearchResult([]);
         } catch (error) {
            console.log(error);
         } finally {
            setIsFetching(false);
         }
      };

      fetchApi();

      return () => {
         console.log("abort");
         controller.abort();
      };
   }, [query]);

   return { isFetching, searchResult, setSearchResult };
}
