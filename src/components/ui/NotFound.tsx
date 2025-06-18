import simon_empty from "@/assets/search-empty.png";
import { HomeIcon } from "@heroicons/react/24/outline";
import type { ReactNode } from "react";
import Button from "./Button";
import Link from "next/link";
import Image from "next/image";

type Props = {
  children?: ReactNode;
  className?: string;
  variant?: "less" | "with-home-button" | "default";
};

export default function NotFound({
  children,
  variant = "default",
  className = "",
}: Props) {
  const renderContent = () => {
    switch (variant) {
      case "less":
        return <></>;
      case "with-home-button":
        return (
          <>
            <p className="text-center">No result found, ¯\_(ツ)_/¯</p>
            <p className="text-center mt-5">
              <Link href={"/"}>
                <Button>
                  <HomeIcon className="w-6" />
                  <span>Home</span>
                </Button>
              </Link>
            </p>
          </>
        );
      case "default":
        return <p className="text-center">No result found, ¯\_(ツ)_/¯</p>;
    }
  };

  return (
    <div className={`${className}`}>
      <Image className="mx-auto" width={200} src={simon_empty.src} alt="" />
      {renderContent()}
      {children}
    </div>
  );
}
