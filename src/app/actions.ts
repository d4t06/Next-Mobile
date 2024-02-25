"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export async function testRevalidate() {
  console.log("call revalidate from server");
  revalidatePath("/");
}

export async function runRevalidateTag(tag: string) {
  console.log(">>> call revalidate tag", tag);
  revalidateTag(tag);
}
