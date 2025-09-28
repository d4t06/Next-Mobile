import { TrashIcon } from "@heroicons/react/16/solid";
import { useChatContext } from "..";
import MessageItem from "./MessageItem";
import { Button } from "@/components";
import useAIChat from "../useAIChat";
import { AddItem, Modal, ModalRef } from "@/components/modal";
import { useRef } from "react";

export default function MessageList() {
	const { messages, setMessages } = useChatContext();
	const { sendMessage } = useAIChat();

	const modalRef = useRef<ModalRef>(null);

	const handleSendMessage = (v: string) => {
		sendMessage(
			`find ${v}  weight, battery and material infomations, is it has robust chassis ?, is it upgradeable	 ? , is it quite when load ?, is it worthy to buy, reasons (assume at release) ? and critical issues if any, all answer in short`,
		);

		modalRef.current?.close();
	};

	return (
		<>
			<div className="flex-grow flex-col overflow-auto w-full [&>div]:my-3 text-sm">
				{messages.length
					? messages.map((m, i) => <MessageItem key={i} message={m} />)
					: ""}

				<div className="flex items-center justify-center gap-2 my-5">
					<Button onClick={() => modalRef.current?.open()} colors={"second"}>
						<span>Ask about product</span>
					</Button>
					{!!messages.length && (
						<Button onClick={() => setMessages([])} colors={"second"}>
							<span>Clear</span>
							<TrashIcon className="w-5" />
						</Button>
					)}
				</div>
			</div>

			<Modal ref={modalRef}>
				<AddItem cbWhenSubmit={handleSendMessage} title="Find about product" />
			</Modal>
		</>
	);
}
