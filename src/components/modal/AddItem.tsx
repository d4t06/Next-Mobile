import { FormEvent, useEffect, useState, useRef, ReactNode, RefObject } from "react";
import Button from "../ui/Button";
import ModalHeader from "./ModalHeader";
import MyInput, { inputClasses } from "@/components/ui/MyInput";

type Props = {
   closeModal: () => void;
   cbWhenSubmit: (value: string) => void;
   title: string;
   initValue?: string;
   children?: ReactNode;
   loading?: boolean;
   variant?: "input" | "text-are";
};

export default function AddItem({
   closeModal,
   cbWhenSubmit,
   title,
   initValue,
   loading,
   children,
   variant = "input",
}: Props) {
   const [value, setValue] = useState(initValue || "");
   const inputRef = useRef<HTMLInputElement>(null);

   useEffect(() => {
      inputRef.current?.focus();
   }, []);

   const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      cbWhenSubmit(value);
   };

   return (
      <div className="w-[300px] bg-[#fff]">
         <ModalHeader closeModal={closeModal} title={title} />
         <form action="" onSubmit={handleSubmit}>
            {variant === "input" && (
               <MyInput
                  className="w-full"
                  ref={inputRef}
                  placeholder="name..."
                  value={value}
                  cb={(value) => setValue(value)}
               />
            )}

            {variant === "text-are" && (
               <textarea
                  className={`w-full ${inputClasses.input}`}
                  ref={inputRef as RefObject<any>}
                  placeholder="name..."
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
               />
            )}

            {children}

            <p className="text-right mt-[20px]">
               <Button className="min-w-[70px]" loading={loading} type="submit">
                  Save
               </Button>
            </p>
         </form>
      </div>
   );
}
