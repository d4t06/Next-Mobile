"use client";

import {
   ReactNode,
   createContext,
   useCallback,
   useContext,
   useEffect,
   useReducer,
} from "react";

type StateType = {
   products: Product[];
   selectIdList: number[];
};

const getLocalStorage = () =>
   typeof window !== "undefined"
      ? (JSON.parse(window.localStorage.getItem("next-mobile") || "{}") as Record<
           string,
           any
        >)
      : {};

const setLocalStorage = (key: string, value: any) => {
   const storage = getLocalStorage();
   storage[key] = value;

   if (typeof window !== "undefined")
      window.localStorage.setItem("next-mobile", JSON.stringify(storage));
};

const initState: StateType = {
   products: [],
   selectIdList: [],
};

const enum REDUCER_ACTION_TYPE {
   INIT,
   TOGGLE_PRODUCT,
   SELECT,
   RESET,
}

type Toggle = {
   type: REDUCER_ACTION_TYPE.TOGGLE_PRODUCT;
   payload: Product;
};

type Init = {
   type: REDUCER_ACTION_TYPE.INIT;
   payload: Partial<StateType>;
};

type Select = {
   type: REDUCER_ACTION_TYPE.SELECT;
   payload: Product;
};

type Reset = {
   type: REDUCER_ACTION_TYPE.RESET;
};

const reducer = (state: StateType, action: Init | Toggle | Reset | Select): StateType => {
   switch (action.type) {
      case REDUCER_ACTION_TYPE.TOGGLE_PRODUCT: {
         const product = action.payload;
         const newProducts = [...state.products];

         const index = state.products.findIndex((p) => p.id === product.id);
         if (index === -1) newProducts.push(product);
         else newProducts.splice(index, 1);

         setLocalStorage("products", newProducts);

         return {
            ...state,
            products: newProducts,
         };
      }
      case REDUCER_ACTION_TYPE.SELECT: {
         const product = action.payload;
         const newIds = [...state.selectIdList];

         const index = state.selectIdList.findIndex((id) => id === product.id);
         if (index === -1) newIds.push(product.id);
         else newIds.splice(index, 1);

         setLocalStorage("selectIdList", newIds);

         return {
            ...state,
            selectIdList: newIds,
         };
      }
      case REDUCER_ACTION_TYPE.RESET:
         return initState;
      case REDUCER_ACTION_TYPE.INIT:
         return {
            ...state,
            ...action.payload,
         };

      default:
         return state;
   }
};

const useCompareListContext = () => {
   const [state, dispatch] = useReducer(reducer, initState);

   const initCompareStore = useCallback((payload: Init["payload"]) => {
      dispatch({
         type: REDUCER_ACTION_TYPE.INIT,
         payload,
      });
   }, []);

   const toggleProduct = useCallback((payload: Product) => {
      dispatch({
         type: REDUCER_ACTION_TYPE.TOGGLE_PRODUCT,
         payload,
      });
   }, []);

   const selectProduct = useCallback((payload: Product) => {
      dispatch({
         type: REDUCER_ACTION_TYPE.SELECT,
         payload,
      });
   }, []);

   const resetCompareList = useCallback(() => {
      dispatch({
         type: REDUCER_ACTION_TYPE.RESET,
      });
   }, []);

   return { state, toggleProduct, resetCompareList, selectProduct, initCompareStore };
};

type ContextType = ReturnType<typeof useCompareListContext>;

const initContextState: ContextType = {
   state: initState,
   resetCompareList: () => {},
   toggleProduct: () => {},
   initCompareStore: () => {},
   selectProduct: () => {},
};

const CompareContext = createContext<ContextType>(initContextState);

export default function CompareProvider({ children }: { children: ReactNode }) {
   const { initCompareStore, ...rest } = useCompareListContext();

   useEffect(() => {
      const storage = getLocalStorage();
      initCompareStore({
         products: storage["products"] || [],
         selectIdList: storage["selectIdList"] || [],
      });
   }, []);
   return (
      <CompareContext.Provider value={{ ...rest, initCompareStore }}>
         {children}
      </CompareContext.Provider>
   );
}

export const useCompare = () => {
   const context = useContext(CompareContext);
   if (!context) throw new Error("context is required");

   const {
      state: { products, selectIdList },
      ...restSetState
   } = context;
   return {
      ...restSetState,
      products,
      selectIdList,
   };
};
