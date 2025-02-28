"use client";

import { useState } from "react";
import UpdateNotes from "./updateNotes";
import classNames from "classnames";

export default function UpdateMain() {
  const [updateNotesActive, setUpdateNotesActive] = useState(false);

  return (
    <div className="absolute left-8 top-[70px]">
      <button
        className="bg-black  bg-opacity-20 backdrop-blur-lg text-white border-2 border-solid border-orange-500 border-t-0 text-base font-medium rounded-lg rounded-t-none w-9 h-9 overflow-hidden"
        onClick={() => setUpdateNotesActive(!updateNotesActive)}
      >
        <div
          className={classNames(
            "bg-transparent h-full w-full flex items-center justify-center text-lg",
            {
              "!text-orange-500": updateNotesActive,
            }
          )}
        >
          ?
        </div>
      </button>
      {updateNotesActive && <UpdateNotes />}
    </div>
  );
}
