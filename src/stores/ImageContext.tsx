"use client";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useReducer,
} from "react";

type ImageStore = {
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
  },
};

// 2 reducer
const enum REDUCER_ACTION_TYPE {
  STORE_IMAGES,
  SET_STATUS,
  ADD_IMAGE,
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
        },
      };
    case REDUCER_ACTION_TYPE.ADD_IMAGE:
      if (!action.payload.currentImages)
        return { imageStore: state.imageStore };

      return {
        imageStore: {
          ...state.imageStore,
          currentImages: [
            ...action.payload.currentImages,
            ...state.imageStore.currentImages,
          ],
          count: state.imageStore.count + 1,
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

  const setTempImages = useCallback((tempImages: ImageStore["tempImages"]) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.STORE_IMAGES,
      payload: { tempImages },
    });
  }, []);

  const addImage = useCallback((image: ImageType) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.ADD_IMAGE,
      payload: { currentImages: [image] },
    });
  }, []);

  return { state, storeImages, setTempImages, addImage };
};

// 3 create context

type UseImageContextTye = ReturnType<typeof useImageContext>;

const initialContextState: UseImageContextTye = {
  state: initialState,

  setTempImages: () => {},
  storeImages: () => {},
  addImage: () => {},
};

const ImageContext = createContext<UseImageContextTye>(initialContextState);

export default function ImageProvider({ children }: { children: ReactNode }) {
  return (
    <ImageContext.Provider value={useImageContext()}>
      {children}
    </ImageContext.Provider>
  );
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
