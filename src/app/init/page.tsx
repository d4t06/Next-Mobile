"use client";

import Button from "@/components/ui/Button";
import { sleep } from "@/utils/appHelper";
import { request } from "@/utils/request";
import { useEffect, useMemo, useRef, useState } from "react";

export default function Init() {
  const [step, setStep] = useState(0);

  const [isFetching, setIsFetching] = useState(false);
  const [password, setPassword] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const next = () => setStep((prev) => prev + 1);

  const handleSubmit = async () => {
    try {
      setIsFetching(true);
      if (process.env.NODE_ENV === "development") await sleep(500);

      await request.post("/init", {
        password: password,
      });

      next();
    } catch (error) {
      console.log({ message: error });
    } finally {
      setIsFetching(false);
    }
  };

  const classes = {
    container:
      "rounded-[24px] w-[90vw] md:flex-grow md:w-auto mx-auto my-auto md:mx-[100px] bg-white p-[20px] pb-[30px] md:px-[30px] md:pt-[calc(40px+30px+10px)]",
    form: "flex flex-col md:flex-row justify-between",
    logo: "text-xl leading-[40px]",
    right: "space-y-4 mt-5 md:mt-0",
    inputGroup: "flex flex-col space-y-0.5",
    input: "py-1 rounded-md border border-[--a-5-cl] outline-none px-3",
  };

  const ableToSubmit = useMemo(() => !!password, [password]);

  const renderStep = useMemo(() => {
    switch (step) {
      case 0:
        return (
          <>
            <h1 className="text-[40px] font-bold">Welcome</h1>

            <Button onClick={next} border={"clear"} className="!absolute bottom-[60px]">
              Next
            </Button>
          </>
        );
      case 1:
        return (
          <>
            <div className={classes.container}>
              <form
                onSubmit={handleSubmit}
                className={`${classes.form} ${
                  isFetching ? "opacity-60 pointer-events-none" : ""
                }`}
              >
                <div className="mt-0 md:mt-[-50px] text-center md:text-left">
                  <h1 className={classes.logo}>
                    Next <span className="text-[#cd1818] font-[500]">Mobile</span>
                  </h1>
                  <h1 className="text-[32px] mt-[10px] text-[#1f1f1f]">Welcome</h1>
                </div>
                <div className={classes.right}>
                  <div className={`${classes.inputGroup} pt-[8px]`}>
                    <label htmlFor="username">Username</label>
                    <input
                      className={`${classes.input} disable`}
                      value={"admin"}
                      readOnly
                    />
                  </div>
                  <div className={classes.inputGroup}>
                    <label htmlFor="password">Password</label>
                    <input
                      className={classes.input}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="text"
                      id="password"
                      autoComplete="off"
                      required
                    />
                  </div>
                </div>
              </form>
            </div>

            <Button
              border={"clear"}
              disabled={!ableToSubmit}
              loading={isFetching}
              onClick={handleSubmit}
              className="!absolute bottom-[60px]"
            >
              Submit
            </Button>
          </>
        );
      case 2:
        return (
          <>
            <h1 className="text-[40px] font-bold">Finish</h1>
            <Button
              border={"clear"}
              className={"!absolute bottom-[60px]"}
              href="/dashboard"
            >
              Go to Dashboard
            </Button>
          </>
        );
    }
  }, [step, password, isFetching]);

  useEffect(() => {
    if (step === 1) {
      inputRef.current?.focus();
    }
  }, [step]);

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#f0f4f9]">
      {renderStep}
    </div>
  );
}
