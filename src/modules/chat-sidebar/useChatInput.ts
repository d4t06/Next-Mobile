import { useEffect, useRef, useState } from "react";

export default function useChatInput() {
	const [value, setValue] = useState("");

	const textareaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (!textareaRef.current) return;

		textareaRef.current.style.height = "auto";

		if (textareaRef.current.scrollHeight > textareaRef.current.offsetHeight) {
			textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
		}
	}, [value]);

	return { value, setValue, textareaRef };
}
