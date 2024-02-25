import { revalidateTag } from "next/cache";

export async function GET(req: Request) {
  const url = new URL(req.url);

  const tag = url.searchParams.get("tag");
  if (!tag) return Response.json("invalid tag");
  console.log(">>> revalidate from server check tag", tag);
  revalidateTag(tag);
  return Response.json({ revalidate: true });
}
