import { useSession } from "next-auth/react";

export default function useRefreshToken() {
   const { data, update } = useSession();

   const refresh = async () => {
      try {
         if (!data || !data.token) return;
         const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT || 'https://nest-mobile.vercel.app/api'}/auth/refresh`, {
            method: "GET",
            credentials: "include",
         });

         const payload = await res.json();

         const newToken = payload.data.token;
         update({});

         return newToken;
      } catch (error) {
         console.log({ message: error });
      }
   };
   return refresh;
}
