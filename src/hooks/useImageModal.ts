"use client";

import {
   DOMAttributes,
   MouseEventHandler,
   TouchEventHandler,
   WheelEvent,
   useEffect,
   useRef,
   useState,
} from "react";

type Props = {
   src: string;
};

const MAX_ZOOM = 3;

export default function useImageModal({ src }: Props) {
   const [isZoomAble, setIsZoomAble] = useState(true);
   const [isDrag, setIsDrag] = useState(false);

   const imageRef = useRef<HTMLImageElement>(null);

   const transform = useRef({ x: 0, y: 0 });
   const prevTransform = useRef({ x: 0, y: 0 });
   const currentImageSize = useRef({ height: 0, width: 0 });
   const mousePos = useRef({ x: 0, y: 0 });
   const mousePosRatio = useRef({ x: 0, y: 0 });

   const scale = useRef(1);

   const update = () => {
      const imageEle = imageRef.current;
      if (!imageEle) return;

      imageEle.style.transform = `translate(${-transform.current.x}px, ${-transform
         .current.y}px) scale(${scale.current})`;
   };

   const updateMousePos = (clientX: number, clientY: number) => {
      const imageEle = imageRef.current;
      if (!imageEle) return 1;

      const mousePositionInImage = { x: 0, y: 0 };
      const imageRect = imageEle.getBoundingClientRect();

      mousePositionInImage.x = clientX - imageRect.left;
      mousePositionInImage.y = clientY - imageRect.top;

      (mousePosRatio.current.x = +(
         mousePositionInImage.x / currentImageSize.current.width
      ).toFixed(2)),
         (mousePosRatio.current.y = +(
            mousePositionInImage.y / currentImageSize.current.height
         ).toFixed(2));

      return 0;
   };

   const autoFit = () => {
      const imageEle = imageRef.current;
      if (!imageEle) return;

      const SPACER = 20;
      const imageRect = imageEle.getBoundingClientRect();

      const isFlowHeight = currentImageSize.current.height > window.innerHeight;
      const isFlowWidth = currentImageSize.current.width > window.innerWidth;

      const isCover = {
         top: imageRect.top < 50 + SPACER,
         bottom: imageRect.bottom > window.innerHeight - SPACER,
         left: imageRect.left < SPACER,
         right: imageRect.right > window.innerWidth - SPACER,
      };

      const isContain = !isFlowHeight && !isFlowWidth;

      const isFlowOutOfScreen =
         isCover.top && isCover.bottom && isCover.left && isCover.right;

      if (isFlowOutOfScreen || isContain) {
         setIsDrag(false);
         return;
      } else {
         //  imageEle.style.transition = "transform linear .15s";
      }

      const newTransform = {
         x: transform.current.x,
         y: transform.current.y,
      };

      if (!(!isCover.top && !isCover.bottom)) {
         if (!isCover.top) newTransform.y += imageRect.top - (50 + SPACER);
         if (!isCover.bottom)
            newTransform.y -= window.innerHeight - SPACER - imageRect.bottom;
      }
      if (!isCover.left) newTransform.x += imageRect.left - SPACER;
      if (!isCover.right) newTransform.x -= window.innerWidth - SPACER - imageRect.right;

      transform.current.x = newTransform.x;
      transform.current.y = newTransform.y;

      setIsDrag(false);
      update();

      //   setTimeout(() => {
      //      imageEle.style.transition = "none";
      //   }, 200);
   };

   const startDrag = (clientX: number, clientY: number) => {
      mousePos.current.x = clientX;
      mousePos.current.y = clientY;

      prevTransform.current.x = transform.current.x;
      prevTransform.current.y = transform.current.y;

      const err = updateMousePos(clientX, clientY);
      if (err) return;

      setIsDrag(true);
   };

   const drag = (clientX: number, clientY: number) => {
      if (!isDrag || scale.current === 1) return;

      const imageEle = imageRef.current;
      if (!imageEle) return;

      const disX = clientX - mousePos.current.x;
      const disY = clientY - mousePos.current.y;

      transform.current.x = prevTransform.current.x - disX;
      transform.current.y = prevTransform.current.y - disY;

      update();
   };

   const stopDrag = (clientX: number, clientY: number, skipZoom?: boolean) => {
      if (clientX === mousePos.current.x && clientY === mousePos.current.y) {
         if (!skipZoom) {
            switch (scale.current) {
               case 1: {
                  zoom(MAX_ZOOM);
                  break;
               }
               case MAX_ZOOM: {
                  zoom(1);
                  break;
               }
            }
         }

         setIsDrag(false);
         return;
      }

      autoFit();
   };

   const zoom = (factor: number) => {
      let newScale = factor;

      if (newScale == scale.current) return;
      //   if reach limit
      if (newScale > scale.current) {
         if (scale.current === MAX_ZOOM) return;
      }

      if (newScale > MAX_ZOOM) newScale = MAX_ZOOM;
      if (newScale < 1) newScale = 1;

      scale.current = newScale;

      const imageEle = imageRef.current;
      if (!imageEle) return;
      const newImageSize = {
         width: imageEle.clientWidth * scale.current,
         height: imageEle.clientHeight * scale.current,
      };

      const diffW = newImageSize.width - imageEle.clientWidth;
      const diffH = newImageSize.height - imageEle.clientHeight;

      transform.current.x = diffW * mousePosRatio.current.x;
      transform.current.y = diffH * mousePosRatio.current.y;

      currentImageSize.current.height = newImageSize.height;
      currentImageSize.current.width = newImageSize.width;

      if (scale.current === 1) setIsZoomAble(true);
      else if (scale.current === MAX_ZOOM) setIsZoomAble(false);

      update();
   };

   const handleWheel = (e: WheelEvent<HTMLImageElement>) => {
      const factor = 0.5;

      const imageEle = imageRef.current;
      if (!imageEle) return;

      const isZoomIn = e.deltaY < 0;

      if (isZoomIn) {
         const err = updateMousePos(e.clientX, e.clientY);
         if (err) return;

         setIsZoomAble(false);
         zoom(scale.current + factor);
      } else {
         zoom(scale.current - factor);
      }
   };

   const handleMouseDown: MouseEventHandler<HTMLImageElement> = (e) => {
      startDrag(e.clientX, e.clientY);
   };

   const handleMouseMove: MouseEventHandler<HTMLImageElement> = (e) => {
      drag(e.clientX, e.clientY);
   };
   const handleMouseUp: MouseEventHandler<HTMLImageElement> = (e) => {
      stopDrag(e.clientX, e.clientY);
   };

   const handleTouchStart: TouchEventHandler<HTMLImageElement> = (e) => {
      console.log("touch start");

      startDrag(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
   };

   const handleTouchMove: TouchEventHandler<HTMLImageElement> = (e) => {
      e.preventDefault();
      drag(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
   };

   const handleTouchEnd: TouchEventHandler<HTMLImageElement> = (e) => {
      console.log("touch end");

      stopDrag(e.changedTouches[0].clientX, e.changedTouches[0].clientY, true);
   };

   useEffect(() => {
      const imageEle = imageRef.current;
      if (imageEle) {
         currentImageSize.current.height = imageEle.clientHeight;
         currentImageSize.current.width = imageEle.clientWidth;
      }

      return () => {
         scale.current = 1;
         setIsDrag(false);
      };
   }, [src]);

   const attributeObj: DOMAttributes<HTMLImageElement> = {
      onMouseDown: handleMouseDown,
      onTouchStart: handleTouchStart,

      onMouseMove: handleMouseMove,
      onTouchMove: handleTouchMove,

      onMouseUp: handleMouseUp,
      onTouchEnd: handleTouchEnd,

      onWheel: handleWheel,
   };

   return {
      attributeObj,
      imageRef,
      isDrag,
      isZoomAble,
   };
}
