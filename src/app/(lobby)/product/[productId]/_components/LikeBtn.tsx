"use client";

import { Button } from "@/components";
import { HeartIcon as HeartIconOuline } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/16/solid";
import { Session } from "next-auth";
import useFetch from "@/hooks/useFetch";
import { useAuthContext } from "@/stores/AuthContext";

type Props = {
	user: Session;
	product_id: number;
};

export default function LikeBtn({ user, product_id }: Props) {
	const { update } = useAuthContext();

	const foundedIndex = user.user.like_products.findIndex(
		(lP) => lP.product_id === product_id,
	);

	const $fetch = useFetch();

	const handleLikeProduct = async () => {
		const newLikeProduct = [...user.user.like_products];

		if (foundedIndex === -1) {
			await $fetch.post(`/products/likes`, { user_id: user.user.id, product_id });
			newLikeProduct.push({
				product_id,
				user_id: user.user.id,
			});
		} else {
			await $fetch.delete(`/products/${product_id}/likes/${user.user.id}`);
			newLikeProduct.splice(foundedIndex, 1);
		}

		const newUserData: Partial<Session["user"]> = {
			like_products: newLikeProduct,
		};

		await update({ user: { ...user.user, ...newUserData } });
	};

	return (
		<Button
			onClick={handleLikeProduct}
			colors={"second"}
			size={"clear"}
			className="w-[36px]"
		>
			{foundedIndex !== -1 ? (
				<HeartIcon className="w-5 text-red-500" />
			) : (
				<HeartIconOuline className="w-5" />
			)}
		</Button>
	);
}
