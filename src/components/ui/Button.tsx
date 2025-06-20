import { ArrowPathIcon } from "@heroicons/react/16/solid";
import { VariantProps, cva } from "class-variance-authority";
import Link from "next/link";
import { ReactNode } from "react";

const classes = {
   active: "before:shadow-none font-[500] translate-y-[2px] text-[#cd1818]",
   button__children: " flex space-x-1 items-center justify-center",
};

const ButtonVariant = cva("button relative z-0", {
   variants: {
      variant: {
         primary: "variant--primary",
         clear: "",
      },
      size: {
         clear: "",
         primary: "px-[15px] py-[5px]",
      },
      colors: {
         primary: "color--primary bg-[#cd1818] text-white",
         second: "color--second bg-white text-[#333]",
         third: "color--third bg-white text-[#333]",
         clear: "",
      },
      border: {
         primary: "before:border-[2px]",
         thin: "before:border-[1px]",
         clear: "before:border-b-[2px]",
      },
      fontWeight: {
         primary: "font-[500]",
         thin: "",
      },
   },
   defaultVariants: {
      size: "primary",
      colors: "primary",
      variant: "primary",
      border: "primary",
      fontWeight: "primary",
   },

   compoundVariants: [
      {
         className: "clear",
         border: "clear",
         colors: "clear",
         variant: "clear",
      },
   ],
});

interface Props extends VariantProps<typeof ButtonVariant> {
   onClick?: () => void;
   loading?: boolean;
   children: ReactNode;
   disabled?: boolean;
   className?: string;
   type?: HTMLButtonElement["type"];
   href?: string;
   active?: boolean;
   blank?: boolean;
}
export default function Button({
   onClick,
   disabled,
   type = "button",
   children,
   loading,
   className,
   size,
   variant,
   colors,
   href,
   active,
   blank,
   fontWeight,
   border,
}: Props) {
   const content = (
      <>
         {loading && <ArrowPathIcon className="w-[24px] animate-spin" />}
         {!loading && children}
      </>
   );

   return (
      <>
         {href ? (
            <Link
               href={href}
               aria-disabled={disabled}
               target={blank ? "_blank" : ""}
               className={`inline-block ${ButtonVariant({
                  variant,
                  size,
                  colors,
                  border,
                  fontWeight,
                  className,
               })} ${active ? classes.active : ""}`}
            >
               <span className={classes.button__children}>{content}</span>
            </Link>
         ) : (
            <button
               type={type || "button"}
               onClick={onClick}
               disabled={loading || disabled}
               className={`${ButtonVariant({
                  variant,
                  size,
                  colors,
                  border,
                  fontWeight,
                  className,
               })} ${active ? classes.active : ""}`}
            >

               {/* need to wrapped children into span
               cause' on old browser display:flex property doesn't work on button element */}
               <span className={classes.button__children}>{content}</span>
            </button>
         )}
      </>
   );
}
