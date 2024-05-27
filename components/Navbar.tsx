"use client";
import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const path = usePathname();

  const navStyle = (currentPath: any) => {
    return currentPath == path
      ? "font-bold text-amber-500"
      : "font-bold text-white";
  };

  return (
    <div className="flex p-6 bg-blue-900 justify-between items-center">
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

      <Button asChild variant={"secondary"}>
        <Link href="/" className="font-bold">
          Temporary Logout
        </Link>
      </Button>
    </div>
  );
};

export default Navbar;
