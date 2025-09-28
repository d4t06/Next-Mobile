import { useToastContext } from "@/stores/ToastContext";
import { useChatContext } from ".";

export default function useAIChat() {
	const { setMessages, setIsFetching } = useChatContext();
	const { setErrorToast } = useToastContext();

	const sendMessage = async (content: string) => {
		try {
			setIsFetching(true);

			setMessages((prev) => [
				...prev,
				{
					role: "user",
					message: content,
				},
			]);

			const res = await fetch("/api/chat", { method: "POST", body: content });
			const payload = (await res.json()) as string;

			setMessages((prev) => [
				...prev,
				{
					role: "bot",
					message: payload,
				},
			]);
		} catch (error) {
			console.log(error);
			setErrorToast();
		} finally {
			setIsFetching(false);
		}
	};

	return { sendMessage };
}
