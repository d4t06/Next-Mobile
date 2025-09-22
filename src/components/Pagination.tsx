import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { Button } from ".";
import Link from "next/link";

type Props = {
	page: number;
	href: string;
	isHasNextPage: boolean;
	query?: Record<string, any>;
};

export default function Pagination({ page, href, isHasNextPage, query = {} }: Props) {
	return (
		<>
			<div className="flex mt-5 justify-center space-x-3 ">
				<Link
					aria-disabled={page === 1}
					href={{ pathname: href, query: { ...query, page: page - 1 } }}
				>
					<Button
						fontWeight={"semibold"}
						size={"clear"}
						className="pr-3 pl-2 py-1"
						colors={"second"}
					>
						<ChevronLeftIcon className="w-6" />
						<span>Previous</span>
					</Button>
				</Link>

				<Link
					href={{ pathname: href, query: { ...query, page: page + 1 } }}
					aria-disabled={!isHasNextPage}
				>
					<Button
						fontWeight={"semibold"}
						size={"clear"}
						className="pr-2 pl-3 py-1"
						colors={"second"}
					>
						<span>Next</span>
						<ChevronRightIcon className="w-6" />
					</Button>
				</Link>
			</div>
		</>
	);
}
