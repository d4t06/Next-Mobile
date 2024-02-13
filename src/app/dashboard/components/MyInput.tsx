import { InputHTMLAttributes, Ref, forwardRef } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
   cb: (value: string) => void;
}

export const inputClasses = {
   input: "p-[6px] pl-[12px] bg-[#f1f1f1] w-full h-full rounded-[12px] placeholder:text-[#808080] outline-none text-[#333] border border-black/10 text-[16px] translate-y-[-4px]",
};

function Input({ cb, className, type, ...props }: Props, ref: Ref<any>) {
   return (
      <div className="bg-[#ccc] rounded-[12px] w-full">
         <input
            ref={ref}
            onChange={(e) => cb(e.target.value)}
            type={type || "text"}
            className={`${inputClasses.input} ${className} `}
            {...props}
         />
      </div>
   );
}

export default forwardRef(Input);
