import htmr from "htmr";
import Image from "next/image";

type Props = {
	content: string;
};

export default function HTMLConent({ content }: Props) {
	// will return <Paragraph><span>{'Custom component'}</span></Paragraph>
	return htmr(content, {
		transform: {
			img: (props) => <Image {...props} width={800} height={600} />,
		},
	});
}
