"use server";

import { sleep } from "@/utils/appHelper";
import { revalidatePath, revalidateTag } from "next/cache";

export async function testRevalidate() {
   console.log("call revalidate from server");
   revalidatePath("/");
}

export async function runRevalidateTag(tag: string) {
   console.log(">>> call revalidate tag", tag);
   if (process.env.NODE_ENV === "development") await sleep(500);
   revalidateTag(tag);
}
