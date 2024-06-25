import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT || 'https://nest-mobile.vercel.app/api';

const publicRequest = axios.create({
  baseURL: BASE_URL,
});

const privateRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export { publicRequest, privateRequest };
