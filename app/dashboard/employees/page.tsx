"use client";
import CreateEmployeeForm from "@/components/CreateEmployeeForm";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/EmployeeTable/DataTable";
import { columns } from "@/components/EmployeeTable/columns";
import { Employee } from "@/types";

const AllEmployees = () => {
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  if (isFormVisible) {
    return (
      <div className="flex flex-col items-center p-8">
        <CreateEmployeeForm setIsFormVisible={setIsFormVisible} />
      </div>
    );
  }

  const sampleEmployees: Employee[] = [
    {
      id: "1",
      name: "Jawad",
      dob: new Date("2000-11-15"),
      NRIC: "T0077826A",
      designation: "Intern",
      joinDate: new Date("2020-11-20"),
    },
    {
      id: "2",
      name: "Michael",
      dob: new Date("1989-06-28"),
      NRIC: "S562178452",
      designation: "Manager",
      joinDate: new Date("2004-11-21"),
    },
  ];

  return (
    <div className="flex flex-col items-center p-8 w-screen gap-6">
      <div className="flex justify-between w-full">
        <div className="font-bold text-[28px]">Employee Table</div>
        <Button onClick={() => setIsFormVisible(true)} variant="default">
          + Create an employee
        </Button>
      </div>

      <div className="py-10 w-full">
        <DataTable columns={columns} data={sampleEmployees} />
      </div>
    </div>
  );
};

export default AllEmployees;
