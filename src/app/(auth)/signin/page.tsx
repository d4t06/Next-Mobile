"use client";

import Button from "@/components/ui/Button";
import MyInput from "@/components/ui/MyInput";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ElementRef, FormEvent, useEffect, useRef, useState } from "react";

export default function SignInPage() {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");

   const [errMsg, setErrorMsg] = useState("");
   const [fetching, setFetching] = useState(false);

   const userInputRef = useRef<ElementRef<"input">>(null);

   // hooks
   const router = useRouter();
   const {data, status} = useSession() 

   const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      const res = await signIn("credentials", {
         token: "hsjkdhfkshd ",
         redirect: false,
      });

      router.push("/");
   };

   useEffect(() => {
      userInputRef.current?.focus();
   }, []);

   const classes = {
      formContainer:
         "p-[20px] border border-black/10 w-[400px] max-w-[100vw] shadow-[4px_4px_0px_rgba(0,0,0,0.1)] bg-white rounded-[16px] space-y-[22px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]",
      label: "font-[500] ",
   };

   // console.log(">> Login check ", data, status);
   

   return (
      <>
         <form onSubmit={handleSubmit} className={classes.formContainer}>
            {errMsg && <h2 className={"error-msg"}>{errMsg}</h2>}
            <h1 className="text-center text-[24px] font-[500]">Sign In</h1>
            <div className={"space-y-[6px]"}>
               <label className={classes.label} htmlFor="name">
                  Username
               </label>
               <MyInput
                  ref={userInputRef}
                  autoComplete="off"
                  type="text"
                  required
                  value={username}
                  cb={(value) => setUsername(value)}
               />
            </div>
            <div className={"space-y-[6px]"}>
               <label className={classes.label} htmlFor="image">
                  Password
               </label>
               <MyInput
                  type="text"
                  autoComplete="off"
                  required
                  value={password}
                  cb={(value) => setPassword(value.trim() && value)}
               />
            </div>

            <Button
               isLoading={fetching}
               variant={"push"}
               className="leading-[30px]"
               type="submit"
               size={"full"}
            >
               Sign In
            </Button>
            <p className="font-[500]">
               <span className="">
                  No account jet?
                  <Link href="/signup" className="text-[#cd1818] ml-[4px] hover:underline">
                     Sign Up
                  </Link>
               </span>
            </p>
         </form>
      </>
   );
}
