import React from "react";

interface TitleProps {
  children: React.ReactNode;
}

export default function Title({ children }: TitleProps) {
  return (
    <header className="text-4xl font-medium px-2.5 py-2.5 mb-5 relative">
      <div className="absolute h-1 w-3/5 right-0 -bottom-2.5 bg-orange-500 rounded-full rounded-l-none"></div>
      <div className="absolute h-1 w-2/5 left-0 -bottom-2.5 bg-orange-800 rounded-full rounded-r-none"></div>

      {children}
    </header>
  );
}
