import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_ENDPOINT || "https://nest-mobile.vercel.app/api";

const request = axios.create({
  baseURL: BASE_URL,
});

export { request };
