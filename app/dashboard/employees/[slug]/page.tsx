"use client";

import EditEmployeeForm from "@/components/EditEmployeeForm";
import { GetEmployee } from "@/lib/serverFunctions";
import { Employee } from "@/types";
import React from "react";
import Loading from "@/components/Loading";

const EmployeePage = ({ params }: { params: { slug: string } }) => {
  const { employee, error, isLoading } = GetEmployee(params.slug);

  const currentEmployee: Employee = employee;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center p-8 w-screen gap-6">
      <EditEmployeeForm employee={currentEmployee} companyName="TEST" />
    </div>
  );
};

export default EmployeePage;
