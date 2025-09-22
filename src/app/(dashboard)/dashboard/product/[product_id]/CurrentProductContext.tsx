"use client";

import { ReactNode, createContext, useContext, useState } from "react";

// function useCurrentProduct() {
// 	const [product, setProduct] = useState<Product>();
// 	const [categories, setCategories] = useState<Category[]>([]);

// 	return { product, setProduct, categories, setCategories };
// }

// type ContextType = ReturnType<typeof useCurrentProduct>;

type ContextType = {
	product: Product;
	categories: Category[];
};

const context = createContext<ContextType | null>(null);

export default function CurrentProductProdiver({
	children,
	categories,
	product,
}: {
	children: ReactNode;
	product: Product;
	categories: Category[];
}) {
	return <context.Provider value={{ categories, product }}>{children}</context.Provider>;
}

export function useCurrentProductContext() {
	const ct = useContext(context);
	if (!ct) throw new Error("CurrentProductProdiver not provided");

	return ct;
}
