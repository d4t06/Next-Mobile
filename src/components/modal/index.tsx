import { Dispatch, ReactNode, SetStateAction } from "react";
import { createPortal } from "react-dom";

type Props = {
   children?: ReactNode;
   setShowModal: Dispatch<SetStateAction<boolean>>;
};

function Modal({ children, setShowModal }: Props) {
   return (
      <>
         {createPortal(
            <>
               <div className="fixed inset-0 z-[99] bg-black/60" onClick={() => setShowModal(false)}></div>
               {children && <div className="absolute inset-0 z-[100]">{children}</div>}
            </>,
            document.querySelector("#portals")!
         )}
      </>
   );
}

export default Modal;
