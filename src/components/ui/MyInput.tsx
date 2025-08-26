import { InputHTMLAttributes, Ref, forwardRef } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  cb: (value: string) => void;
  bg?:string
}

function Input({ cb, bg = 'bg-[#f1f1f1] dark:bg-slate-700', className, type, ...props }: Props, ref: Ref<any>) {
  return (
    <input
      ref={ref}
      onChange={(e) => cb(e.target.value)}
      type={type || "text"}
      className={`my-input  ${className} `}
      {...props}
    />
  );
}

export default forwardRef(Input);
