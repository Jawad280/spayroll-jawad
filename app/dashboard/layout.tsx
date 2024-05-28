"use client";
import Navbar from "@/components/Navbar";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UserProvider } from "@/components/UserContext";
import { User } from "@/types";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const session = useSession();
  const router = useRouter();

  if (session.status == "unauthenticated") {
    router.push("/");
    return null;
  }

  if (session.status == "loading") {
    return <div>LOADING.............</div>;
  }

  const user: User = session.data?.user?.name;

  return (
    <UserProvider user={user}>
      <Navbar />
      <div>{children}</div>
    </UserProvider>
  );
};

export default DashboardLayout;
