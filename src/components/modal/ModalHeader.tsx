import { XMarkIcon } from "@heroicons/react/16/solid";
import { Dispatch, SetStateAction } from "react";

export default function ModalHeader({
   setIsOpenModal,
   title,
}: {
   title: string;
   setIsOpenModal: Dispatch<SetStateAction<boolean>>;
}) {
   return (
      <div className="flex justify-between mb-[15px]">
         <h1 className="text-[22px] text-[#333] font-[500] mr-[10px] line-clamp-1">{title}</h1>
         <button onClick={() => setIsOpenModal(false)}>
            <XMarkIcon className="w-[30px]"/>
         </button>
      </div>
   );
}
