"use client";
import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const session = useSession();

  const [isSignup, setIsSignup] = useState<boolean>(false);

  if (session.status === "authenticated") {
    router.push("/dashboard");
  }

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
