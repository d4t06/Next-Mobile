"use client";
import { useEffect, useState, useRef, Dispatch, SetStateAction, useMemo } from "react";

import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useImage } from "@/stores/ImageContext";
import { publicRequest } from "@/utils/request";
import Button from "./ui/Button";
import Image from "next/image";
import Skeleton from "./Skeleton";

type Props = {
   setImageUrl: (image_url: string) => void;
   setIsOpenModal: Dispatch<SetStateAction<boolean>>;
   multiple?: boolean;
};

type getImagesRes = {
   page: number;
   images: ImageType[];
   pageSize: number;
   count: number;
};

const IMAGE_URL = "/images";

function Gallery({ setImageUrl, setIsOpenModal }: Props) {
   const [active, setActive] = useState<ImageType>();
   const [status, setStatus] = useState<"loading" | "success" | "fetching" | "error">("loading");

   const ranUseEffect = useRef(false);

   // hooks
   const {
      imageStore: { status: imageStoreStatus, currentImages, tempImages, page },
      storeImages,
   } = useImage();

   const formatSize = (size: number) => {
      const units = ["Kb", "Mb"];
      let mb = 0;

      if (size < 1024) return size + units[mb];
      while (size > 1024) {
         size -= 1024;
         mb++;
      }

      return mb + "," + size + units[1];
   };

   const ableToChosenImage = !!active;

   const isLoading = status === "fetching" || status === "loading";

   const handleSubmit = () => {
      if (!active) return;
      setImageUrl(active.image_url);
      setIsOpenModal(false);
   };

   const handleDeleteImage = async () => {
      try {
         if (!active || !active.public_id) return;

         setStatus("fetching");
         const controller = new AbortController();

         await publicRequest.delete(`${IMAGE_URL}/${active.public_id}`);

         const newImages = currentImages.filter((image) => image.public_id !== active.public_id);
         storeImages({ currentImages: newImages });

         return () => {
            controller.abort();
         };
      } catch (error) {
         console.log({ message: error });
      } finally {
         setStatus("success");
      }
   };

   const getImages = async (page: number = 1) => {
      try {
         const res = await publicRequest.get(`${IMAGE_URL}?page=${page}`);
         const data = res.data as getImagesRes;

         const newImages = [...currentImages, ...data.images];
         storeImages({
            count: data.count,
            pageSize: data.pageSize,
            page: data.page,
            currentImages: newImages,
            status: "success",
         });

         setStatus("success");
      } catch (error) {
         console.log({ message: error });
         setStatus("error");
      }
   };

   const classes = {
      container: "w-[90vw] h-[80vh] overflow-hidden",
      imageContainer: "relative pt-[100%]",
      imageFrame:
         "absolute flex  w-full items-center justify-center bg-[#f1f1f1] inset-0 rounded-[8px] border-[2px] border-[#ccc] hover:border-[#cd1818] overflow-hidden",
      galleryTop:
         "h-[40px] flex justify-between items-center border-b border-[#ccc] mb-[10px] pb-[10px]",
      galleryBody: "flex mx-[-10px]",
      bodyLeft:
         "h-[calc(80vh-60px)] w-2/3 no-scrollbar px-[10px] overflow-x-hidden overflow-y-auto",
      bodyRight: "px-[10px] w-1/3 overflow-hidden border-l-[2px] space-y-[14px]",
   };

   const imageSkeleton = useMemo(
      () =>
         [...Array(18).keys()].map((item) => (
            <div key={item} className={"w-1/6 px-[4px] mt-[8px]"}>
               <Skeleton className="pt-[100%]" />
            </div>
         )),
      []
   );

   const renderImages = useMemo(() => {
      if (currentImages.length)
         return currentImages.map((item, index) => {
            return (
               <div key={index} className={"px-[4px] relative w-1/6 mt-[8px]"}>
                  <div className={classes.imageContainer}>
                     <div
                        onClick={() => setActive(item)}
                        className={`${classes.imageFrame}
                        ${active?.id === item.id ? "border-[#cd1818]" : ""}`}
                     >
                        <Image
                           width={200}
                           height={200}
                           className="w-full h-auto"
                           src={item.image_url}
                           alt="img"
                        />
                     </div>
                  </div>
               </div>
            );
         });
      else return <p>No image jet...</p>;
   }, [active, currentImages]);

   const renderTempImages = useMemo(
      () =>
         !!tempImages.length &&
         tempImages.map((item, index) => {
            return (
               <div key={index} className={"px-[4px] w-1/6 mt-[8px]"}>
                  <div className={classes.imageContainer}>
                     <div className={classes.imageFrame}>
                        <Image
                           className="opacity-[.4]"
                           src={item.image_url}
                           alt="img"
                           width={200}
                           height={200}
                        />
                        <ArrowPathIcon className="animate-spin absolute duration-1000 text-[#000] w-[30px]" />
                     </div>
                  </div>
               </div>
            );
         }),
      [tempImages]
   );

   useEffect(() => {
      if (currentImages.length) {
         setTimeout(() => {
            setStatus("success");
         }, 300);
         return;
      }

      if (!ranUseEffect.current) {
         ranUseEffect.current = true;
         getImages();
      }
   }, []);

   return (
      <div className={classes.container}>
         <div className={classes.galleryTop}>
            <div className={"flex items-center"}>
               <h1 className="text-[22px] font-[500]">Gallery</h1>
               <Button className="ml-[10px] !p-0">
                  <label
                     className={`px-[20px] py-[4px] cursor-pointer inline-block ${
                        isLoading ? "opacity-60 pointer-events-none" : ""
                     }`}
                     htmlFor="image_upload"
                  >
                     Upload
                  </label>
               </Button>
            </div>

            <Button disabled={!ableToChosenImage} onClick={handleSubmit} variant={"primary"}>
               Chọn
            </Button>
         </div>
         <div className={classes.galleryBody}>
            <div className={classes.bodyLeft}>
               <div className="flex flex-wrap mt-[-8px]">
                  {status === "success" ? (
                     <>
                        {renderTempImages}
                        {renderImages}
                     </>
                  ) : (
                     <>{status !== "loading" && <p>Some thing went wrong</p>}</>
                  )}

                  {status === "loading" && imageSkeleton}
               </div>

               {!!currentImages.length && (
                  <div className="text-center mt-[14px]">
                     <Button onClick={() => getImages(page + 1)} variant={"push"}>
                        Thêm
                     </Button>
                  </div>
               )}
            </div>
            <div className={classes.bodyRight}>
               {active && (
                  <>
                     <h2 className="break-words">{active.name}</h2>
                     <ul>
                        <li>
                           <h4 className="font-semibold">Image path:</h4>{" "}
                           <a className="hover:underline" target="blank" href={active.image_url}>
                              {active.image_url}
                           </a>
                        </li>
                        <li>
                           <h4 className="font-semibold">Size:</h4> {formatSize(active.size)}
                        </li>
                     </ul>
                     <Button isLoading={isLoading} onClick={handleDeleteImage}>
                        Xóa
                     </Button>
                  </>
               )}
            </div>
         </div>
      </div>
   );
}

export default Gallery;
