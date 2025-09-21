import { Title } from "@/components";
import { redirect } from "next/navigation";
import ProductList from "./_components/ProductList";
import { getServerSession } from "next-auth";

export default async function LikeProductPage() {
	const session = await getServerSession();

	if (!session) return redirect("/");

	return (
		<>
			<Title title="Liked products" />

			<ProductList session={session} />
		</>
	);
}
