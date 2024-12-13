"use client";

import { useState } from "react";
import UpdateNotes from "./updateNotes";

export default function UpdateMain() {
  const [updateNotesActive, setUpdateNotesActive] = useState(false);

  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-0">
      <button
        className="bg-transparent text-white border-2 border-solid border-orange-500 border-t-0 text-base font-medium p-2.5 rounded-lg rounded-t-none w-[260px]"
        onClick={() => setUpdateNotesActive(!updateNotesActive)}
      >
        {updateNotesActive
          ? "Güncelleme Notlarını Kapat"
          : "Güncelleme Notlarını Aç"}
      </button>
      {updateNotesActive && <UpdateNotes />}
    </div>
  );
}
