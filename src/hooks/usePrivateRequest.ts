"use client";
import { useEffect } from "react";
import { privateRequest } from "../utils/request";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const usePrivateRequest = () => {
   // hooks
   const { data } = useSession();
   const router = useRouter();

   useEffect(() => {
      if (!data || !data.token) return;
      const requestIntercept = privateRequest.interceptors.request.use(
         (config) => {
            // Do something before request is sent
            //  console.log("handle before request sent");
            if (!config.headers["Authorization"]) {
               config.headers["Authorization"] = `Bearer ${data.token}`;
            }

            return config;
         },
         (err) => Promise.reject(err) // Do something with response error
      );

      const responseIntercept = privateRequest.interceptors.response.use(
         (response) => response, // Do something with response data

         async (err) => {
            if (err?.response?.status === 401) {
               await signOut({ redirect: false });
               router.push("/signin");
            }
            return Promise.reject(err);
         }
      );

      return () => {
         privateRequest.interceptors.request.eject(requestIntercept);
         privateRequest.interceptors.response.eject(responseIntercept);
      };
   }, [data]);

   return privateRequest;
};

export default usePrivateRequest;
