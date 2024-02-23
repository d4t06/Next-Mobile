import { NextApiRequest, NextApiResponse } from "next";
import { revalidateTag } from "next/cache";

export async function GET(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //   const path = req.query.path as string;

  //   revalidateTag(path);

  return Response.json("Route in api/revalidate folder");
}
