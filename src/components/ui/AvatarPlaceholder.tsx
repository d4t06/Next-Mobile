import { generateHSL } from "@/utils/generateHsl";

type Props = {
   name: string;
};

export default function Avatar({ name }: Props) {
   return (
      <div
         className="w-[44px] h-[44px] rounded-full flex items-center justify-center"
         style={{ backgroundColor: generateHSL(name) }}
      >
         <span className="text-[#fff] text-xl">{name.charAt(0).toUpperCase()}</span>
      </div>
   );
}
