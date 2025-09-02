import { generateId, initImageObject } from "@/utils/appHelper";

import { useImageContext } from "@/stores/ImageContext";
import { useToast } from "@/stores/ToastContext";
import useFetch from "./useFetch";

const IMAGE_URL = "/images";

export default function useUploadImage() {
  // hooks
  const { setUploadingImages, setImages } = useImageContext();
  const { setErrorToast } = useToast();

  const privateRequest = useFetch();

  const uploadImage = async (
    files: File[],
    props?: { width?: number; height?: number },
  ) => {
    try {
      // init tempImage
      const processImageList: ImageType[] = [];
      const fileNeedToUploadIndexes: number[] = [];

      const checkDuplicateImage = (ob: ImageType) => {
        return processImageList.some(
          (image) => image.name === ob.name && image.size == ob.size,
        );
      };

      let i = 0;
      for (const file of files) {
        const imageObject: ImageType = initImageObject({
          name: generateId(file.name),
          image_url: URL.createObjectURL(file),
          size: file.size,
        });

        if (checkDuplicateImage(imageObject)) {
          URL.revokeObjectURL(imageObject.image_url);

          i++;
          continue;
        }

        processImageList.push(imageObject);
        fileNeedToUploadIndexes.push(i);

        Object.assign(file, {
          for_image_index: processImageList.length - 1,
        });

        i++;
      }

      setUploadingImages((prev) => [...processImageList, ...prev]);

      for (const val of fileNeedToUploadIndexes.reverse()) {
        const file = files[val] as File & { for_image_index: number };

        const formData = new FormData();
        formData.append("image", file);

        const controller = new AbortController();

        const res = await privateRequest.post(IMAGE_URL, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          signal: controller.signal,
          params: props,
        });

        const newImage = res.data as ImageType;
        processImageList.pop();

        setUploadingImages((prev) => {
          if (prev) {
            prev.pop();

            return prev;
          }

          return [];
        });

        setImages((prev) => [newImage, ...prev]);
      }
      // setSuccessToast("Upload images successful");
    } catch (error) {
      console.log(error);
      setErrorToast("Upload images failed");
      setUploadingImages([]);
    }
  };

  return { uploadImage };
}
