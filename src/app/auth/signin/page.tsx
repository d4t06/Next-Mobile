"use client";

import Button from "@/components/ui/Button";
import MyInput from "@/components/ui/MyInput";
import Link from "next/link";
import { ElementRef, useRef, useState } from "react";

export default function SignInPage() {
   const [user, setUser] = useState("");
   const [password, setPassword] = useState("");
   const [errMsg, setErrorMsg] = useState("");
   const [apiLoading, setApiLoading] = useState(false);

   const userInputRef = useRef<ElementRef<"input">>(null);

   const classes = {
      formContainer:
         "p-[20px] space-y-[20px] absolute top-[50%] left-[50px] translate-x-[50%] translate-y-[50%]",
   };

   return (
      <div className="relative h-screen w-screen">
         <form className={classes.formContainer}>
            {errMsg && <h2 className={"error-msg"}>{errMsg}</h2>}
            <h1>Đăng nhập</h1>
            <div className={"form-group"}>
               <label htmlFor="name">Tài khoản</label>
               <MyInput
                  ref={userInputRef}
                  autoComplete="off"
                  type="text"
                  required
                  value={user}
                  cb={(value) => setUser(value)}
               />
            </div>
            <div className={"form-group"}>
               <label htmlFor="image">Mật khẩu</label>
               <MyInput
                  type="text"
                  autoComplete="off"
                  required
                  value={password}
                  cb={(value) => setPassword(value.trim() && value)}
               />
            </div>

            <Button
               isLoading={apiLoading}
               variant={"push"}
               className="leading-[30px]"
               type="submit"
            >
               Đăng nhập
            </Button>
            <span className={"register-text"}>
               Chưa có tài khoản?
               <Link href="/register"> Đăng ký ngay</Link>
            </span>
         </form>
      </div>
   );
}
