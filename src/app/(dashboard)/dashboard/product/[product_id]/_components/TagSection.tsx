"use client";

import { Title } from "@/components";
import TagItem from "@/components/ui/TagItem";
import AddTagBtn from "./AddTagBtn";
import { useCurrentCategoryContext } from "../../../_components/CurrentCategoryContext";
import { useCurrentProductContext } from "../CurrentProductContext";

export default function TagSection() {
	const { product } = useCurrentProductContext();
	const { currentCategory } = useCurrentCategoryContext();

	if (!currentCategory) return <></>;

	return (
		<>
			<div className="flex justify-between items-center">
				<Title title="Tag" variant={"h2"} />
				<AddTagBtn tags={currentCategory?.tags} product={product} />
			</div>

			<div className="flex flex-wrap gap-2">
				{product.product_tags.length
					? product.product_tags.map((pT, i) => <TagItem key={i} tag={pT.tag} />)
					: "..."}
			</div>
		</>
	);
}
