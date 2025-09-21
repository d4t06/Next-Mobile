import { Button, NotFound, Title } from "@/components";
import NoProduct from "@/components/NoProduct";
import ProductItem from "@/components/ProductItem";
import { ProductListSkelton } from "@/components/skeleton";
import { getAllCategories } from "@/libs/getAllCategory";
import { getAllTagProducts } from "@/libs/getAllTagProducts";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { TagIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Suspense } from "react";

export const revalidate = 0;

type Props = {
	params: {
		id: string;
	};
	searchParams: { page: string };
};

async function ProductList({ id, page }: { id: string; page: string }) {
	const categories = await getAllCategories();
	if (!categories) return <></>;

	const currentTag = categories.flatMap((c) => c.tags).find((t) => t.id === +id);
	if (!currentTag) return <></>;

	const data = await getAllTagProducts({ tag_id: currentTag.id });
	if (!data) return <NoProduct />;

	const _page = typeof page === "string" && +page >= 1 ? +page : 1;

	const isRemaining = data.page_size * data.page < data.count;

	const classes = {
		item: "flex mt-[10px] group",
		aItem: "font-bold ml-2 group-hover:text-[#cd1818]",
		button: "",
	};

	return (
		<>
			<div className="flex items-center space-x-2">
				<TagIcon className="w-6" />
				<Title title={currentTag.name} />
			</div>

			{!!data.products.length && (
				<div className="mt-[20px]">
					{data.products.map((p, index) => (
						<Link href={`/product/${p.id}`} key={index} className={classes.item}>
							<ProductItem product={p} />
						</Link>
					))}
				</div>
			)}
			{!data.products.length && <NoProduct />}

			{!!data.products.length && (
				<div className="flex mt-[30px] justify-center">
					<Button
						disabled={_page === 1}
						href={`tags/${id}?page=${_page - 1}`}
						size={"clear"}
						className="px-[12px] py-[3px]"
						colors={"second"}
					>
						<ChevronLeftIcon className="w-6" />
						Previous
					</Button>
					<Button
						href={`tags/${id}?page=${_page + 1}`}
						size={"clear"}
						className="px-[12px] py-[3px] ml-3"
						colors={"second"}
						disabled={!isRemaining}
					>
						Next
						<ChevronRightIcon className="w-6" />
					</Button>
				</div>
			)}
		</>
	);
}

export default async function SearchResultPage({ params, searchParams }: Props) {
	if (!params.id) return <NotFound />;

	return (
		<>
			<Suspense
				fallback={
					<div className="space-y-3">
						<ProductListSkelton />
					</div>
				}
			>
				<ProductList id={params.id} {...searchParams} />
			</Suspense>
		</>
	);
}
