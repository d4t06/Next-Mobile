"use client";

import { Title } from "@/components";
import { useCurrentCategoryContext } from "../../../_components/CurrentCategoryContext";
import { useCurrentProductContext } from "../CurrentProductContext";
import FeatureItem from "./FeatureItem";
import AddFeatureBtn from "./AddFeatureBtn";

export default function FeatureSection() {
	const { product } = useCurrentProductContext();
	const { currentCategory } = useCurrentCategoryContext();

	if (!currentCategory) return <></>;

	return (
		<>
			<div className="flex justify-between items-center">
				<Title title="Feature" variant={"h2"} />
				<AddFeatureBtn />
			</div>

			<div className="flex flex-wrap gap-2">
				{product.features.length
					? product.features.map((f, i) => <FeatureItem key={i} feature={f} />)
					: "..."}
			</div>
		</>
	);
}
