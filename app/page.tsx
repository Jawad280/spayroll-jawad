"use client";
import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";
import { useState } from "react";

export default function Home() {
  const [isSignup, setIsSignup] = useState<boolean>(false);

  if (isSignup) {
    return (
      <div className="flex flex-col p-8 items-center">
        <SignupForm setIsSignup={setIsSignup} />
      </div>
    );
  }

  return (
    <div className="flex flex-col p-8 items-center">
      <LoginForm setIsSignup={setIsSignup} />
    </div>
  );
}
