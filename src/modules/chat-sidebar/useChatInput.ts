import { useEffect, useState } from "react";
import { useChatContext } from ".";

export default function useChatInput() {
	const { chatInputRef } = useChatContext();

	const [value, setValue] = useState("");

	const changeEventHanlder: EventListener = (e) => {
		setValue((e.target as HTMLTextAreaElement).value);
	};

	useEffect(() => {
		if (!chatInputRef.current) return;

		chatInputRef.current.style.height = "auto";

		if (chatInputRef.current.scrollHeight > chatInputRef.current.offsetHeight) {
			chatInputRef.current.style.height = chatInputRef.current.scrollHeight + "px";
		}
	}, [value]);

	useEffect(() => {
		chatInputRef.current?.addEventListener("change", changeEventHanlder);

		return () => {
			chatInputRef.current?.removeEventListener("change", changeEventHanlder);
		};
	});

	return { setValue };
}
