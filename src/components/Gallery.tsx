"use client";
import { useEffect, useState, useRef, Dispatch, SetStateAction, useMemo } from "react";

import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useUploadContext } from "@/stores/ImageContext";
import { publicRequest } from "@/utils/request";
import Button from "./ui/Button";

type Props = {
  setImageUrl: (image_url: string) => void;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  multiple?: boolean;
};

const IMAGE_URL = "/images";

function Gallery({ setImageUrl, setIsOpenModal }: Props) {
  const [active, setActive] = useState<ImageType>();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [apiLoading, setApiLoading] = useState(false);

  const ranUseEffect = useRef(false);

  // hooks
  const { currentImages, setCurrentImages, tempImages, status: uploadStatus } = useUploadContext();

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

  const isFetching = apiLoading || uploadStatus === "uploading";

  const handleSubmit = () => {
    if (!active) return;
    setImageUrl(active.image_url);
    setIsOpenModal(false);
  };

  const handleDeleteImage = async () => {
    try {
      if (!active || !active.public_id) return;

      setApiLoading(true);
      const controller = new AbortController();

      await publicRequest.delete(`${IMAGE_URL}/${active.public_id}`);

      const newImages = currentImages.filter((image) => image.public_id !== active.public_id);
      setCurrentImages(newImages);

      return () => {
        controller.abort();
      };
    } catch (error) {
      console.log({ message: error });
    } finally {
      setApiLoading(false);
    }
  };

  const getImages = async () => {
    try {
      console.log("run getImages");

      const res = await publicRequest.get(`${IMAGE_URL}?page=1`); //res.data
      setCurrentImages(res.data.images);

      //  if (import.meta.env.DEV) await sleep(300);
      setStatus("success");
    } catch (error) {
      console.log({ message: error });
      setStatus("error");
    }
  };

  const classes = {
    container: "w-[90vw] h-[80vh] overflow-hidden",
    imageContainer: "relative pt-[100%]",
    imageFrame: "absolute flex  w-full items-center justify-center bg-[#f1f1f1] inset-0 rounded-[8px] border-[2px] border-[#ccc] hover:border-[#cd1818] overflow-hidden",
    galleryTop: "h-[40px] flex justify-between items-center border-b border-[#ccc] mb-[10px] pb-[10px]",
    galleryBody: "flex mx-[-10px]",
    bodyLeft: "h-[calc(80vh-60px)] w-2/3 no-scrollbar px-[10px] overflow-x-hidden overflow-y-auto",
    bodyRight: "px-[10px] w-1/3 overflow-hidden border-l-[2px] space-y-[14px]",
  };

  const imageSkeleton = useMemo(
    () =>
      [...Array(8).keys()].map((item) => (
        <div key={item} className={"col w-1/4 gallery-item"}>
          {/* <Skeleton className="pt-[100%] w-[100% rounded-[6px]" /> */}
        </div>
      )),
    []
  );

  const renderImages = useMemo(() => {
    if (currentImages.length)
      return currentImages.map((item, index) => {
        return (
          <div key={index} className={"px-[8px] relative w-1/4"}>
            <div className={classes.imageContainer}>
              <div
                onClick={() => setActive(item)}
                className={`${classes.imageFrame}
                        ${active?.id === item.id ? "border-[#cd1818]" : ""}`}
              >
                <img className="w-full h-auto" src={item.image_url} alt="img" />
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
          <div key={index} className={"px-[8px] w-1/4"}>
            <div className={classes.imageContainer}>
              <div className={classes.imageFrame}>
                <img className="opacity-[.4]" src={item.image_url} alt="img" />
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

  console.log("check current iamge", currentImages);

  return (
    <div className={classes.container}>
      <div className={classes.galleryTop}>
        <div className={"flex items-center"}>
          <h1 className="text-[22px] font-[500]">Gallery</h1>
          <Button className="ml-[10px] !p-0">
            <label className={`px-[20px] py-[4px] cursor-pointer inline-block ${isFetching ? "opacity-60 pointer-events-none" : ""}`} htmlFor="image_upload">
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
          <div className="flex">
            {status === "loading" && imageSkeleton}

            {status !== "loading" && (
              <>
                {status === "success" ? (
                  <>
                    {renderTempImages} {renderImages}
                  </>
                ) : (
                  <h1>Some thing went wrong</h1>
                )}
              </>
            )}
          </div>
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
              <Button isLoading={apiLoading} onClick={handleDeleteImage}>
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
