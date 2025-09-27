"use client";

import { Button } from "@/components";
import { HeartIcon as HeartIconOuline } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/16/solid";
import { Session } from "next-auth";
import useFetch from "@/hooks/useFetch";
import { useAuthContext } from "@/stores/AuthContext";
import { Modal, ModalContentWrapper, ModalHeader, ModalRef } from "@/components/modal";
import Link from "next/link";
import { useRef } from "react";
import { useParams, usePathname } from "next/navigation";

type Props = {
	user: Session | null;
	product_id: number;
};

export default function LikeBtn({ user, product_id }: Props) {
	const { update } = useAuthContext();

	const modalRef = useRef<ModalRef>(null);

	const pathname = usePathname();

	const foundedIndex = user?.user.like_products.findIndex(
		(lP) => lP.product_id === product_id,
	);

	const $fetch = useFetch();

	const handleLikeProduct = async () => {
		if (!user) {
			modalRef.current?.open();

			console.log(location);

			return;
		}

		const newLikeProduct = [...user.user.like_products];

		if (foundedIndex === -1) {
			await $fetch.post(`/products/likes`, { user_id: user.user.id, product_id });
			newLikeProduct.push({
				product_id,
				user_id: user.user.id,
			});
		} else {
			if (foundedIndex === undefined) return;

			await $fetch.delete(`/products/${product_id}/likes/${user.user.id}`);
			newLikeProduct.splice(foundedIndex, 1);
		}

		const newUserData: Partial<Session["user"]> = {
			like_products: newLikeProduct,
		};

		await update({ user: { ...user.user, ...newUserData } });
	};

	return (
		<>
			<Button
				onClick={handleLikeProduct}
				colors={"second"}
				size={"clear"}
				className="w-[36px]"
			>
				{foundedIndex !== undefined && foundedIndex !== -1 ? (
					<HeartIcon className="w-5 text-red-500" />
				) : (
					<HeartIconOuline className="w-5" />
				)}
			</Button>

			<Modal ref={modalRef}>
				<ModalContentWrapper>
					<ModalHeader title="Login require" />

					<p>You need to login to like products !!!</p>

					<p className="mt-5 text-right">
						<Link href={{ pathname: "/signin", query: { from: pathname } }}>
							<Button>Login</Button>
						</Link>
					</p>
				</ModalContentWrapper>
			</Modal>
		</>
	);
}
