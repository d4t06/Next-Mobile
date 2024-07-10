import Image from "next/image";

import simonCat from "@/assets/search-empty.png";

type Props = {
   src: string;
   width: number;
   height: number;
   alt?: string;
   className?: string;
};

export default function MyImage({ alt, height, src, width, className }: Props) {
   return (
      <Image
         className={className || ""}
         alt={alt || ""}
         src={src || simonCat}
         height={height}
         width={width}
      />
   );
}
