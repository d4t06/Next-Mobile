import {
	PencilIcon,
	PencilSquareIcon,
	PhotoIcon,
	TrashIcon,
} from "@heroicons/react/24/outline";
import simonCat from "@/assets/search-empty.png";
import Popup, {
	PopupContent,
	PopupContentWrapper,
	PopupTrigger,
} from "@/components/ui/Popup";
import { BrandListModal } from "./BrandList";

type Props = {
	openModal: (m: BrandListModal) => void;
	brand: Brand;
};

export default function BrandListItem({ brand, openModal }: Props) {
	const classes = {
		brandItem:
			" bg-[#f6f6f6] mt-[10px] ml-[10px] px-[18px] py-[8px] border border-[#ccc] rounded-[8px]",
		brandItemTop: "flex justify-center",
		cta: "ml-[10px] pl-[10px] border-[#ccc] border-l-[1px] flex items-center space-x-[4px] text-[#333]",
	};

	return (
		<div className={classes.brandItem}>
			<div className={classes.brandItemTop}>
				<span className="text-[14px]">{brand.brand_name}</span>
				<div className={classes.cta}>
					<button className="hover:text-[#cd1818]" onClick={() => openModal("delete")}>
						<TrashIcon className="w-[22px]" />
					</button>

					<Popup className="inline-flex">
						<PopupTrigger>
							<button className="hover:text-[#cd1818]">
								<PencilSquareIcon className="w-[22px]" />
							</button>
						</PopupTrigger>

						<PopupContent className="top-full" appendTo="parent">
							<PopupContentWrapper>
								<button onClick={() => openModal("edit-name")}>
									<PencilIcon className="w-5" />
									<span>Name</span>
								</button>
								<button onClick={() => openModal("image")}>
									<PhotoIcon className="w-5" />

									<span>Image</span>
								</button>
							</PopupContentWrapper>
						</PopupContent>
					</Popup>
				</div>
			</div>

			<img className="mx-auto mt-3 w-[80px] h-[80px]" src={brand.image_url || simonCat.src} />
		</div>
	);
}
