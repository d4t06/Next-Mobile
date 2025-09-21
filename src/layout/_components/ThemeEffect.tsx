"use client";

import { getLocalStorage } from "@/utils/appHelper";
import { useEffect } from "react";

export default function ThemeEffect() {
	useEffect(() => {
		const isDark = getLocalStorage()["dark"];
		if (isDark) document.documentElement.classList.add("dark");
	}, []);

	return <></>;
}
