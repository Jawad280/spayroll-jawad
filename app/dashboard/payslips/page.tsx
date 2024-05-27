import GetPayslipForm from "@/components/GetPayslipForm";
import React from "react";

const AllPayslips = () => {
  return (
    <div className="flex flex-col items-center p-8 w-screen gap-6">
      <div>Month and year is chosen here</div>
      <GetPayslipForm />
    </div>
  );
};

export default AllPayslips;
