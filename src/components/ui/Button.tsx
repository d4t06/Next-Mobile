"use client";

import { ButtonHTMLAttributes, FC, MouseEventHandler, ReactNode } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const classes = {
   primary: "rounded-[6px]  hover:brightness-90 text-[14px] bg-[#cd1818]",
   push: 'active:translate-y-[4px] active:before:shadow-none before:z-[-1] border-b-[4px] border-transparent  before:absolute before:content-[""] before:bg-[#cd1818] before:inset-0 before:shadow-[0_4px_0_#9e010d] transition-[transform] before:transition-shadow',
};

const buttonVariant = cva(
   "font-[500] text-white inline-flex disabled:opacity-[.6] relative justify-center items-center z-0",
   {
      variants: {
         variant: {
            primary: classes.primary,
            push: classes.push,
         },
         size: {
            primary: "px-[20px] py-[4px]",
            full: "w-full py-[4px]",
            clear: ''
         },
         rounded: {
            primary: "before:rounded-[8px] rounded-[8px]",
            lg: "before:rounded-[12px] rounded-[12px]",
         },
      },
      defaultVariants: {
         variant: "primary",
         size: "primary",
         rounded: "primary",
      },
   }
);

interface Props
   extends ButtonHTMLAttributes<HTMLButtonElement>,
      VariantProps<typeof buttonVariant> {
   children: ReactNode;
   href?: string;
   isLoading?: boolean;
   onClick?: MouseEventHandler;
   disabled?: boolean;
}

const Button: FC<Props> = ({
   className,
   children,
   variant,
   rounded,
   size,
   isLoading,
   href,
   disabled,
   onClick,
   ...props
}) => {
   if (href)
      return (
         <Link className={buttonVariant({ variant, size, className })} href={href}>
            <span>{children}</span>
         </Link>
      );
   return (
      <button
         type="button"
         onClick={(e) => (onClick ? onClick(e) : "")}
         {...props}
         className={
            buttonVariant({ variant, size, rounded, className }) +
            `${disabled ? " opacity-60 pointer-events-none" : ""}`
         }
         disabled={isLoading}
      >
         {isLoading ? <ArrowPathIcon className="h-5 w-5 animate-spin" /> : null}
         {!isLoading && <span className="font-[500]">{children}</span>}
      </button>
   );
};

export default Button;
