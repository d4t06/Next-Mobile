import { generateHSL } from "@/utils/generateHsl";

type Props = {
  name: string;
  className?: string;
};

export default function Avatar({ name, className = "w-[44px] h-[44px]" }: Props) {
  return (
    <div
      className={`rounded-full flex items-center justify-center ${className}`}
      style={{ backgroundColor: generateHSL(name) }}
    >
      <span className="text-xl text-white font-bold">{name.charAt(0).toUpperCase()}</span>
    </div>
  );
}
