'use client'
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";

// 1 initial state
type StateType = {
   status: "" | "uploading" | "finish" | "error";
   addedImageIds: string[];
   tempImages: ImageType[];
   currentImages: ImageType[];
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
   setCurrentImages: Dispatch<SetStateAction<ImageType[]>>;
   setAddedImageIds: Dispatch<SetStateAction<string[]>>;
   setStatus: Dispatch<SetStateAction<StateType["status"]>>;
};

const UploadImageContext = createContext<ContextType | undefined>(undefined);

export default function UploadImageProvider({ children }: { children: ReactNode }) {
   const [tempImages, setTempImages] = useState<StateType["tempImages"]>([]);
   const [currentImages, setCurrentImages] = useState<StateType["currentImages"]>([]);
   const [addedImageIds, setAddedImageIds] = useState<StateType["addedImageIds"]>([]);
   const [status, setStatus] = useState<StateType["status"]>("");

   return (
      <UploadImageContext.Provider
         value={{
            state: { tempImages, addedImageIds, status, currentImages },
            setCurrentImages,
            setAddedImageIds,
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
      state: { addedImageIds, tempImages, status, currentImages },
      setAddedImageIds,
      setTempImages,
      setStatus,
      setCurrentImages,
   } = context;
   return {
      currentImages,
      setCurrentImages,
      addedImageIds,
      tempImages,
      status,
      setAddedImageIds,
      setTempImages,
      setStatus,
   };
};
