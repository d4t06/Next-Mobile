"use client";

import Button from "@/components/ui/Button";
import MyInput from "@/components/ui/MyInput";
import { request } from "@/utils/request";
import { CheckIcon, XMarkIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ElementRef, FormEvent, useEffect, useRef, useState } from "react";

const USER_REGEX = /^(?=.{4,20}$)[a-zA-Z].*/;
const PWD_REGEX = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
const REGISTER_URL = "/auth/register";

export default function SignUpPageContent() {
  const [fetching, setIsFetching] = useState(false);
  const [username, setUsername] = useState("");
  const [validName, setValidName] = useState(false);

  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [validMatchPwg, setValidMatchPwg] = useState(false);

  const [errMsg, setErrorMsg] = useState("");

  const userInputRef = useRef<ElementRef<"input">>(null);
  const prevUser = useRef("");

  const router = useRouter();

  const ableToSubmit =
    !!username &&
    !!password &&
    !!confirmPassword &&
    validName &&
    validPwd &&
    validMatchPwg &&
    username !== prevUser.current;

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();

      if (!ableToSubmit) return;

      setIsFetching(true);

      await request.post(REGISTER_URL, {
        username,
        password,
      });
      router.push("/signin");
    } catch (error: any) {
      if (!error.response) {
        setErrorMsg("No server response!");
      } else if (error.response.status === 409) {
        setErrorMsg("Username had taken!");
        prevUser.current = username;
      } else {
        setErrorMsg("Sign up fail!");
      }
    } finally {
      setIsFetching(false);
    }
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
    formContainer: "login-form",
    label: "flex items-center space-x-1",
    constructor:
      "bg-[#333] p-[6px] rounded-[6px] text-sm text-white origin-top duration-[.3s] transition-all",
    checkIcon: "text-emerald-500 w-6",
    xIcon: "text-red-500 w-6",
  };

  return (
    <form onSubmit={handleSubmit} className={classes.formContainer}>
      {errMsg && (
        <h2 className="font-medium text-center rounded-md text-white bg-red-500 py-1">
          {errMsg}
        </h2>
      )}
      <h1 className="text-center text-[24px] font-[500]">Sign Up</h1>

      <div className="space-y-2">
        <div className={"space-y-1"}>
          <label className={classes.label} htmlFor="name">
            <span>Username</span>
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
              username && !validName
                ? "max-h-[200px] opacity-100"
                : "max-h-0 my-[-6px] opacity-0"
            }`}
          >
            4 - 24 letter <br />
            Must start with character
          </div>
        </div>

        <div className={"space-y-1"}>
          <label className={classes.label} htmlFor="password">
            <span>Password</span>
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
            id="confirm"
            value={password}
            cb={(value) => setPassword(value.trim() && value)}
          />

          <p
            id="note"
            className={`${classes.constructor} ${
              password && !validPwd
                ? "max-h-[200px] opacity-100"
                : "max-h-0 my-[-6px] opacity-0"
            }`}
          >
            6 - 24 letters <br />
            Is good to have special characters
          </p>
        </div>

        <div className={"space-y-1"}>
          <label className={classes.label} htmlFor="confirm">
            <span>Confirm password</span>
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

      <Button
        loading={fetching}
        disabled={!ableToSubmit}
        className="leading-[30px] w-full"
        type="submit"
      >
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
