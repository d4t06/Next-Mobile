import { Title } from "@/components";
import { redirect } from "next/navigation";
import ProductList from "./_components/ProductList";
import { getServerSession } from "next-auth";
import { getAllCategories } from "@/libs/getAllCategory";

export default async function LikeProductPage() {
	const session = await getServerSession();
	if (!session) return redirect("/");

	const categories = await getAllCategories();

	return (
		<>
			<Title title="Liked products" />

			<ProductList categories={categories} session={session} />
		</>
	);
}
