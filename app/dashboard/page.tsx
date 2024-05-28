"use client";
import PayslipForm from "@/components/PayslipForm";
import React, { useState } from "react";
import { GetAllEmployees } from "@/lib/serverFunctions";
import { useUser } from "@/components/UserContext";
import { Button } from "@/components/ui/button";
import CreateCompany from "@/components/CreateCompany";

const Dashboard = () => {
  const user = useUser();
  const [isFormVisible, setIsFormVisible] = useState<Boolean>(false);

  if (user?.isAdmin) {
    if (isFormVisible) {
      return (
        <div className="flex flex-col items-center p-8 w-screen gap-6">
          <CreateCompany setIsFormVisible={setIsFormVisible} />
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center p-8 w-screen gap-6">
        <div className="flex justify-between w-full">
          <div className="font-bold text-[28px]">Company Table</div>
          <Button onClick={() => setIsFormVisible(true)} variant="default">
            + Create a Company Account
          </Button>
        </div>
      </div>
    );
  }

  const { employees, isLoading, error } = GetAllEmployees(
    user?.companyName || ""
  );

  return (
    <div className="flex flex-col items-center p-8 w-screen gap-6">
      <div className="flex justify-between w-full">
        <div className="font-bold text-[28px]">Hello {user?.companyName}</div>
      </div>
      <PayslipForm employees={employees} />
    </div>
  );
};

export default Dashboard;
