import Image from "next/image";

import simonCat from "@/assets/search-empty.png";
import { ReactEventHandler } from "react";

type Props = {
  src: string;
  width: number;
  height: number;
  alt?: string;
  className?: string;
  onLoad?: ReactEventHandler<HTMLImageElement>;
};

export default function MyImage({ alt, height, src, width, className, onLoad }: Props) {
  return (
    <Image
      onLoad={onLoad}
      className={className || ""}
      alt={alt || ""}
      src={src || simonCat}
      height={height}
      width={width}
    />
  );
}
