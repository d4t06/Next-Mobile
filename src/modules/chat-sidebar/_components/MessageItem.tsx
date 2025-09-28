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
				<div className="text-right">
					<p className="inline-block p-1.5 px-2 text-right bg-[--a-5-cl] rounded-md break-normal whitespace-normal">
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
