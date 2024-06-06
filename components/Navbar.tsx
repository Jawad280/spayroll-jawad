"use client";
import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useUser } from "./UserContext";

const Navbar = () => {
  const path = usePathname();
  const user = useUser();

  const navStyle = (currentPath: any) => {
    return currentPath == path
      ? "font-bold text-amber-500"
      : "font-bold text-white";
  };

  if (user?.isAdmin) {
    return (
      <div className="flex p-6 bg-blue-900 justify-between items-center print:hidden">
        <div className="gap-4 flex">
          <Link href="/dashboard" className={navStyle("/dashboard")}>
            Home
          </Link>
        </div>

        <Button variant={"secondary"} onClick={() => signOut()}>
          Logout
        </Button>
      </div>
    );
  }

  return (
    <div className="flex p-6 bg-blue-900 justify-between items-center print:hidden">
      <div className="gap-4 flex">
        <Link href="/dashboard" className={navStyle("/dashboard")}>
          Home
        </Link>
        <Link
          href="/dashboard/employees"
          className={navStyle("/dashboard/employees")}
        >
          Employees
        </Link>
        <Link
          href="/dashboard/payslips"
          className={navStyle("/dashboard/payslips")}
        >
          Payslips
        </Link>
      </div>

      <Button variant={"secondary"} onClick={() => signOut()}>
        Logout
      </Button>
    </div>
  );
};

export default Navbar;
