"use client";

import classNames from "classnames";
import Link from "next/link";

interface dhButtonProps {
  isLink?: boolean;
  url?: string;
  click?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  color?: "default" | "red" | "blue" | "green";
  borRad?:
    | "rounded"
    | "rounded-full"
    | "rounded-lg"
    | "rounded-md"
    | "rounded-sm"
    | "rounded-xl";
}

export default function DhButton({
  url = "",
  click = () => {},
  children,
  color = "default",
  borRad = "rounded-full",
}: dhButtonProps) {
  return (
    <>
      {url !== "" ? (
        <Link className={"dhButtonDefault"} href={url || "#"}>
          {children}
        </Link>
      ) : (
        <button
          className={classNames(`!${borRad} dhButtonDefault `, {
            "!bg-red-500 text-white": color === "red",
            "!bg-blue-500 text-white": color === "blue",
            "!bg-green-500 text-white": color === "green",
            "!rounded": borRad === "rounded",
            "!rounded-full": borRad === "rounded-full",
            "!rounded-lg": borRad === "rounded-lg",
            "!rounded-md": borRad === "rounded-md",
            "!rounded-sm": borRad === "rounded-sm",
            "!rounded-xl": borRad === "rounded-xl",
          })}
          onClick={click}
        >
          {children}
        </button>
      )}
    </>
  );
}
