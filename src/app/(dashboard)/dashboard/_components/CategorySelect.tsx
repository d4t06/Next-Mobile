"use client";

import { useEffect, useState } from "react";
import { useCurrentCategoryContext } from "./CurrentCategoryContext";

type Props = {
	categories: Category[];
};

export default function CategorySelect({ categories }: Props) {
	const { setCurrentCategory } = useCurrentCategoryContext();

	const [curCategoryIndex, setCurCategoryIndex] = useState<number>();

	useEffect(() => {
		if (curCategoryIndex !== undefined) setCurrentCategory(categories[curCategoryIndex]);
	}, [curCategoryIndex, categories]);

	return (
		<div className="flex items-center space-x-3">
			<p className="faded-text">Category</p>
			<div className="primary-shadow rounded-md">
				<select
					disabled={!categories.length}
					className={`my-input min-w-[100px] bg-transparent`}
					name="category"
					onChange={(e) => setCurCategoryIndex(+e.target.value)}
				>
					<option value={undefined}>---</option>
					{!!categories.length &&
						categories.map((category, index) => (
							<option key={index} value={index}>
								{category.category_name}
							</option>
						))}
				</select>
			</div>
		</div>
	);
}
