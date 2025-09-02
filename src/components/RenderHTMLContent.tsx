import htmr from "htmr";
import Image from "next/image";

type Props = {
	content: string;
};

export default function HTMLConent({ content }: Props) {
	return htmr(content, {
		transform: {
			img: (props) => (
				// @ts-ignore
				<Image
					data-src={props.src}
					alt="i don't know"
					{...props}
					width={1000}
					height={700}
				/>
			),
		},
	});
}
