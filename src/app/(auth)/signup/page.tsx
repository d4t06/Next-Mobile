"use client";

import Button from "@/components/ui/Button";
import MyInput from "@/components/ui/MyInput";
import { publicRequest } from "@/utils/request";
import { CheckIcon, XMarkIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { ElementRef, FormEvent, useEffect, useRef, useState } from "react";

const USER_REGEX = /^(?=.{4,20}$)[a-zA-Z].*/;
const PWD_REGEX = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
const REGISTER_URL = "/auth/register";

export default function SignUnPage() {
   const [fetching, setIsFetching] = useState(false);
   const [username, setUsername] = useState("");
   const [validName, setValidName] = useState(false);
   const [userFocus, setUserFocus] = useState(false);

   const [password, setPassword] = useState("");
   const [validPwd, setValidPwd] = useState(false);
   const [passwordFocus, setPasswordFocus] = useState(false);

   const [confirmPassword, setConfirmPassword] = useState("");
   const [validMatchPwg, setValidMatchPwg] = useState(false);

   const [errMsg, setErrorMsg] = useState("");

   const userInputRef = useRef<ElementRef<"input">>(null);
   const prevUser = useRef("");

   const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();

      publicRequest.post(REGISTER_URL, { username, password });
   };

   // validate username
   useEffect(() => {
      const result = USER_REGEX.test(username);

      setValidName(result);
   }, [username]);

   // validate password
   useEffect(() => {
      const result = PWD_REGEX.test(password);
      setValidPwd(result);
      let match = password === confirmPassword;

      if (!password) match = false;
      setValidMatchPwg(match);
   }, [password, confirmPassword]);

   useEffect(() => {
      userInputRef.current?.focus();
   }, []);

   const classes = {
      formContainer:
         "p-[20px] border border-black/10 w-[400px] max-w-[100vw] shadow-[4px_4px_0px_rgba(0,0,0,0.1)] bg-white rounded-[16px] space-y-[20px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]",
      label: "font-[500] flex items-center space-x-[4px]",
      constructor:
         "bg-[#333] p-[6px] rounded-[6px] text-[1.4rem] text-white origin-top duration-[.3s] transition-all",
      checkIcon: "text-emerald-500 w-[24px]",
      xIcon: "text-red-500 w-[24px]",
   };

   return (
      <form onSubmit={handleSubmit} className={classes.formContainer}>
         {errMsg && <h2 className={"error-msg"}>{errMsg}</h2>}
         <h1 className="text-center text-[24px] font-[500]">Sign Up</h1>

         <div className="space-y-[4px]">
            <div className={"space-y-[6px]"}>
               <label className={classes.label} htmlFor="name">
                  Username
                  {!!username && (
                     <span>
                        {validName ? (
                           <CheckIcon className={`${classes.checkIcon} `} />
                        ) : (
                           <XMarkIcon className={`${classes.xIcon} `} />
                        )}
                     </span>
                  )}
               </label>
               <MyInput
                  ref={userInputRef}
                  autoComplete="off"
                  type="text"
                  required
                  id="name"
                  value={username}
                  cb={(value) => setUsername(value)}
               />

               <div
                  id="note"
                  className={`${classes.constructor} ${
                     userFocus && username && !validName
                        ? "max-h-[200px] opacity-100"
                        : "max-h-0 my-[-6px] opacity-0"
                  }`}
               >
                  4 - 24 letter <br />
                  Must start with character <br />
                  Allow uppercase, number, &apos;_&apos;
               </div>
            </div>

            <div className={"space-y-[6px]"}>
               <label className={classes.label} htmlFor="password">
                  Password
                  {password && (
                     <span>
                        {validPwd ? (
                           <CheckIcon className={`${classes.checkIcon} `} />
                        ) : (
                           <XMarkIcon className={`${classes.xIcon} `} />
                        )}
                     </span>
                  )}
               </label>
               <MyInput
                  type="text"
                  id="password"
                  autoComplete="off"
                  required
                  value={password}
                  cb={(value) => setPassword(value.trim() && value)}
               />

               <p
                  id="note"
                  className={`${classes.constructor} ${
                     passwordFocus && password && !validPwd
                        ? "max-h-[200px] opacity-100"
                        : "max-h-0 my-[-6px] opacity-0"
                  }`}
               >
                  6 - 24 letters <br />
                  Must included number and character, is good to have special characters
               </p>
            </div>

            <div className={"space-y-[6px]"}>
               <label className={classes.label} htmlFor="confirm">
                  Confirm password
                  {password && (
                     <span className={validMatchPwg && validPwd ? "" : "hide"}>
                        {validMatchPwg && validPwd ? (
                           <CheckIcon className={`${classes.checkIcon} `} />
                        ) : (
                           <XMarkIcon className={`${classes.xIcon} `} />
                        )}
                     </span>
                  )}
               </label>
               <MyInput
                  type="text"
                  id="confirm"
                  value={confirmPassword}
                  cb={(value) => setConfirmPassword(value.trim() && value)}
               />
            </div>
         </div>

         <Button loading={fetching} className="leading-[30px] w-full" type="submit">
            Sign In
         </Button>
         <p className="font-[500]">
            <span className="">
               Already have an account?
               <Link href="/signin" className="text-[#cd1818] ml-[4px] hover:underline">
                  Sign In
               </Link>
            </span>
         </p>
      </form>
   );
}
