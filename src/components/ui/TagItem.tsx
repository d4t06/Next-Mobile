// import { TagIcon } from "@heroicons/react/24/outline";

type Props = {
	tag: Tag;
	className?: string;
};

export default function TagItem({ tag, className = "" }: Props) {
	return (
		<div className={`tag-item ${className}`}>
			<span>{tag.name}</span>
		</div>
	);
}
