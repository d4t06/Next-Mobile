import useFetch from "@/hooks/useFetch";
import { useImageContext } from "@/stores/ImageContext";
import { useToastContext } from "@/stores/ToastContext";

type GetImageRes = {
  page: number;
  images: ImageType[];
  page_size: number;
  count: number;
};

const IMAGE_URL = "/images";

export default function useGalleryAction() {
  const { images, setStatus, status, setImages, setPage } = useImageContext();
  const { setErrorToast, setSuccessToast } = useToastContext();

  const $fetch = useFetch();

  type GetImages = {
    variant: "get-image";
    page: number;
  };

  type Delete = {
    variant: "delete-image";
    image: ImageType;
  };

  const actions = async (props: GetImages | Delete) => {
    try {
      switch (props.variant) {
        case "get-image": {
          setStatus("get-image");
          const res = await $fetch.get(`${IMAGE_URL}?page=${props.page}`);
          const data = res.data as GetImageRes;

          const newImages = [...images, ...data.images];

          setPage(props.page);
          setImages(newImages);

          break;
        }

        case "delete-image": {
          setStatus("delete-image");

          await $fetch.delete(
            `${IMAGE_URL}/${encodeURIComponent(props.image.public_id)}`,
          );

          const newImages = images.filter((image) => image.public_id !== props.image.public_id);
          setImages(newImages);

          setSuccessToast("Delete image succesful");

          break;
        }
      }
    } catch (error) {
      console.log({ message: error });
      setErrorToast();
    } finally {
      setStatus("idle");
    }
  };

  return { actions, status };
}
