"use client";

import { NotFound } from "@/components";
import ProductItem from "@/components/ProductItem";
import { ProductListSkelton } from "@/components/skeleton";
import useFetch from "@/hooks/useFetch";
import { useAuthContext } from "@/stores/AuthContext";
import { useToastContext } from "@/stores/ToastContext";
import { getImageByBrand } from "@/utils/appHelper";
import { Session } from "next-auth";
import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
	session: Session;
	categories?: Category[];
};

export default function ProductList({ categories }: Props) {
	const { user } = useAuthContext();
	const { setErrorToast } = useToastContext();

	const [likeProducts, setLikeProducts] = useState<LikeProduct[]>([]);

	const [isFetching, setIsFetching] = useState(true);

	const ranEffect = useRef(false);

	const $fetch = useFetch();

	const imageByBrand = useMemo(
		() => (categories ? getImageByBrand(categories) : {}),
		[categories],
	);

	const getLikeProducts = async () => {
		try {
			if (!user) return;

			const res = $fetch.get<LikeProduct[]>(`/products/likes/${user.user.id}`);

			setLikeProducts((await res).data);
		} catch (error) {
			console.log(error);
			setErrorToast();
		} finally {
			setIsFetching(false);
		}
	};

	useEffect(() => {
		if (!user) return;

		if (!ranEffect.current) {
			ranEffect.current = true;
			getLikeProducts();
		}
	}, [user]);

	return (
		<>
			<div className="mt-5 space-y-3">
				{isFetching ? (
					<ProductListSkelton />
				) : (
					<>
						{!!likeProducts.length ? (
							likeProducts.map((lP, index) => (
								<ProductItem
									href={`/product/${lP.product.id}`}
									key={index}
									product={lP.product}
									image_url={
										lP.product.image_url ||
										imageByBrand[lP.product.category_id][lP.product.brand_id]
									}
								/>
							))
						) : (
							<NotFound />
						)}
					</>
				)}
			</div>
		</>
	);
}
