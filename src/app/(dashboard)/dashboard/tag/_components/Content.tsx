"use client";

import Searchbar from "@/components/dashboard/SearchBar";
import AddNewTagButton from "./AddNewTagBtn";
import TagItem from "./TagItem";
import { NotFound } from "@/components";
import useSearchTag from "../_hooks/useSearchTag";

type Props = {
	tags: Tag[];
};

export default function Content({ tags }: Props) {
	const { value, setValue, _tags } = useSearchTag({ tags });

	return (
		<>
			<div className="flex justify-between items-start mt-3">
				<div className="max-w-[400px]">
					<Searchbar
						className=""
						value={value}
						setValue={setValue}
						handleSubmit={() => {}}
					/>
				</div>
				<AddNewTagButton value={value} />
			</div>

			<div className="mt-5 space-y-5">
				{_tags.length ? (
					<div className="flex flex-wrap -mt-2  -mx-2">
						{_tags.map((t, i) => (
							<TagItem tag={t} key={i} />
						))}
					</div>
				) : (
					<NotFound />
				)}
			</div>
		</>
	);
}
