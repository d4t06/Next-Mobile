import { NotFound, Title } from "@/components";
import NoProduct from "@/components/NoProduct";
import { searchProduct } from "@/libs/searchProduct";
import Link from "next/link";
import { Suspense } from "react";
import ProductItem from "@/components/ProductItem";
import { ProductListSkelton } from "@/components/skeleton";

type Props = {
	searchParams: {
		q: string;
	};
};

async function ProductList({ q }: Props["searchParams"]) {
	const products = await searchProduct(q);

	if (!products) return <NoProduct />;

	return (
		<>
			{!!products.length && (
				<div className="mt-5 space-y-5">
					{products.map((p, index) => (
						<ProductItem href={`/product/${p.id}`} key={index} product={p} />
					))}
				</div>
			)}
			{!products.length && <NoProduct />}
		</>
	);
}

export default function SearchResultPage({ searchParams: { q } }: Props) {
	if (!q) return <NotFound />;

	return (
		<>
			<Title title={`Result for keyword '${q}'`} />
			<Suspense
				fallback={
					<div className="space-y-2 mt-5">
						<ProductListSkelton />
					</div>
				}
			>
				<ProductList q={q} />
			</Suspense>
		</>
	);
}
