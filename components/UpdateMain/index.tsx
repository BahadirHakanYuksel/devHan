"use client";

import { useState } from "react";
import UpdateNotes from "./updateNotes";
import classNames from "classnames";

export default function UpdateMain() {
  const [updateNotesActive, setUpdateNotesActive] = useState(false);

  return (
    <div className="updateMain">
      <button
        className="updateNotesButton"
        onClick={() => setUpdateNotesActive(!updateNotesActive)}
      >
        <div
          className={classNames(
            "bg-transparent h-full w-full flex items-center justify-center",
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
