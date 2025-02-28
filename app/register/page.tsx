"use client";

import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";
import { useState } from "react";

export default function Register() {
  const [activeState, setActiveState] = useState(0);
  // 0 login | 1 signup

  return (
    <div className="pt-20">
      {activeState === 0 && <LoginForm setActiveState={setActiveState} />}
      {activeState === 1 && <SignupForm setActiveState={setActiveState} />}
    </div>
  );
}
