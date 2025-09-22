import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/authOption";
import { Title } from "@/components";
import TagSection from "./_components/TagSection";
import { getAllCategories } from "@/libs/getAllCategory";
import { Suspense } from "react";

export const revalidate = 86400;

async function Group() {
	const session = await getServerSession(nextAuthOptions);

	if (!session) return redirect("/signin");
	if (session.user.role !== "ADMIN") return redirect("/unauthorized");

	const categories = await getAllCategories();

	if (!categories) return <></>;

	return <TagSection categories={categories} />;
}

export default async function CategoryManagePage() {
	return (
		<div className="space-y-5">
			<Title title="Tags" />

			<Suspense fallback={<p>Loading...</p>}>
				<Group />
			</Suspense>
		</div>
	);
}
