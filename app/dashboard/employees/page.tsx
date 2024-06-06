"use client";
import CreateEmployeeForm from "@/components/CreateEmployeeForm";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/EmployeeTable/DataTable";
import { columns } from "@/components/EmployeeTable/columns";
import { Employee } from "@/types";
import { GetAllEmployees } from "@/lib/serverFunctions";
import { useUser } from "@/components/UserContext";

const AllEmployees = () => {
  const user = useUser();

  const { employees, error, isLoading } = GetAllEmployees(
    user?.companyName || ""
  );
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  const allEmployees: Employee[] = employees;

  console.log(allEmployees);

  if (isFormVisible) {
    return (
      <div className="flex flex-col items-center p-8">
        <CreateEmployeeForm
          setIsFormVisible={setIsFormVisible}
          companyName={user?.companyName || ""}
          companyId={user?.id || ""}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-8 w-screen gap-6">
      <div className="flex justify-between w-full">
        <div className="font-bold text-[28px]">Employee Table</div>
        <Button onClick={() => setIsFormVisible(true)} variant="default">
          + Create an employee
        </Button>
      </div>

      <div className="py-10 w-full">
        <DataTable columns={columns} data={allEmployees} />
      </div>
    </div>
  );
};

export default AllEmployees;
