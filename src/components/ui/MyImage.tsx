import Image from "next/image";

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
      src={src || "/cho_vo_tri.jpg"}
      height={height}
      width={width}
    />
  );
}
