"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminNavbar = () => {
  const path = usePathname();

  const navStyle = (currentPath: any) => {
    return currentPath == path
      ? "font-bold text-amber-500"
      : "font-bold text-white";
  };

  return (
    <div className="flex p-6 bg-slate-800 justify-between">
      <div className="gap-4 flex">
        <Link href="/adminDashboard" className={navStyle("/dashboard")}>
          Home
        </Link>
      </div>

      <div>
        <Link href="/" className="font-bold text-white">
          Temporary Logout
        </Link>
      </div>
    </div>
  );
};

export default AdminNavbar;
