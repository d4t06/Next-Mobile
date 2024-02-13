import { useEffect, useState, useRef, Dispatch, SetStateAction, useMemo } from "react";
// import usePrivateRequest from "@/hooks/usePrivateRequest";
// import { useUploadContext } from "@/store/ImageContext";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/16/solid";

type Props = {
   setImageUrl: (image_url: string[]) => void;
   setIsOpenModal: Dispatch<SetStateAction<boolean>>;
   multiple?: boolean;
};

const IMAGE_URL = "/image-management/images";

function Gallery({ setImageUrl, setIsOpenModal, multiple = false }: Props) {
   const [choseList, setChoseList] = useState<string[]>([]);
   const [active, setActive] = useState<any>();
   const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
   const [apiLoading, setApiLoading] = useState(false);

   const ranUseEffect = useRef(false);

   // const privateRequest = usePrivateRequest();
   // const { addedImageIds, currentImages, setCurrentImages, tempImages, status: uploadStatus } = useUploadContext();

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

   const handleSubmit = () => {
      switch (multiple) {
         case true:
            if (!choseList.length) return;

            setImageUrl(choseList);
            break;
         case false:
            if (!active) return;
            setImageUrl([active.image_url]);
      }
      setIsOpenModal(false);
   };

   const handleSelect = (image: any) => {
      const newChoseList = [...choseList];
      const index = newChoseList.indexOf(image.image_url);

      if (index === -1) newChoseList.push(image.image_url);
      else newChoseList.splice(index, 1);

      setChoseList(newChoseList);
   };

   // const handleDeleteImage = async () => {
   //    try {
   //       if (!active || !active.public_id) return;

   //       setApiLoading(true);
   //       const controller = new AbortController();

   //       await privateRequest.delete(`${IMAGE_URL}/${active.public_id}`);

   //       const newImages = currentImages.filter((image) => image.public_id !== active.public_id);
   //       setCurrentImages(newImages);

   //       return () => {
   //          controller.abort();
   //       };
   //    } catch (error) {
   //       console.log({ message: error });
   //    } finally {
   //       setApiLoading(false);
   //    }
   // };

   // const getImages = async () => {
   //    try {
   //       console.log("run getImages");

   //       const res = await privateRequest.get(IMAGE_URL); //res.data
   //       setCurrentImages(res.data);

   //       if (import.meta.env.DEV) await sleep(300);
   //       setStatus("success");
   //    } catch (error) {
   //       console.log({ message: error });
   //       setStatus("error");
   //    }
   // };

   // const imageSkeleton = useMemo(
   //    () =>
   //       [...Array(8).keys()].map((item) => (
   //          <div key={item} className={cx("col w-1/4", "gallery-item")}>
   //             <Skeleton className="pt-[100%] w-[100% rounded-[6px]" />
   //          </div>
   //       )),
   //    []
   // );

   const ableToChosenImage = useMemo(() => (multiple ? !!choseList.length : !!active), [active, choseList]);

   // const renderImages = useMemo(() => {
   //    return currentImages?.map((item, index) => {
   //       const indexOf = choseList.indexOf(item.image_url);
   //       const isInChoseList = indexOf !== -1;

   //       return (
   //          <div key={index} className={cx("col w-1/4")}>
   //             <div className={cx("image-container", "group")}>
   //                <div
   //                   onClick={() => setActive(item)}
   //                   className={cx("image-frame", {
   //                      active: active ? active.id === item.id : false,
   //                   })}
   //                >
   //                   <img src={item.image_url} alt="img" />
   //                </div>
   //                {multiple && (
   //                   <Button
   //                      onClick={() => handleSelect(item)}
   //                      className={`${
   //                         isInChoseList ? "bg-[#cd1818] " : "bg-[#ccc] hover:bg-[#cd1818]"
   //                      } z-10 h-[24px] w-[24px] absolute rounded-[6px] text-[white]  left-[10px] bottom-[10px]`}
   //                   >
   //                      {isInChoseList && <span className="text-[18px] font-semibold leading-[1]">{indexOf + 1}</span>}
   //                   </Button>
   //                )}
   //             </div>
   //          </div>
   //       );
   //    });
   // }, [active, currentImages, choseList]);

   // const renderTempImages = useMemo(
   //    () =>
   //       tempImages?.map((item, index) => {
   //          const added = addedImageIds.includes(item.public_id);
   //          return (
   //             <div key={index} className={cx("col w-1/4")}>
   //                <div className={cx("image-container")}>
   //                   <div className={cx("image-frame", "relative")}>
   //                      <img className="opacity-[.4]" src={item.image_url} alt="img" />
   //                      {!added && <ArrowPathIcon className="animate-spin absolute text-[30px]" />}
   //                   </div>
   //                </div>
   //             </div>
   //          );
   //       }),
   //    [tempImages, addedImageIds]
   // );

   useEffect(() => {
      // if (currentImages.length) {
      //    setTimeout(() => {
      //       setStatus("success");
      //    }, 300);
      //    return;
      // }

      if (!ranUseEffect.current) {
         ranUseEffect.current = true;
         // getImages();
      }
   }, []);

   return (
      <div className={"gallery"}>
         <div className={"gallery__top"}>
            <div className={"left"}>
               <h1 className="text-[22px] font-semibold">Images</h1>
               <div>
                  <label className={"input-label"} htmlFor="image_upload">
                     <span>
                        <PlusIcon className="w-[22px] mr-[4px]" />
                        Upload
                     </span>
                  </label>
               </div>
            </div>

            <button className={"choose-image-btn"} onClick={handleSubmit}>
               Chọn
            </button>
         </div>
         <div className={"gallery__body flex mx-[-8px]"}>
            <div className={"w-2/3 px-[8px] no-scrollbar left"}>
               <div className="row">
                  {status === "loading" && ""}

                  {status !== "loading" && (
                     <>
                        {status === "success" ? (
                           <>{/* {!!tempImages?.length && renderTempImages} {renderImages} */}</>
                        ) : (
                           <h1>Some thing went wrong</h1>
                        )}
                     </>
                  )}
               </div>
            </div>
            <div className={"col w-1/3 px-[8px] overflow-hidden border-l-[2px]"}>
               {active && (
                  <div className={"image-info"}>
                     <h2 className="break-words">{active.name}</h2>
                     <ul>
                        <li>
                           <h4 className="font-semibold">Image path:</h4>{" "}
                           <a target="blank" href={active.image_url}>
                              {active.image_url}
                           </a>
                        </li>
                        <li>
                           <h4 className="font-semibold">Size:</h4> {formatSize(active.size)}
                        </li>
                     </ul>
                     <button>Xóa</button>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}

export default Gallery;
