import { useEffect, useState, useMemo, useRef } from "react";
import { ArrowPathIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import Button from "./ui/Button";
import Skeleton from "./Skeleton";
import { formatSize } from "@/utils/appHelper";
import AnimateModal, { ModalRef, ModalWrapper } from "./modal/AnimateModal";
import MyImage from "./ui/MyImage";
import GalleryItem from "./GalleryItem";
import ChooseBtn from "./ChooseImageBtn";
import useGalleryAction from "@/hooks/useGalleryAction";
import { useImageContext } from "@/stores/ImageContext";
import ChooseImageModal from "./modal/ChooseImageModal";
// import ChooseImageModal from "./modal/ChooseImageModal";
// import Modal from "./modal";

type Props = {
  setImageUrl: (images: ImageType[]) => void;
  closeModal: () => void;
  multiple?: boolean;
  width?: number;
  height?: number;
};

function Gallery({ setImageUrl, closeModal, multiple, ...props }: Props) {
  const { images, uploadingImages, page, shoudFetchingImage } = useImageContext();

  const [choseList, setChoseList] = useState<ImageType[]>([]);
  const [activeImage, setActiveImage] = useState<ImageType>();

  const modalRef = useRef<ModalRef>(null);

  const { actions, status } = useGalleryAction();

  const ableToChosenImage = !!activeImage;

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
      if (activeImage) setImageUrl([activeImage]);
    }

    closeModal();
  };

  const classes = {
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

  useEffect(() => {
    if (shoudFetchingImage.current) {
      shoudFetchingImage.current = false;
      actions({
        variant: "get-image",
        page: 1,
      });
    }
  }, []);

  return (
    <>
      <ModalWrapper className="w-[900px] h-[500px]">
        <div className={classes.galleryTop}>
          <div className={"flex items-center"}>
            <p className="text-[18px] sm:text-[22px] font-[500]">Gallery</p>
            <Button
              onClick={() => modalRef.current?.open()}
              colors={"second"}
              className="ml-[10px]"
            >
              <ArrowUpTrayIcon className="w-5" />
            </Button>
          </div>

          <Button
            disabled={!ableToChosenImage}
            onClick={handleSubmit}
            variant={"primary"}
          >
            Select
          </Button>
        </div>
        <div className={classes.galleryBody}>
          <div className={classes.bodyLeft}>
            <div className="flex flex-wrap mt-[-8px] overflow-x-hidden overflow-y-auto mx-[-4px]">
              {uploadingImages.map((item, index) => (
                <GalleryItem image={item} key={index} active={false}>
                  <ArrowPathIcon className="animate-spin absolute duration-1000 text-[#000] w-6" />
                </GalleryItem>
              ))}

              {images.map((item, index) => (
                <GalleryItem
                  key={index}
                  image={item}
                  active={activeImage?.id === item.id}
                  setActive={() => setActiveImage(item)}
                >
                  {multiple && (
                    <ChooseBtn
                      index={choseList.findIndex((i) => i.id === item.id)}
                      select={() => handleSelect(item)}
                    />
                  )}
                </GalleryItem>
              ))}

              {status === "get-image" && imageSkeleton}
            </div>

            {!!images.length && status !== "get-image" && (
              <div className="text-center mt-[14px]">
                <Button
                  colors={"second"}
                  onClick={() => actions({ variant: "get-image", page: page + 1 })}
                >
                  More
                </Button>
              </div>
            )}
          </div>
          <div className={classes.bodyRight}>
            {activeImage && (
              <>
                <MyImage
                  width={200}
                  height={200}
                  className="w-full rounded-lg"
                  src={activeImage.image_url}
                />

                <p className="break-words">{activeImage.name}</p>
                <div>
                  <p>Size: {formatSize(activeImage.size)}</p>
                </div>
                <Button
                  loading={status === "delete-image"}
                  onClick={() =>
                    actions({
                      variant: "delete-image",
                      image: activeImage,
                    })
                  }
                >
                  Delete
                </Button>
              </>
            )}
          </div>
        </div>
      </ModalWrapper>

      <AnimateModal ref={modalRef}>
        <ChooseImageModal {...props} title="Upload image" modalRef={modalRef} />
      </AnimateModal>
    </>
  );
}

export default Gallery;
