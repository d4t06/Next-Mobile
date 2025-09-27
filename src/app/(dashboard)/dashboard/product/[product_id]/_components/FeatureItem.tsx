import { useRef, useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { AddItem, Modal, ModalRef } from "@/components/modal";
import ConfirmModal from "@/components/modal/Confirm";
import ItemRightCtaFrame from "@/components/dashboard/ItemRightCta";
import useFeatureAction from "../_hooks/useFeatureAction";

type Props = {
	feature: ProductFeature;
};

type Modal = "edit" | "delete";

export default function FeatureItem({ feature }: Props) {
	const [modal, setModal] = useState<Modal | "">("");

	const modalRef = useRef<ModalRef>(null);

	const { action, isFetching } = useFeatureAction();

	const openModal = (m: Modal) => {
		setModal(m);

		modalRef.current?.open();
	};

	return (
		<>
			<ItemRightCtaFrame>
				<span>{feature.value}</span>

				<div>
					<button className="" onClick={() => openModal("edit")}>
						<PencilIcon className="w-5" />
					</button>
					<button onClick={() => openModal("delete")}>
						<TrashIcon className="w-5" />
					</button>
				</div>
			</ItemRightCtaFrame>

			<Modal ref={modalRef}>
				{modal === "edit" && (
					<AddItem
						cbWhenSubmit={(v) =>
							action({
								type: "Edit",
								id: feature.id,
								value: v,
							})
						}
						title="Edit feature"
						loading={isFetching}
					/>
				)}

				{modal === "delete" && (
					<ConfirmModal
						callback={() => action({ type: "Delete", id: feature.id })}
						loading={isFetching}
						label={`Delete feature `}
					/>
				)}
			</Modal>
		</>
	);
}
