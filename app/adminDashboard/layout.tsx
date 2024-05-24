import React from "react";
import AdminNavbar from "@/components/AdminNavbar";

const AdminDashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  // Need to ensure only Admin can access this page -> if admin return else push to /dashboard
  return (
    <div>
      <AdminNavbar />
      <div>{children}</div>
    </div>
  );
};

export default AdminDashboardLayout;
