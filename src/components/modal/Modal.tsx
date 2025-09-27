import {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useState,
	type MouseEventHandler,
	type ReactNode,
	type Ref,
	createContext,
	useContext,
	useRef,
} from "react";
import { createPortal } from "react-dom";

export type ModalRef = {
	open: () => void;
	close: () => void;
};

function useModal() {
	const [isOpen, setIsOpen] = useState(false);
	const persist = useRef(false);

	const closeModal = () => setIsOpen(false);

	return { isOpen, setIsOpen, closeModal, persist };
}

type ContextType = ReturnType<typeof useModal>;

const context = createContext<ContextType | null>(null);

export function useModalContext() {
	const ct = useContext(context);
	if (!ct) throw new Error("ModalContext not provided");

	return ct;
}

type Props = {
	children: ReactNode;
	onClose?: () => void;
};

function ModalContent({
	children,
	onClose,
	modalRef,
}: Props & { modalRef: Ref<ModalRef> }) {
	const { isOpen, setIsOpen, persist } = useModalContext();

	const [isMounted, setIsMounted] = useState(false);

	const open = () => {
		setIsOpen(true);
	};

	const close = () => {
		setIsMounted(false);
	};

	const handleOverlayClick: MouseEventHandler = (e) => {
		e.preventDefault();
		e.stopPropagation();

		if (persist.current) return;

		setIsMounted(false);
	};

	useImperativeHandle(modalRef, () => ({
		close,
		open,
	}));

	useEffect(() => {
		if (!isMounted) {
			setTimeout(() => {
				setIsOpen(false);
				persist.current = false;
			}, 300);
		}
	}, [isMounted]);

	useEffect(() => {
		if (isOpen) {
			setTimeout(() => {
				setIsMounted(true);
			}, 100);
		} else {
			onClose && onClose();
		}
	}, [isOpen]);

	const classes = {
		unMountedContent: "opacity-0 scale-[.95]",
		mountedContent: "opacity-100 scale-[1]",
		unMountedLayer: "opacity-0",
		mountedLayer: "opacity-40",
	};

	return (
		<>
			{isOpen &&
				createPortal(
					<div className="fixed inset-0 z-[99]">
						<div
							onClick={handleOverlayClick}
							className={`transition-opacity ease-in-out duration-200 absolute bg-black inset-0 z-[90]
                             ${isMounted ? classes.mountedLayer : classes.unMountedLayer}
                        `}
						></div>
						<div
							className={`absolute duration-200 transition-[transform,opacity] ease-in-out z-[99] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                            ${
															isMounted
																? classes.mountedContent
																: classes.unMountedContent
														}
                        `}
						>
							{children}
						</div>
					</div>,
					document.getElementById("portals")!,
				)}
		</>
	);
}

function Modal({ children, ...rest }: Props, ref: Ref<ModalRef>) {
	return (
		<context.Provider value={useModal()}>
			<ModalContent modalRef={ref} {...rest}>
				{children}
			</ModalContent>
		</context.Provider>
	);
}

export default forwardRef(Modal);

export function ModalContentWrapper({
	children,
	noStyle,
	disable,
	className = "w-[400px]",
}: {
	disable?: boolean;
	children: ReactNode;
	className?: string;
	noStyle?: boolean;
}) {
	return (
		<div
			className={`relative overflow-hidden max-h-[80vh] max-w-[90vw] flex flex-col  ${disable ? "disabled" : ""} ${!noStyle ? "p-3 md:p-4 rounded-xl" : ""}  bg-white dark:bg-slate-800 ${className}`}
		>
			{children}
		</div>
	);
}
