"use client";

import { useEffect, useState, useRef, useMemo } from "react";

import { ArrowPathIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { useImage } from "@/stores/ImageContext";
import { publicRequest } from "@/utils/request";
import Button from "./ui/Button";
import Image from "next/image";
import Skeleton from "./Skeleton";
import { formatSize, sleep } from "@/utils/appHelper";
import usePrivateRequest from "@/hooks/usePrivateRequest";

type Props = {
  setImageUrl: (images: ImageType[]) => void;
  closeModal: () => void;
  multiple?: boolean;
};

type getImagesRes = {
  page: number;
  images: ImageType[];
  page_size: number;
  count: number;
};

const IMAGE_URL = "/images";

function Gallery({ setImageUrl, closeModal, multiple }: Props) {
  const [choseList, setChoseList] = useState<ImageType[]>([]);
  const [active, setActive] = useState<ImageType>();
  const [status, setStatus] = useState<
    "loadingImages" | "success" | "fetching" | "error"
  >("loadingImages");

  const ranUseEffect = useRef(false);

  // hooks
  const {
    imageStore: { currentImages, tempImages, page, count, pageSize },
    storeImages,
  } = useImage();
  const privateRequest = usePrivateRequest();

  const isRemaining = useMemo(() => count - page * pageSize > 0, [currentImages]);

  const isLoading = status === "fetching" || status === "loadingImages";
  const ableToChosenImage = !!active || !isLoading;

  const handleSelect = (image: ImageType) => {
    const newChoseList = [...choseList];
    const index = newChoseList.findIndex((i) => i.id === image.id);

    if (index === -1) newChoseList.push(image);
    else newChoseList.splice(index, 1);

    setChoseList(newChoseList);
  };

  const handleSubmit = () => {
    if (multiple) {
      if (choseList.length) setImageUrl(choseList);
    } else {
      if (active) setImageUrl([active]);
    }

    closeModal();
  };

  const handleDeleteImage = async () => {
    if (!active || !active.public_id) return;
    try {
      setStatus("fetching");
      const controller = new AbortController();

      await privateRequest.delete(`${IMAGE_URL}/${encodeURIComponent(active.public_id)}`);

      const newImages = currentImages.filter(
        (image) => image.public_id !== active.public_id,
      );
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
      setStatus("loadingImages");
      if (process.env.NODE_ENV === "development") await sleep(500);

      const res = await publicRequest.get(`${IMAGE_URL}?page=${page}`);
      const data = res.data as getImagesRes;

      const newImages = [...currentImages, ...data.images];
      storeImages({
        count: data.count,
        pageSize: data.page_size,
        page: data.page,
        currentImages: newImages,
      });

      setStatus("success");
    } catch (error) {
      console.log({ message: error });
      setStatus("error");
    }
  };

  const classes = {
    container: "w-[85vw] bg-white h-[80vh] flex flex-col",
    imageContainer: "relative pt-[100%]",
    imageFrame:
      "absolute flex w-full items-center justify-center bg-[#f1f1f1] inset-0 rounded-[8px] border-[2px] border-[#ccc] hover:border-[#cd1818] overflow-hidden",
    galleryTop: "flex justify-between border-b border-black/15 mb-[10px] pb-[10px]",
    galleryBody: "flex-grow overflow-hidden flex mx-[-10px]",
    bodyLeft: "w-full sm:w-2/3 overflow-auto px-[10px]",
    bodyRight: "hidden sm:block px-[10px] w-1/3 border-l border-black/15 space-y-[14px]",
  };

  const imageSkeleton = useMemo(
    () =>
      [...Array(12).keys()].map((item) => (
        <div key={item} className={"w-1/3 sm:w-1/6 px-[4px] mt-[8px]"}>
          <Skeleton className="pt-[100%]" />
        </div>
      )),
    [],
  );

  const renderImages = useMemo(() => {
    if (currentImages.length)
      return currentImages.map((item, index) => {
        const indexOf = choseList.findIndex((i) => i.id === item.id);
        const isInChoseList = indexOf !== -1;

        return (
          <div key={index} className={"px-[4px] relative w-1/3 sm:w-1/6 mt-[8px]"}>
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

              {multiple && (
                <button
                  onClick={() => handleSelect(item)}
                  className={`${
                    isInChoseList ? "bg-[#cd1818] " : "bg-[#ccc] hover:bg-[#cd1818]"
                  } z-10 h-[24px] w-[24px] absolute rounded-[6px] text-[white] left-[10px] bottom-[10px]`}
                >
                  {isInChoseList && (
                    <span className="text-[18px] font-semibold leading-[1]">
                      {indexOf + 1}
                    </span>
                  )}
                </button>
              )}
            </div>
          </div>
        );
      });
    else if (!tempImages.length && status !== "loadingImages")
      return <p className="mt-[8px] text-center w-full">...</p>;
  }, [active, currentImages, choseList]);

  const renderTempImages = useMemo(
    () =>
      !!tempImages.length &&
      tempImages.map((item, index) => {
        return (
          <div key={index} className={"px-[4px] w-1/3 sm:w-1/6 mt-[8px]"}>
            <div className={classes.imageContainer}>
              <div className={classes.imageFrame}>
                <Image
                  className="opacity-[.4]"
                  src={item.image_url}
                  alt="img"
                  width={200}
                  height={200}
                  onLoad={() => {
                    if (item.image_url.includes("blob"))
                      URL.revokeObjectURL(item.image_url);
                  }}
                />
                <ArrowPathIcon className="animate-spin absolute duration-1000 text-[#000] w-[30px]" />
              </div>
            </div>
          </div>
        );
      }),
    [tempImages],
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
          <p className="text-[18px] sm:text-[22px] font-[500]">Gallery</p>
          <Button colors={"second"} className="ml-[10px]" size="clear">
            <label className="py-1 px-3 flex items-center" htmlFor="image_upload">
              <ArrowUpTrayIcon className="w-5" />
              <span className="hidden sm:block ml-[6px]">Upload</span>
            </label>
          </Button>
        </div>

        <Button disabled={!ableToChosenImage} onClick={handleSubmit} variant={"primary"}>
          Select
        </Button>
      </div>
      <div className={classes.galleryBody}>
        <div className={classes.bodyLeft}>
          <div className="flex flex-wrap mt-[-8px] overflow-x-hidden overflow-y-auto mx-[-4px]">
            {status === "error" && <p>Some thing went wrong</p>}
            {status !== "error" && (
              <>
                {renderTempImages}
                {renderImages}
              </>
            )}

            {status === "loadingImages" && imageSkeleton}
          </div>

          {!!currentImages.length && isRemaining && (
            <div className="text-center mt-[14px]">
              <Button colors={"second"} onClick={() => getImages(page + 1)}>
                More
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
              <Button loading={isLoading} onClick={handleDeleteImage}>
                Delete
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Gallery;
