import { TrashIcon } from "@heroicons/react/16/solid";
import { useChatContext } from "..";
import MessageItem from "./MessageItem";
import { Button } from "@/components";
import { AddItem, Modal, ModalRef } from "@/components/modal";
import { useRef } from "react";

export default function MessageList() {
	const { messages, setMessages, chatInputRef } = useChatContext();

	const modalRef = useRef<ModalRef>(null);

	const handleSendMessage = (v: string) => {
		if (!chatInputRef.current) return;


 // tomshardware.com, laptopmedia.com, storagereview.com,

		chatInputRef.current.value = `${v} year release, material, cpu, display, ram (also show ram type), weight, battery infomation (assume base model). Is it has robust chassis ?, Is it has lightweight compare with it screen size ?, is it ram upgradeable ?, is it storage upgradeable ?, is it quite when load ?, props and critical issues if any ?. Find information from website notebookcheck.net if has, All answer in short`;

		const changeEvent = new Event("change");
		chatInputRef.current.dispatchEvent(changeEvent);

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
