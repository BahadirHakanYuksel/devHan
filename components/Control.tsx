"use client";

import { useEffect, useState } from "react";

export default function Control() {
  const [returnValue, setReturnValue] = useState<
    JSON | boolean | string | null
  >(null);
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setReturnValue(localStorage.getItem("token"));
    } else setReturnValue(false);
  }, []);
  return returnValue;
}
