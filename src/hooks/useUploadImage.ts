import { generateId, initImageObject } from "@/utils/appHelper";
import { ChangeEvent } from "react";

import { useUploadContext } from "@/stores/ImageContext";
import { useToast } from "@/stores/ToastContext";
import { publicRequest } from "@/utils/request";

const IMAGE_URL = "/images";

export default function useUploadImage() {
   const { setCurrentImages, setStatus, setTempImages } = useUploadContext();
   const { setErrorToast, setSuccessToast } = useToast();

   const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
      try {
         setStatus("uploading");
         const inputEle = e.target as HTMLInputElement & { files: FileList };
         const fileLists = inputEle.files;

         // init tempImage
         const processImageList: ImageType[] = [];
         const fileNeedToUploadIndexes: number[] = [];

         const checkDuplicateImage = (ob: ImageType) => {
            return processImageList.some(
               (image) => image.name === ob.name && image.size == ob.size
            );
         };

         let i = 0;
         for (const file of fileLists) {
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

         setTempImages(processImageList);

         for (const index of fileNeedToUploadIndexes.reverse()) {
            const file = fileLists[index] as File & { for_image_index: number };

            const formData = new FormData();
            formData.append("image", file);

            const controller = new AbortController();

            // if (import.meta.env.DEV) await sleep(3000);

            const res = await publicRequest.post(IMAGE_URL, formData, {
               headers: { "Content-Type": "multipart/form-data" },
               signal: controller.signal,
            });

            const newImage = res.data.data as ImageType;
            processImageList.pop();

            // processImageList[file.for_image_index] = newImage;
            setCurrentImages((prev) => [newImage, ...prev]);
            setTempImages([...processImageList]);

            // setTempImages(processImageList);
            // setAddedImageIds((prev) => [...prev, newImage.public_id]);
         }

         // setTempImages
         // setCurrentImages((prev) => [...processImageList, ...prev]);
         setSuccessToast("Upload images successful");
      } catch (error) {
         console.log({ message: error });

         setErrorToast("Upload images failed");
         setStatus("error");
         setTempImages([]);
      } finally {
         setStatus("finish");
      }
   };

   return { handleInputChange };
}
