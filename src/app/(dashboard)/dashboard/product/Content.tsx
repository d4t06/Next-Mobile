import ProductItem from "@/components/ProductItem";
import Link from "next/link";
import { searchProduct } from "@/libs/searchProduct";
import { getAllProducts } from "@/libs/getAllProducts";
import { sleep } from "@/utils/appHelper";
import { NotFound } from "@/components";

type Props = {
	keyword: string;
};

export default async function DashboardProductContent({ keyword }: Props) {
	let products: Product[] = [];

	if (keyword) {
		const res = await searchProduct(keyword);
		if (res) products = res;
	} else {
		const res = await getAllProducts();
		if (res) products = res.products;
	}

	if (process.env.NODE_ENV === "development") await sleep(300);

	if (!products.length) return <NotFound className="mx-auto" variant="less" />;

	return (
		<>
			<div className="mt-5 space-y-3">
				{products.map((p, index) => (
					<Link className="block" key={index} href={`/dashboard/product/${p.id}`}>
						<ProductItem product={p} />
					</Link>
				))}
			</div>
		</>
	);
}
