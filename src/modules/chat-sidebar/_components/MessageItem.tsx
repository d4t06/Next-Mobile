import { Messsage } from "..";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
	message: Messsage;
};

export default function MessageItem({ message }: Props) {
	switch (message.role) {
		case "user":
			return (
				<div className="">
					<p className="p-1.5 px-2 bg-[--a-5-cl] rounded-md break-all line-clamp-2">
						{message.message}
					</p>
				</div>
			);
		case "bot":
			return (
				<div className="markdown-content [&>*]:mt-4 [&_li]:mt-2">
					<ReactMarkdown remarkPlugins={[remarkGfm]}>
						{message.message}
					</ReactMarkdown>
				</div>
			);
	}
}
