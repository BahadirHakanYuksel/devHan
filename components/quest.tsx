import React from "react";

export default function Quest() {
  return (
    <div className="bg-gradient-to-tr to-orange-500 from-orange-700 text-white flex flex-col gap-2.5 p-5 w-full rounded-full">
      <input
        type="text"
        placeholder="Önerilerinizi alalım handaşlar"
        className="border-2 border-solid border-white focus:border-black w-full rounded-full h-20 px-5 bg-white text-orange-500 text-3xl"
      />
    </div>
  );
}
