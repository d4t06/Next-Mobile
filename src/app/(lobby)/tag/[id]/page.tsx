import { Title } from "@/components";
import NoProduct from "@/components/NoProduct";
import Pagination from "@/components/Pagination";
import ProductItem from "@/components/ProductItem";
import { ProductListSkelton } from "@/components/skeleton";
import { getAllCategories } from "@/libs/getAllCategory";
import { getAllTagProducts } from "@/libs/getAllTagProducts";
import { TagIcon } from "@heroicons/react/24/outline";
import { Suspense } from "react";

export const revalidate = 0;

type Props = {
	params: {
		id: string;
	};
	searchParams: { page: string };
};

async function ProductList({ page, tag_id }: { page: string; tag_id: number }) {
	const data = await getAllTagProducts({ tag_id, page });
	if (!data) return <NoProduct />;

	const _page = typeof page === "string" && +page >= 1 ? +page : 1;

	const isRemaining = data.page_size * data.page < data.count;

	return (
		<>
			{!!data.products.length && (
				<div className="mt-5 space-y-3">
					{data.products.map((p, index) => (
						<ProductItem product={p} href={`/product/${p.id}`} key={index} />
					))}
				</div>
			)}
			{!data.products.length && <NoProduct />}

			{!!data.products.length && (
				<Pagination page={_page} isHasNextPage={isRemaining} href={`/tag/${tag_id}`} />
			)}
		</>
	);
}

export default async function SearchResultPage({
	params,
	searchParams: { page },
}: Props) {
	const categories = await getAllCategories();
	if (!categories) return <></>;

	const currentTag = categories.flatMap((c) => c.tags).find((t) => t.id === +params.id);
	if (!currentTag) return <></>;

	return (
		<>
			<div className="flex items-center space-x-2">
				<TagIcon className="w-6" />
				<Title variant={"h2"} title={currentTag.name} />
			</div>

			<Suspense
				fallback={
					<div className="space-y-3 mt-5">
						<ProductListSkelton />
					</div>
				}
			>
				<ProductList tag_id={currentTag.id} page={page} />
			</Suspense>
		</>
	);
}
