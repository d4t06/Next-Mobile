import {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useState,
	type MouseEventHandler,
	type ReactNode,
	type Ref,
} from "react";
import { createPortal } from "react-dom";

export type ModalRef = {
	open: () => void;
	close: () => void;
};

type Props = {
	children: ReactNode;
};

function Modal({ children }: Props, ref: Ref<ModalRef>) {
	const [isOpen, setIsOpen] = useState(false);
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

		setIsMounted(false);
	};

	useImperativeHandle(ref, () => ({
		close,
		open,
	}));

	useEffect(() => {
		if (!isMounted) {
			setTimeout(() => {
				setIsOpen(false);
			}, 400);
		}
	}, [isMounted]);

	useEffect(() => {
		if (isOpen) {
			setTimeout(() => {
				setIsMounted(true);
			}, 100);
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
							className={`transition-opacity duration-300 absolute bg-black inset-0 z-[90]
                             ${isMounted ? classes.mountedLayer : classes.unMountedLayer}
                        `}
						></div>
						<div
							className={`absolute duration-300 transition-[transform,opacity] z-[99] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
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

export default forwardRef(Modal);

type WrapperProps = {
	className?: string;
	children: ReactNode;
	style?: string;
};

export function ModalWrapper({
	children,
	className = "w-[400px]",
	style = "rounded-lg bg-white overflow-hidden p-3",
}: WrapperProps) {
	return (
		<div className={` flex flex-col max-h-[80vh] max-w-[90vw] ${style} ${className}`}>
			{children}
		</div>
	);
}
