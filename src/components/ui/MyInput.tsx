import { InputHTMLAttributes, Ref, forwardRef } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
   cb: (value: string) => void;
}

export const inputClasses = {
   input: "p-[6px] bg-[#f6f6f6] w-full pl-[12px] font-[500] rounded-[8px] placeholder:text-[#808080] outline-none text-[#333] border border-black/15",
};

function Input({ cb, className, type, ...props }: Props, ref: Ref<any>) {
   return (
      <input
         ref={ref}
         onChange={(e) => cb(e.target.value)}
         type={type || "text"}
         className={`${inputClasses.input} ${className} `}
         {...props}
      />
   );
}

export default forwardRef(Input);
