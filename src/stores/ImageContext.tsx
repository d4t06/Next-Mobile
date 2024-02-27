"use client";
import { ReactNode, createContext, useCallback, useContext, useReducer } from "react";

type ImageStore = {
   status: "loading" | "fetching" | "success" | "error";
   tempImages: ImageType[];
   page: number;
   count: number;
   pageSize: number;
   currentImages: ImageType[];
};

// 1 initial state
type StateType = {
   imageStore: ImageStore;
};

const initialState: StateType = {
   imageStore: {
      count: 0,
      currentImages: [],
      tempImages: [],
      page: 0,
      pageSize: 0,
      status: "loading",
   },
};

// 2 reducer
const enum REDUCER_ACTION_TYPE {
   STORE_IMAGES,
   SET_STATUS,
}

type ReducerAction = {
   type: REDUCER_ACTION_TYPE;
   payload: Partial<ImageStore>;
};

const reducer = (state: StateType, action: ReducerAction): StateType => {
   switch (action.type) {
      case REDUCER_ACTION_TYPE.STORE_IMAGES:
         return {
            imageStore: {
               ...state.imageStore,
               ...action.payload,
               status: state.imageStore.status,
            },
         };
      case REDUCER_ACTION_TYPE.SET_STATUS:
         return {
            imageStore: {
               ...state.imageStore,
               status: action.payload.status || state.imageStore.status,
            },
         };

      default:
         return {
            imageStore: state.imageStore,
         };
   }
};

//  4 hook
const useImageContext = () => {
   const [state, dispatch] = useReducer(reducer, initialState);

   const storeImages = useCallback((payload: Partial<ImageStore>) => {
      console.log("store images");

      dispatch({
         type: REDUCER_ACTION_TYPE.STORE_IMAGES,
         payload,
      });
   }, []);

   const setStatus = useCallback((status: ImageStore["status"]) => {
      dispatch({
         type: REDUCER_ACTION_TYPE.SET_STATUS,
         payload: { status },
      });
   }, []);

   const setTempImages = useCallback((tempImages: ImageStore["tempImages"]) => {
      dispatch({
         type: REDUCER_ACTION_TYPE.SET_STATUS,
         payload: { tempImages },
      });
   }, []);

   return { state, storeImages, setStatus, setTempImages };
};

// 3 create context

type UseImageContextTye = ReturnType<typeof useImageContext>;

const initialContextState: UseImageContextTye = {
   state: initialState,
   setStatus: () => {},
   setTempImages: () => {},
   storeImages: () => {},
};

const ImageContext = createContext<UseImageContextTye>(initialContextState);

export default function ImageProvider({ children }: { children: ReactNode }) {
   return <ImageContext.Provider value={useImageContext()}>{children}</ImageContext.Provider>;
}

export const useImage = () => {
   const context = useContext(ImageContext);
   if (!context) throw new Error("context is required");

   const {
      state: { imageStore },
      ...restSetState
   } = context;
   return {
      ...restSetState,
      imageStore,
   };
};
