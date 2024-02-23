"use server";

import { revalidatePath } from "next/cache";

export async function testRevalidate() {
   console.log("call revalidate from server");

   revalidatePath("/");
}
