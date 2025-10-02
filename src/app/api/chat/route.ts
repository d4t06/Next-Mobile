import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  const content = await req.text();

  if (!content) return Response.error();

  const start = Date.now();

  const res = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: content,
  });

  console.log("finish after", (Date.now() - start) / 1000);

  return Response.json(res.text);
}
