import { AddItem } from "@/components/modal";
import { useCurrentProductContext } from "../CurrentProductContext";
import useFeatureAction from "../_hooks/useFeatureAction";
import { useState } from "react";
import { Button } from "@/components";
import { useModalContext } from "@/components/modal/Modal";

type Add = {
	variant: "Add";
};

type Edit = {
	variant: "Edit";
	feature: ProductFeature;
};

export default function AddFeatureModal(props: Add | Edit) {
	const { closeModal } = useModalContext();
	const { product } = useCurrentProductContext();
	const { action, isFetching } = useFeatureAction();

	const [value, setValue] = useState(props.variant === "Add" ? "" : props.feature.value);

	const handleSelect = (att: ProductAttribute) => {
		setValue((prev) => (prev ? prev + ", " + att.value : att.value));
	};

	const handleSubmit = async () => {
		props.variant === "Add"
			? await action({
					type: "Add",
					value,
				})
			: await action({
					type: "Edit",
					value,
					id: props.feature.id,
				});

		closeModal();
	};

	return (
		<AddItem
			valueFromProps={value}
			setValueFromProp={setValue}
			cbWhenSubmit={handleSubmit}
			title={`${props.variant} feature`}
			loading={isFetching}
		>
			<div className="mt-5 flex gap-2 flex-wrap">
				{product.attributes.map((att, i) => {
					return (
						<Button
							key={i}
							colors={"second"}
							className="px-1.5 py-0.5"
							onClick={() => handleSelect(att)}
							size={"clear"}
						>
							{att.value}
						</Button>
					);
				})}
			</div>
		</AddItem>
	);
}
