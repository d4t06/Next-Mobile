"use client";

import { Frame, MyInput } from "@/components";
import { convertToEn } from "@/utils/appHelper";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

type Props = {
	q: string;
};

export default function SearchBar({ q }: Props) {
	const [value, setValue] = useState("");

	const router = useRouter();

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		router.push("/dashboard/product?q=" + convertToEn(value));
	};

	useEffect(() => {
		setValue(q);
	}, [q]);

	return (
		<Frame>
			<form onSubmit={handleSubmit} className="flex">
				<MyInput
					className="flex-grow bg-transparent p-0"
					value={value}
					cb={(v) => setValue(v)}
					placeholder={"..."}
				/>

				<button type="submit" className="p-1">
					<MagnifyingGlassIcon className="w-5" />
				</button>
			</form>
		</Frame>
	);
}
