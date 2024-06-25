import Button from "@/components/ui/Button";
import { Bars3Icon } from "@heroicons/react/24/outline";

export default function ToggleSidebar() {
   const classes = {
      base: "!fixed z-[99] bottom-[30px] transition-[padding,opacity,transform] left-[16px]",
      hide: "opacity-0 translate-y-[30px]",
      show: "translate-y-[0] opacity-[1]",
   };

   return (
      <div className={`sm:hidden ${classes.base}`}>
         <Button colors={"third"} size={"clear"}>
            <label htmlFor="sidebar" className="p-[6px]">
               <Bars3Icon className="w-[22px] " />
            </label>
         </Button>
      </div>
   );
}
