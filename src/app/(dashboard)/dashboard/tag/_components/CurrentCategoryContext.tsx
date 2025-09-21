import { ReactNode, createContext, useContext, useState } from "react";

function useCurrentCategory() {
	const [currentCategory, setCurrentCategory] = useState<Category>();

	return { currentCategory, setCurrentCategory };
}

type ContextType = ReturnType<typeof useCurrentCategory>;

const context = createContext<ContextType | null>(null);

export default function CurrentCategoryProvider({ children }: { children: ReactNode }) {
	return <context.Provider value={useCurrentCategory()}>{children}</context.Provider>;
}

export function useCurrentCategoryContext() {
	const ct = useContext(context);
	if (!ct) throw new Error("CurrentCategoryProvider not provided");

	return ct;
}
