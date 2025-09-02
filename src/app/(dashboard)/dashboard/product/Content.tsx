"use client";

import Searchbar from "@/components/dashboard/SearchBar";
import AddProductButton from "./_components/AddProductButton";
import useDashboardProduct from "./_hooks/useDashboardProduct";
import ProductItem from "./_components/ProductItem";
import NoProduct from "@/components/NoProduct";
import Tab from "@/components/dashboard/Tab";
import { useMemo } from "react";
import Loading from "@/components/dashboard/Loading";

type Props = {
	categories: Category[];
	products: Product[];
};

export default function DashboardProductContent({ categories, products }: Props) {
	const { tabs, tab, setTab, isFetching, searchResult, ...rest } = useDashboardProduct();

	const productSource = useMemo(
		() => (tab === "All" ? products : searchResult),
		[tab, products, searchResult],
	);

	return (
		<>
			<div className="flex justify-between">
				<h1 className="text-2xl">All products</h1>
				<AddProductButton categories={categories} />
			</div>
			<div className="mt-3 inline-block">
				<Searchbar loading={tab === "Result" && isFetching} {...rest} />
			</div>

			<div className={`mt-5 w-fit self-start`}>
				<Tab tabs={tabs} render={(t) => t} tab={tab} setTab={setTab} />
			</div>

			{!isFetching && (
				<>
					{!!productSource.length && (
						<div className="mt-5">
							{productSource.map((p, index) => (
								<div
									key={index}
									className="border-b border-[--a-5-cl] mb-[10px] pb-[10px] last:border-none"
								>
									<ProductItem product={p} />
								</div>
							))}
						</div>
					)}
					{!productSource.length && <NoProduct />}
				</>
			)}
		</>
	);
}
