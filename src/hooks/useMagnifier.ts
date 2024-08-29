"use client";

import { RefObject, useRef } from "react";

type Props = {
   magnifierRef: RefObject<HTMLDivElement>;
   preChangePosition?: boolean;
};

// const MAG_HEIGHT = 2 / 3;
// const MAG_WIDTH = 2 / 3;
const SPACER = 20;

export default function useMagnifier({
   magnifierRef,
   preChangePosition,
}: Props) {
   const ZOOM_FACTOR = useRef(3);

   const update = (e: MouseEvent) => {
      const magnifierEle = magnifierRef.current;
      const imageEle = e.target as HTMLImageElement;

      if (!magnifierEle) return;

      const imageRect = imageEle.getBoundingClientRect();
      const mousePosInImage = { x: 0, y: 0 };
      const newBgPosCssProp = { x: "0px", y: "0px" };
      const newMagPos = {
         x: e.clientX - (magnifierEle.clientWidth + SPACER),
         y: e.clientY + SPACER,
      };

      mousePosInImage.x = e.clientX - imageRect.left;
      mousePosInImage.y = e.clientY - imageRect.top;

      // because the image in mag bigger ZOOM_FACTOR times
      // magnifierEle.clientWidth / 2 -> move the zoom area center the pointer
      const newBgPosX =
         mousePosInImage.x * ZOOM_FACTOR.current - magnifierEle.clientWidth / 2;

      const newBgPosY =
         mousePosInImage.y * ZOOM_FACTOR.current -
         magnifierEle.clientHeight / 2;

      newBgPosCssProp.x = `-${newBgPosX}px`;
      newBgPosCssProp.y = `-${newBgPosY}px`;

      if (newBgPosX < 0) newBgPosCssProp.x = "0px"; // near left
      if (newBgPosY < 0) newBgPosCssProp.y = "0px"; // near top

      // near right
      // imageWidthRest * ZOOM_FACTOR.current -> actually size
      // magnifierEle.clientWidth / 2
      // -> because we had move the zoom area to the center of pointer
      const imageWidthRest = imageEle.clientWidth - mousePosInImage.x;
      if (
         imageWidthRest * ZOOM_FACTOR.current + magnifierEle.clientWidth / 2 <
         magnifierEle.clientWidth
      ) {
         newBgPosCssProp.x = "100%";
      }

      // near bottom
      const imageHeightRest = imageEle.clientHeight - mousePosInImage.y;
      if (
         imageHeightRest * ZOOM_FACTOR.current + magnifierEle.clientHeight / 2 <
         magnifierEle.clientHeight
      ) {
         newBgPosCssProp.y = "100%";
      }

      // if (magnifierEle.clientWidth + SPACER > e.clientX)
      //    newMagPos.x = newMagPos.x + (magnifierEle.clientWidth + 2 * SPACER);
      if (
         (preChangePosition && imageRect.left < magnifierEle.clientWidth) ||
         magnifierEle.clientWidth + SPACER > e.clientX
      ) {
         newMagPos.x = newMagPos.x + (magnifierEle.clientWidth + 2 * SPACER);
      }

      if (e.clientY + magnifierEle.clientHeight + SPACER > window.innerHeight)
         newMagPos.y = newMagPos.y - (magnifierEle.clientHeight + 2 * SPACER);

      magnifierEle.style.left = newMagPos.x + "px";
      magnifierEle.style.top = newMagPos.y + "px";

      magnifierEle.style.backgroundPosition = `${newBgPosCssProp.x} ${newBgPosCssProp.y}`;
   };

   const handleMouseEnter = (e: MouseEvent) => {
      const magnifierEle = magnifierRef.current;
      if (!magnifierEle) return;

      const imageEle = e.target as HTMLImageElement;
      if (!imageEle) return;

      // const magSize = {
      //    width: +(imageEle.clientWidth * MAG_WIDTH).toFixed(0),
      //    height: +(imageEle.clientHeight * MAG_HEIGHT).toFixed(0),
      // };

      if (imageEle.width < 200) ZOOM_FACTOR.current = 3.5;
      else if (imageEle.width < 350) ZOOM_FACTOR.current = 3;
      else ZOOM_FACTOR.current = 2;

      magnifierEle.style.width =
         imageEle.width * ZOOM_FACTOR.current >= 0.4 * window.innerWidth
            ? "40vw"
            : // (imageEle.clientWidth * MAG_WIDTH).toFixed(0) + "px";
              imageEle.width * ZOOM_FACTOR.current + "px";

      magnifierEle.style.height =
         imageEle.height * ZOOM_FACTOR.current >= 0.4 * window.innerHeight
            ? "40vh"
            : // (imageEle.clientHeight * MAG_HEIGHT).toFixed(0) + "px";
              imageEle.height * ZOOM_FACTOR.current + "px";

      magnifierEle.style.display = "block";
      magnifierEle.style.backgroundImage = `url(${imageEle.src})`;
      magnifierEle.style.backgroundSize = `
      ${imageEle.width * ZOOM_FACTOR.current}px ${
         imageEle.clientHeight * ZOOM_FACTOR.current
      }px`;

      update(e);
   };

   const handleMouseMove = (e: MouseEvent) => {
      update(e);
   };

   const handleMouseLeave = () => {
      const magnifierEle = magnifierRef.current;
      if (!magnifierEle) return;

      magnifierEle.style.display = "none";
   };

   return { handleMouseEnter, handleMouseMove, handleMouseLeave };
}
