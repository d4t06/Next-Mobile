"use client";

import { useSession } from "next-auth/react";

export default function HomePage() {
   const { data, status } = useSession();


   console.log('>>> home page check session', data);
   


   return <p>This is home page</p>;
}
