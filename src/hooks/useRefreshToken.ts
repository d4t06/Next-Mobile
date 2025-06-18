import { request } from "@/utils/request";
import { useSession } from "next-auth/react";

export default function useRefreshToken() {
  const { data, update } = useSession();

  const refresh = async () => {
    try {
      if (!data || !data.token) return;
      const res = await request.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT || "https://nest-mobile.vercel.app/api"}/auth/refresh`,
        { refresh_token: data.refreshToken },
        {
          withCredentials: true,
        },
      );

      const newToken = res.data.token;
      update({ token: res.data.token });

      return newToken;
    } catch (error) {
      console.log({ message: error });
    }
  };
  return refresh;
}
