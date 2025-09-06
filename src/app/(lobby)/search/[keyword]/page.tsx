import { MyImage, NotFound, Title } from "@/components";
import NoProduct from "@/components/NoProduct";
import { searchProduct } from "@/libs/searchProduct";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "./loading";

type Props = {
	params: {
		keyword: string;
	};
};

async function ProductList({ keyword }: { keyword: string }) {
	const products = await searchProduct(keyword);

	if (!products) return <NoProduct />;

	const classes = {
		item: "flex mt-[10px] group",
		aItem: "font-bold ml-2 group-hover:text-[#cd1818]",
		button: "",
	};

	return (
		<>
			{!!products.length && (
				<div className="mt-[20px]">
					{products.map((p, index) => (
						<Link href={`/product/${p.id}`} key={index} className={classes.item}>
							<div className="h-[70px] w-[70px]">
								<MyImage
									alt=""
									width={70}
									height={70}
									className="rounded-[6px] h-full object-contain"
									src={p.image_url}
								/>
							</div>

							<span className={classes.aItem}>{p.product_name}</span>
						</Link>
					))}
				</div>
			)}
			{!products.length && <NoProduct />}
		</>
	);
}

export default function SearchResultPage({ params }: Props) {

	console.log(params)

	if (!params.keyword) return <NotFound />;

	return (
		<>
			<Title title="Result" />

			<Suspense fallback={<Loading />}>
				<ProductList keyword={params.keyword} />
			</Suspense>
		</>
	);
}
