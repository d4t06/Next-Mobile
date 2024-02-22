"use client";
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";

// 1 initial state
type StateType = {
   status: "" | "uploading" | "finish" | "error";
   tempImages: ImageType[];
   imagesState: {
      page: number;
      count: number;
      pageSize: number;
      currentImages: ImageType[];
   };
};
// const initialState: StateType = {
//    addedImageIds: [],
//    status: "",
//    tempImages: [],
//    currentImages: [],
// };

// 2 create context
type ContextType = {
   state: StateType;
   setTempImages: Dispatch<SetStateAction<ImageType[]>>;
   setImagesState: Dispatch<SetStateAction<StateType["imagesState"]>>;
   setStatus: Dispatch<SetStateAction<StateType["status"]>>;
};

const UploadImageContext = createContext<ContextType | undefined>(undefined);

export default function UploadImageProvider({ children }: { children: ReactNode }) {
   const [tempImages, setTempImages] = useState<StateType["tempImages"]>([]);
   const [imagesState, setImagesState] = useState<StateType["imagesState"]>({
      page: 0,
      currentImages: [],
      count: 0,
      pageSize: 0,
   });
   const [status, setStatus] = useState<StateType["status"]>("");

   return (
      <UploadImageContext.Provider
         value={{
            state: { tempImages, status, imagesState },
            setImagesState,
            setStatus,
            setTempImages,
         }}
      >
         {children}
      </UploadImageContext.Provider>
   );
}

export const useUploadContext = () => {
   const context = useContext(UploadImageContext);
   if (!context) throw new Error("context is required");

   const {
      state: { ...restState },
      ...restSetState
   } = context;
   return {
      ...restSetState,
      ...restState,
   };
};
