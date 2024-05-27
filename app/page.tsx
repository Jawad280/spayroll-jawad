"use client";
import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";
import { useState } from "react";

export default function Home() {
  const [isSignup, setIsSignup] = useState<boolean>(false);

  if (isSignup) {
    return (
      <div className="flex flex-col p-8 items-center bg-blue-800 min-h-screen justify-center gap-6">
        <div className="font-bold text-[30px] text-white">SPayroll</div>
        <SignupForm setIsSignup={setIsSignup} />
      </div>
    );
  }

  return (
    <div className="flex flex-col p-8 items-center bg-blue-800 min-h-screen justify-center gap-6">
      <div className="font-bold text-[30px] text-white">SPayroll</div>
      <LoginForm setIsSignup={setIsSignup} />
    </div>
  );
}
