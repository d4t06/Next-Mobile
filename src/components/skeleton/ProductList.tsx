import Skeleton from "@/components/Skeleton";

type Props = {
	qty?: number;
};

export default function ProductListSkelton({ qty = 6 }: Props) {
	return [...Array(qty).keys()].map((item) => (
		<div className="flex items-start" key={item}>
			<Skeleton className="h-16 w-16 flex-shrink-0" />
			<Skeleton className="ml-[10px] w-full sm:w-[260px] h-[24px]" />
		</div>
	));
}
