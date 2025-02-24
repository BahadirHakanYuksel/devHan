import classNames from "classnames";
import React from "react";

interface TitleProps {
  children: React.ReactNode;
  type?: "event" | "default" | "niceFontOff";
}

export default function Title({ children, type = "default" }: TitleProps) {
  return (
    <header
      className={classNames(
        "text-4xl font-medium px-2.5 py-2.5 mb-5 relative titleFont",
        {
          "flex justify-between items-center": type === "event",
        },
        {
          "font-[Arial, Helvetica, sans-serif]": type === "niceFontOff",
        }
      )}
    >
      {type === "default" && (
        <>
          <div className="absolute h-1 w-3/5 right-0 -bottom-2.5 bg-orange-500 rounded-full rounded-l-none"></div>
          <div className="absolute h-1 w-2/5 left-0 -bottom-2.5 bg-orange-800 rounded-full rounded-r-none"></div>
        </>
      )}

      {children}
    </header>
  );
}
