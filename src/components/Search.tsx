"use client";

import useDebounce from "@/hooks/useDebounce";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Search() {
  const [value, setValue] = useState("");
  const [searchResult, setSearchResult] = useState<Product[]>([]);
  const [show, setShow] = useState(false);

  const query = useDebounce(value, 700);

  const classes = {
    container: "border border-black/10 flex h-[30px] rounded-[99px] px-[10px]",
    input:
      "placeholder:text-[#808080] h-full bg-transparent outline-none text-[#333] text-[16px]",
    searchItem:
      "flex border-l-[2px] border-transparent hover:border-[#cd1818] px-[4px]",
  };

  useEffect(() => {
    if (!query.trim()) return;
    const controller = new AbortController();

    const fetchApi = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/search?q=${query}`
        );

        if (res.ok) {
          const data = (await res.json()) as Product[];
          setSearchResult(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchApi();

    return () => {
      console.log("abort");

      controller.abort();
    };
  }, [query]);

  return (
    <div className="relative">
      <div className={classes.container}>
        <input
          value={value}
          onFocus={() => setShow(true)}
          onBlur={() => setShow(false)}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          className={classes.input}
        />
        <button>
          <MagnifyingGlassIcon className="w-[20px]" />
        </button>
      </div>

      <div className="absolute top-[100%] w-full ">
        {show && (
          <div className="bg-white rounded-[8px] border border-black/15 px-[5px] py-[10px]">
            <ul className="max-h-[60vh] overflow-auto">
              {setSearchResult.length ? (
                searchResult.map((p, index) => {
                  return (
                    <Link
                      href={`/product/${p.product_ascii}`}
                      className={classes.searchItem}
                      key={index}
                    >
                      <Image
                        className="w-[60px] flex-shrink-0"
                        src={p.image_url}
                        alt=""
                      />
                      <h5 className="ml-[10px] text-[14px] font-[500]">
                        {p.product_name}
                      </h5>
                    </Link>
                  );
                })
              ) : (
                <p className="text-center">not found</p>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
